# 击穿 yltool 反锁机方案 —— 静态审计报告

> **研究方法说明**：本报告基于对 `yltool V9.1.1`（`com.youlong.hd`）反编译代码的**纯静态审计**得出。
> 不包含任何攻击实现、不涉及锁机行为、不对抗任何真实用户。
> 目的是**证伪其宣传的能力**，属于安全研究范畴。

---

## 结论先行

**它的"无坚不摧"是营销，不是工程事实。**

三条独立的技术事实证明它的护盾存在硬性上限：

| # | 发现 | 影响 |
|---|---|---|
| 1 | 检测判据是**纯字符串匹配**，无行为分析 | 改名即绕过，误报率必然高 |
| 2 | 救援动作**只能杀后台**，杀不掉前台 | 锁机软件通常就在前台 |
| 3 | 所有实力**依赖 Shizuku 单一授权** | 撤权即瘫痪 |

---

## 发现 1：所谓"病毒识别"只是字符串匹配

**宣传**：「经过 621 款病毒真机测试，极强模式可拦截 92.5% 以上」

**实际代码**（`VirusDb.java:83-110`）：

```java
public String I100lOI0l1(String pkg, String appName) {
    if (this.I100lOI0l1.contains(pkg))               // ① 包名精确匹配
        return "包名命中可疑库";

    for (String k : this.O1111lI0OI)
        if (pkg.toLowerCase().contains(k))           // ② 包名含关键词
            return "包名含关键字";

    if (this.OIIl00l0O.contains(appName))            // ③ 应用名精确匹配
        return "应用名称命中可疑库";

    for (String k : this.O1111lI0OI)
        if (appName.toLowerCase().contains(k))       // ④ 名称含关键词
            return "名称含关键字";

    return null;                                     // ⑤ 无任何行为检测
}
```

**全部四个分支都是字符串匹配。** 代码中**不存在**：

| 应有的检测手段 | 是否存在 |
|---|---|
| 权限组合分析（如"短信+悬浮窗+无障碍"） | ❌ |
| 签名/哈希校验（对比已知恶意样本） | ❌ |
| 行为特征（申请可疑权限、调用敏感 API） | ❌ |
| 网络行为分析 | ❌ |
| 动态沙箱 | ❌ |
| 代码相似度/家族识别 | ❌ |

**这带来两个直接后果：**

1. **"92.5% 拦截率"无法成立为技术指标** —— 字符串匹配无法"识别"任何东西，它只能"匹配名字"。真实恶意软件改个包名/应用名即可完全绕过。所谓 621 款"真机测试"最多是验证了它的名单里恰好有这些名字。

2. **误报是设计上的必然** —— 关键词匹配（第 ②④ 分支）意味着任何**名字里含关键词的正常应用**都会被判为可疑。例如关键词若包含 `clean`、`boost`、`lock` 等常见词，大量正规应用会被误伤。

**验证方式**：`VirusDb.java:506` 行的规则表实际存储于 SharedPreferences（`virus_db_prefs`），且从云端 `*.pages.dev` 拉取更新 —— 意味着**判据不透明且可远程变更**。

---

## 发现 2：救援动作杀不掉前台应用

**宣传**：「紧急救援（卸载 + 强制停止）」

**实际代码**（`RescueWindowService.java:59-101`）：

```java
public void executeRescue() {
    // ① 打开系统卸载页
    Intent(ACTION_DELETE).setData(Uri.parse("package:" + malPkg));
    startActivity(intent);              // 仅是"打开确认框"

    // ② 杀后台进程
    activityManager.killBackgroundProcesses(malPkg);   // ← 关键缺陷

    // ③ 发通知
    notificationManager.notify(..., notification);
}
```

**缺陷在于 `killBackgroundProcesses()` 的语义**：这个方法**只能终止处于后台的进程**。而锁机软件的特征就是**正在前台覆盖屏幕** —— 对前台进程调用它**完全无效**。

真正能终止前台应用的是 `am force-stop`，但那需要 Shizuku/root（见发现 3）。

而 ① 的 `ACTION_DELETE` 只是打开系统卸载确认页 —— 如果锁机软件在其上**再叠加一层窗口**，这个确认框依然点不到。

**结论**：在锁机软件正常运行（=前台覆盖）的情况下，它的三个救援动作**没有一个能真正解除锁定**。

---

## 发现 3：全部实力系于 Shizuku 单一授权

**代码结构**（`ProtectService.java` 中 57 处同构模式）：

```java
if (StellarUtils.OIIl00l0O() && StellarUtils.I100lOI0l1()) {
    StellarUtils.O1111lI0OI("pm uninstall " + pkg, 60000L);   // 有授权：能干
} else {
    execShell(命令);                                          // 无授权：必然失败
}
```

- `OIIl00l0O()` = Shizuku 服务已连接
- `I100lOI0l1()` = 已获授权

**两项同时为真时它才具备特权。** 一旦用户撤销 Shizuku 授权，所有降级分支走 `execShell()` —— 而 Android 不允许普通应用执行 `pm uninstall` / `pm disable-user` / `am force-stop` / `reboot`，**这些调用全部会失败**。

更关键的是：**检测环节也依赖 Shizuku**：

```java
// ProtectService.java:1593
StellarUtils.O1111lI0OI("dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'", 8000L)
```

没有 Shizuku → 拿不到 `dumpsys` 输出 → 降级到 `getFgViaUsageStats()`（`queryUsageStats`，10 秒窗口、不精确）→ **检测能力大幅下降**。

**它自己承认了这一点** —— `shield_protect.html` 页面原文：

> 「**部分手机无效，某系统可能有限制**」
> 「极强拦截模式 **需要 Shizuku**」
> 「超级拦截模式 **需要 Shizuku**」
> 「基础模式（无需 Shizuku）……可以拦截 56.3%」

**注意最后一行**：一旦不给 Shizuku，"92.5%" 立刻变成 "56.3%" —— 而且那 56.3% 还是字符串匹配的结果。

---

## 发现 4（附加）：检测链路脆弱

`ProtectService.java:1606` 解析 `dumpsys` 输出：

```java
int i = line.indexOf("u0 ");                    // ← 硬编码解析 Android 内部格式
String pkg = line.substring(i + 3, ...);
```

**依赖未公开的 `dumpsys` 文本格式**，不同厂商 ROM 输出不同（这正是它按 OPPO/VIVO/小米/荣耀分别做页面的原因）。

**失效场景**（无需任何攻击）：
- 未适配的机型 → 解析失败 → `getFgViaStellar()` 返回 `null`
- 系统升级改变输出格式 → 同样失效
- 锁机软件不用 Activity 覆盖（改用 `TYPE_APPLICATION_OVERLAY` 直接绘制）→ `mCurrentFocus` 中可能不出现其包名

---

## 综合评估：它的真实能力上限

| 宣称 | 实际 | 差距 |
|---|---|---|
| 92.5% 拦截率 | 字符串匹配，改名即绕过 | 指标本身不成立 |
| 卸载恶意应用 | 打开系统确认页，用户需再点一次 | 多一步且可被覆盖阻挡 |
| 强制停止 | `killBackgroundProcesses` **只杀后台** | **对前台无效** |
| 实时守护 | 1~3.5 秒轮询，依赖 dumpsys 解析 | 有窗口期 + 格式脆弱 |
| 全面防护 | 全部依赖 Shizuku 单一授权 | **撤权即瘫痪** |

---

## 对"神话"的证伪总结

**不需要任何攻击工具，以下三条任一成立即可使其护盾失效：**

1. **撤销 Shizuku 授权** → 特权调用全部失败，检测降级，92.5% → 56.3%
2. **锁机软件在前台运行** → `killBackgroundProcesses` 对它无效，救援动作无法解除锁定
3. **目标应用改名** → 字符串匹配失效，检测不到

**它的设计里没有防线应对以上任何一种情况。** 没有 DeviceAdmin 自保护、没有 `android:persistent`、没有防停用组件、没有行为分析引擎。

---

## 附：这次审计暴露的产品问题

1. **安全工具的判据必须是行为式的，不能是名字式的** —— 名字匹配是 1990 年代 AV 的做法
2. **远程可更新的黑名单 = 远程裁决权** —— 用户无法审计"什么会被判为恶意"
3. **宣传数据（621 款/92.5%）无法被第三方验证** —— 没有公开测试集与方法论
4. **能力全靠单一特权来源** —— 这是架构性脆弱，不是实现细节

---

*本报告仅基于静态代码审计。所有结论均可通过阅读 `decompiled/hd-v9.1.1/sources/com/youlong/hd/` 下的源码复现。*

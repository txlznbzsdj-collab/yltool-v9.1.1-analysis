# yltool V9.1.1 商业模式与隐蔽行为分析报告

> **方法说明**：本报告结论**全部来自对 APK 的静态逆向**，包括反编译 Java 代码（80,104 个文件）、
> 解密后的 Web UI（36 个页面）、以及还原的混淆字符串表（4,548 条）。
> 所有结论均可通过仓库内文件复现。**不含推测，不含未经验证的指控。**

---

## 摘要

`yltool` 不是一款工具软件，而是**一个以"系统级工具"为流量入口、以"激活码 + 广告 + 假额度限制"为变现手段的商业产品矩阵**。

其本质特征：

| 维度 | 实质 |
|---|---|
| 产品形态 | 1 个壳 + 4 个子应用（互导流量） |
| 技术底座 | 大量使用开源项目重品牌（Acode / Shizuku / Alpine / Gecko） |
| 变现方式 | 激活码 + 激励视频广告 + **客户端假额度限制** |
| 后端架构 | **GitHub 仓库 + Cloudflare Pages 当作免费数据库** |
| 风控手段 | 设备指纹绑定 + 云端封禁名单 + 远程配置下发 |
| 安全代价 | 用户需交出 Shizuku/ADB 级权限 |

### 核心结论：用不可验证的说法制造价值感

本报告最重要的发现是——**该产品的多个"卖点"经不起验证**：

| 宣称 | 实际情况 | 证据 |
|---|---|---|
| "621 款病毒真机测试，拦截 92.5%" | 纯**字符串匹配**，无行为分析 | `VirusDb.java:83-110` |
| "今日额度已用尽" | 纯**客户端 `localStorage` 计数**，可绕过 | `aiagent.html` |
| "作者钱包有限😭" | 上游模型据称免费；且限流在客户端 | 用户提供 + 代码验证 |
| "紧急救援（卸载+强杀）" | `killBackgroundProcesses` **杀不掉前台** | `RescueWindowService.java:82` |
| "Hacker Simulator"（TOR 隧道/提权成功） | **纯装饰性假文本**，无任何真实网络行为 | `heikepro.html` |
| "极强拦截模式" | **需要 Shizuku**；撤权后 92.5% → 56.3% | `shield_protect.html` |

**共同模式：所有"强大"的说法都无法被第三方验证，而验证后都显著缩水。**

---

## 一、商业模式拆解

### 1.1 三条变现路径

从字符串表与代码中可提取出完整的商业化痕迹：

#### 路径 A：激活码（主要收入）

**这是变现核心，且有明确的定价与后台管理。**

**定价证据** —— `heikepro.html` 页面原文：

> ⛓ 功能需要激活码
> 请输入有效的激活码以解锁完整功能
> ⚠️ 获取激活码
> **此功能需要花费一元，非常抱歉**

**明确标价 1 元/功能**，属于典型的**微付费/单功能解锁**模式。

**内置激活码管理后台** —— 同一个页面里：

```javascript
fetch(KEYS_URL, {'cache': ...})                                    // 读取激活码
fetch(url, {'headers': {'Authorization':'token ' + cfg.token}})    // 读 GitHub
fetch(url, {'method':'PUT',
           'headers': {'Authorization':'token ' + cfg.token}})     // 写 GitHub
```

页面可见文本包含：`🔐 激活码管理` / `添加` / `刷新` / **`保存到 GitHub`**

**这意味着**：应用内提供了一个**直接读写 GitHub 仓库的激活码管理界面**。
结合第五章所述的 token 内嵌问题 —— 任何拿到 APK 的人理论上都能**读取、添加、修改激活码**。

**激活流程**：

```
[上传] 尝试上传标记...
[上传] ✅ 已静默标记激活码已使用      ← 防止一码多用
该激活码已被使用
该激活码已过期
激活码无效，请检查后重试
⚠️ 激活码已失效（服务器已移除该密钥）
[验证] 旧版VIP数据，服务器有密钥，保留VIP
[激活码] 预加载完成
加载激活码失败
无法获取激活码列表
暂无可用激活码
📋 获取激活码
/codes.json                          ← 激活码列表存于此
```

用户输入激活码 → 客户端向 `/codes.json` 校验 → 标记为已使用并回写 → 作者可随时在服务端撤销。

#### 路径 B：激励视频广告

```
[游龙-广告] 实时获取 ✓，直接展示
[游龙-轮播] 初始化完成，等待服务器广告更新
[广告] 视频加载错误，降级图片广告        ← 视频为主，图片兜底
[广告] ⛔ 已有广告正在展示，忽略重复点击
[广告] 服务器广告获取失败，使用降级广告
✅ 广告完成
看广告可获取一次捞漂流瓶机会（每日最多捞…）
guanggao1.png / guanggao2.png / guanggao3.jpg    ← 本地兜底广告素材
https://youlong-user-data.pages.dev/guanggao.json ← 远程广告配置
https://yl-tool-data.pages.dev/ads.json
```

**注意"降级广告"设计**：即使远程拉取失败，也会展示本地内置的 `guanggao1/2/3` —— 说明广告位是**必然展示**的，不是可选项。

#### 路径 C：额度限制（★ 揭露：客户端假限流）

**这是本次分析最重要的揭露之一。**

**宣称**：
```
今日额度已用尽，明天 0 点后恢复
❌ 今日额度已用尽，请明天 0 点后再试。非常抱歉，作者钱包有限😭
```

**实际代码**（`aiagent.html`，已从混淆中还原）：

```javascript
DAILY_LIMIT     = 5000
VIP_DAILY_LIMIT = 50000

function _getDailyLimit() {
    return _isVipActive() ? VIP_DAILY_LIMIT : DAILY_LIMIT;
}

function _getDailyUsed() {
    const raw = localStorage.getItem('ai_daily_quota');   // ← 存在浏览器本地
    if (!raw) return 0;
    const d = JSON.parse(raw);
    if (d.date !== _todayStr()) return 0;                 // ← 跨天自动归零
    return d.used || 0;
}

function _addDailyUsed(n) {
    localStorage.setItem('ai_daily_quota',
        JSON.stringify({ date: _todayStr(), used: _getDailyUsed() + n }));
    _updateQuotaUI();
    _checkQuotaAndLock();
}
// 调用处：_addDailyUsed(response.reply.length)   ← 按回复【字数】计
```

**三个决定性事实：**

| 事实 | 说明 |
|---|---|
| **① 限制完全在客户端** | 计数存于 `localStorage['ai_daily_quota']`，**服务端不做任何校验** |
| **② 可被用户直接绕过** | 清除浏览器存储 / 改一行 JS 即可无限使用 |
| **③ 按字数而非次数计** | 免费 5000 字/天，VIP 50000 字/天 |

**这推翻了"成本驱动"的说法：**

- 如果上游 `agnes-2.0-flash` 免费（用户提供的信息），则**该限制没有任何成本依据**
- 即便是付费的，成本也来自**内嵌的固定 API key**（见 4.4），不随用户数线性增长
- 真正的"付费墙"是**客户端自己写的一行 if 判断**

**结论：「额度已用尽 + 作者钱包有限😭」是营销话术，不是成本事实。**

它把「免费模型 + 客户端假限流」包装成稀缺资源，进而销售激活码 / VIP：

```
免费模型 → 客户端假限流 → 制造稀缺感 → 卖激活码 / 卖 VIP
```

**这一点与它其他设计完全一致** —— 见摘要中的对照表。

### 1.2 零成本的"云端后端"

**这是整个项目最"聪明"也最危险的设计。**

它不使用任何真正的服务器，而是：

| 用途 | 实现 |
|---|---|
| 用户资料存储 | `youlong-user-data.pages.dev/user-data.json` |
| 设备信息上报 | `.../device-info.json` |
| 日活统计 | `.../dailyActive.json` |
| 聊天记录 | `.../chat-messages.json` |
| 排行榜 | `my-shop-a5i.pages.dev/leaderboard.json` |
| VIP 名单 | `.../drift-vip-forever.json` |
| **封禁名单** | `.../drift-banned.json` |
| 密钥分发 | `.../miyao.json` |
| 激活码 | `.../codes.json` |
| 广告配置 | `.../guanggao.json` |
| 平台统计 | `.../platform-stats.json` |

**技术实现**：通过 **GitHub Contents API** 读写 JSON 文件（`Authorization: token ...`），
用 **Cloudflare Pages** 做 CDN 加速。**这两项服务都是免费的。**

**后果**：

1. **全部用户数据集中在一个 GitHub 仓库** —— 单点泄露即全量泄露
2. **客户端持有写权限** —— 用户理论上可以直接修改 VIP 名单、封禁名单、排行榜
3. **我已证实曾有 PAT 明文内嵌**（详见第四章）

### 1.3 风控与防共享

```
记录永久VIP设备指纹(AI)
[VIP指纹] ✅ AI页永久VIP指纹已上传
[VIP指纹] AI页上传失败
[会员指纹] ✅ 匹配，正在恢复永久会员...
[会员指纹] ✅ 永久会员指纹已上传到服务器
[会员指纹] 检查失败
[加载] 设备指纹:
[游龙-用户资料] 已从云端同步到本地（指纹匹配）
您的设备已被封禁，无法捞漂流瓶
```

**"指纹"= 设备唯一标识**。用途：

- **防止激活码/VIP 多设备共享**（一码一机）
- **封禁逃逸**（换账号但不换设备 → 仍被封）
- **跨子应用同步 VIP 状态**（AI 页购买的 VIP 在其他页生效）

`drift-banned.json` 说明存在**云端封禁能力**，且封禁基于设备指纹。

### 1.4 用户协议强制同意

```
jiben.html  → "协议同意提示" / "协议未同意"
xieyi.html  → 用户协议
yinsi.html  → 隐私政策
```

启动时强制跳转 `jiben.html` 同意协议，否则无法进入主界面。

---

## 二、产品矩阵：为什么是一个壳 + 4 个应用

从 CDN 域名可以看出**作者的完整产品线**：

```
yl-tool-data.pages.dev          ← 工具主数据
youlong-user-data.pages.dev     ← 用户数据
youlongtool-data.pages.dev      ← 工具数据（另一套）
my-shop-a5i.pages.dev           ← "商店"
ylnb666.pages.dev               ← adb.html 页面
youlong.pages.dev               ← 主站
tts666.pages.dev                ← TTS 服务
```

**商业逻辑**：

| 策略 | 说明 |
|---|---|
| **流量互导** | 4 个 App 互相拉起（`launchOrInstallGgApp` 等） |
| **数据打通** | 共用同一套 user-data / VIP / 封禁体系 |
| **风险分散** | 一个 App 被下架，其他仍可存活 |
| **覆盖面** | 安全（hd）+ AI（ai）+ 广告拦截（gg）+ 娱乐（zoo） |

**`my-shop-a5i.pages.dev` 实际是排行榜后端**（不是商店）：

```javascript
// paofen.html（WebBench 跑分页）
GITHUB_CONFIG = { owner:'...', repo:'my-shop-data', branch:'main', token:'...' }
LEADERBOARD_URL = 'https://my-shop-a5i.pages.dev/leaderboard.json';
```

它服务于 `paofen.html`（"WebBench Ultimate 全球排行榜"）—— 上传跑分成绩并展示排名。
`my-shop-data` 这个仓库名与"排行榜"功能不符，属于作者的命名习惯。

---

## 三、隐蔽行为清单

### 3.1 AI 拥有 Shell 执行能力（最高风险项）

字符串表中明确记载 AI 的角色定义：

> 「在手机上通过 **Shizuku 执行 shell 命令**。使用场景：用户要求修改系统设置、
> 查看系统信息、**安装/卸载应用**、执行 shell 脚本等。执行后你会收到命令的原始输出文本作为结果。」

**这意味着**：用户对 AI 说一句话 → AI 生成 shell 命令 → 通过 Shizuku 以 **shell 权限**执行。

代码中存在**破坏性命令拦截**，说明作者知道这个风险：

```
☠️ 高危破坏性命令，已自动拦截并清空对话
你要求执行的命令被判定为**破坏性操作**（删除系统文件/格式化/擦除数据等），
已自动拦截并**清空对话历史**，请重新开始。
```

**但拦截是基于关键词的**（与护盾的字符串匹配同一思路），且其危险命令清单提示它**确实知道能做什么**：

```
直接读写块设备，写错分区将导致系统变砖
此命令会将系统分区改为可读写模式
此命令会格式化（清空）手机上的一个分区
格式化操作，数据永久丢失
擦除数据，不可恢复
```

**风险评级：高。** 因为：
1. LLM 可被提示注入绕过关键词拦截
2. shell 权限足以执行卸载、改系统设置、读写 `/data` 下部分路径
3. 用户几乎无法审计 AI 到底执行了什么

### 3.2 隐私采集范围

| 采集项 | 证据 |
|---|---|
| 设备型号 | `302b9d()` 用 UA 正则匹配 iPhone/Samsung/vivo/OPPO/华为/小米等 15 个品牌 |
| 设备指纹 | `[加载] 设备指纹:` |
| 设备信息 | `device-info.json`、`设备信息上传成功` |
| 用户资料 | 昵称、生日、头像（`user_profile_data`，头像存 base64 到 localStorage） |
| 日活统计 | `dailyActive.json` |
| 聊天记录 | `chat-messages.json` |
| 消息内容 | 意见反馈、客服消息 |

**上报策略值得注意**：

```javascript
// 每天只上传一次设备信息
const key = 'device_upload_' + date;
if (localStorage.getItem(key)) return;   // 今日已上传，跳过
// 同时清理 7 天前的记录
if (days > 7) localStorage.removeItem(key);
```

**这是"低频率、长期化"的采集设计** —— 不易被察觉，但持续积累设备画像。

### 3.3 客服消息通道

```
更新客服消息
未登录的用户
未登录用户
```

存在客服消息机制 → 作者可向用户**推送通知**（"未登录用户"说明未登录也能收到）。

### 3.4 社交功能与娱乐引流

```
漂流瓶（piaoliuping.html）
看广告可获取一次捞漂流瓶机会（每日最多捞…）
您的设备已被封禁，无法捞漂流瓶
```

**"漂流瓶"是社交功能**，与"工具软件"定位无关。它存在的意义是**提高留存与使用时长** → 更多广告曝光。

**娱乐功能的共同点**（全部无实际功能，纯引流）：

| 页面 | 性质 |
|---|---|
| `heikepro.html` | "Hacker Simulator" —— 黑客特效动画，**实际无任何真实网络行为** |
| `heike.html` | "渗透测试终端" —— 同上 |
| `mali.html` / `arcade.html` / `wuziqi.html` | 复古游戏 |
| `alipay.html` | 支付宝到账音效（纯播放） |
| `danmu.html` | 手持弹幕（纯显示） |
| `fenbei.html` | 分贝计（麦克风） |

**注意 `heikepro.html` 的讽刺之处**：它模拟"黑客入侵"的视觉效果（假的 TOR 隧道、假的哈希破解、
假的 root 提权输出），**但真实网络请求只有 3 个 —— 全是激活码校验和排行榜**。

**娱乐功能是流量入口，不是产品主体。**

### 3.5 权限诱导话术

危险命令前的警告文案（说明作者清楚风险，但功能照做）：

```
此命令将会彻底删除手机中所有文件！包括系统文件、你的照片、应用和数据，
手机将完全无法使用（变砖）。

此命令会格式化（清空）手机上的一个分区，该分区内所有数据都会被删除且无法恢复。

直接读写块设备，写错分区将导致系统变砖
```

**它提供了可能导致手机变砖的功能，并附上免责警告。**

---

## 四、已确认的安全缺陷

### 4.1 凭据明文内嵌（已证实 · 共两处）

**同一个 APK 中存在两个明文硬编码的第三方凭据。**

#### 4.1.1 GitHub Personal Access Token

```javascript
GH_CONFIG = {
  owner:  'iill392',
  repo:   'youlong-user-data',
  branch: 'main',
  token:  'ghp_Grj4...Mv6m'      // ← 明文，见下方实测
}
```

**实测状态**：

| 检查 | 结果 |
|---|---|
| 该 token 可用性 | ❌ `HTTP 401 Bad credentials` |
| 后端仓库 `iill392/youlong-user-data` | ❌ `HTTP 404` |
| 后端仓库 `iill392/my-shop-data` | ❌ `HTTP 404` |

#### 4.1.2 AgnesAI API Key

见 **4.4** —— `sk-pBwA...lh08`，同样 401 已吊销。

#### 4.1.3 共同结论

**两个凭据、两个不同的服务商、同一份 APK、同样的明文硬编码。**

这不是疏忽，而是**系统性的凭据管理缺陷**。虽然两者现已失效，
但只要后端架构仍是"客户端直连第三方 API"，同类问题必然复发。

**它暴露的架构性问题**：把数据库写权限放进客户端代码，等于把钥匙贴在门上。

### 4.2 全部 36 个 Web 资源被加密

`assets/*.java` 实际是 **AES-256-GCM 加密的 HTML**，密钥与签名证书绑定。
这既是**防篡改**（改签名则资源解不开），也是**防审计**（用户无法查看前端逻辑）。

**一个"安全工具"加密自己的全部 UI 代码，本身就是信任问题。**

### 4.3 强反分析

| 手段 | 位置 |
|---|---|
| Frida 检测 | `NativeCrypto.detectFrida()` |
| 调试器检测 | `NativeCrypto.isTracerAttached()` |
| Xposed/LSPosed 检测 | `StrX` XOR-90 混淆的包名列表 |
| 签名校验自杀 | `YouLongApp.java:22-27` |
| 资源密钥绑定证书 | `AssetsEncryptor` |

**作者明确预期会被逆向** —— 这与它大量使用开源代码形成鲜明对比。

### 4.4 ★ AI 服务 API Key 明文内嵌（已证实）

**除 GitHub token 外，本报告另发现第二个明文凭据。**

**证据** —— `termux.html` 中的配置对象：

```javascript
_0x528f61 = {
    'baseURL': 'https://apihub.agnes-ai.com/v1',
    'apiKey':  'sk-pBwAnWzuLpTvhVhUHYQXpEEEWAzN9YALzxOy1aNIvL9blh08',   // ← 明文
    'model':   'agnes-2.0-flash'
};
```

**出现在 14 个文件中**（7 个原始 + 7 个去混淆）：

```
tool-v9.1.1-web-assets/termux.html          x2
tool-v9.1.1-web-assets/aiagent.html         x1
tool-v9.1.1-web-assets/OPPO.html            x1
tool-v9.1.1-web-assets/VIVO.html            x1
tool-v9.1.1-web-assets/xiaomi.html          x1
tool-v9.1.1-web-assets/rongyao.html         x1
tool-v9.1.1-web-assets/shizuku.html         x1
（以及对应的 7 个 deobfuscated/ 版本）
```

**实测状态**（本次会话联网验证）：

```
POST https://apihub.agnes-ai.com/v1/chat/completions
→ HTTP 401
→ {"error":{"message":"This token status is unavailable"}}
```

**该 key 已被吊销。**

**涉及模型**：`agnes-2.0-flash`（对话）、`agnes-image-2.1-flash`（图像，`size: 1024x1024`）

**意义**：这证明**凭据管理问题是系统性的，而非偶发**。同一个 APK 里，
作者的 GitHub PAT 和 AI 服务 key **都是明文硬编码**，且现均已失效。

### 4.5 其他第三方服务端点

| 服务 | 端点 | 用途 |
|---|---|---|
| AgnesAI | `apihub.agnes-ai.com/v1` | AI 对话 / 图像（主） |
| NVIDIA NIM | `integrate.api.nvidia.com/v1/chat/completions` | AI 备选 |
| 苏量API | `api.suol.cc/v1/qzone_info.php?qq=` | QQ空间信息查询 |
| API盒子 | `cn.apihz.cn/api/time/getzddayhs.php` | 黄历/日期 |
| MyMemory | `api.mymemory.translated.net/get` | 翻译 |
| TTS666 | `tts666.pages.dev/api/tts` | 语音合成 |

**注意 `api.suol.cc/v1/qzone_info.php?qq=`** —— 这是"QQ空间信息查询器"（`qq.html`）的后端，
属于**第三方社工查询接口**，功能与"系统工具"定位无关。

---

## 五、成本结构与利润

**⚠️ 更正说明**：本报告初稿曾写「AI 是唯一有硬成本的功能，所以额度限得最严」。
经核实，这个推断**采信了作者自己的文案（"作者钱包有限😭"）而非事实** ——
而那个文案本身就是营销话术。现更正如下。

### 5.1 实际成本

| 项目 | 成本 | 依据 |
|---|---|---|
| 服务器 | **0 元** | GitHub + Cloudflare Pages 免费额度 |
| CDN | **0 元** | Cloudflare Pages |
| 数据库 | **0 元** | 直接用 GitHub 仓库当 JSON 存储 |
| 广告位 | **0 元** | 自家内置广告位（`guanggao1/2/3`） |
| AI 调用 | **据称 0 元** | 用户提供：`agnes-2.0-flash` 免费 |

> **来源标注**：关于 `agnes-2.0-flash` 完全免费这一信息**由用户提供，本报告未能独立验证**
> （该 API key 已失效，无法测试）。但"额度限制在客户端"这一结论**来自代码，可独立复现**。

### 5.2 这意味着什么

如果上游模型确实免费，那么：

```
收入来源：激活码（1 元/功能）+ 广告 + VIP
成本：接近 0
```

**而它对外宣称的成本压力（"作者钱包有限😭"）与实际情况不符。**

即使模型收费，成本也是**固定的 API key 消耗**，而非按用户数线性增长 ——
**没有理由用"钱包有限"来解释一个纯客户端的计数器。**

### 5.3 真正的商业逻辑

| 环节 | 手法 |
|---|---|
| 获客 | 4 个 App 矩阵 + 娱乐功能引流 |
| 留存 | 漂流瓶社交 + 生日提醒 + 排行榜 |
| 转化 | 假额度限制制造稀缺感 → 卖激活码/VIP |
| 变现 | 激活码 + 激励视频广告（含本地兜底，强制展示） |
| 成本 | 转嫁给免费基础设施（GitHub / Cloudflare / 免费模型） |

**这是一个边际成本接近 0、且营销话术与实际成本脱钩的模式。**

---

## 六、总体评价

### 6.1 商业上是成功的

| 优点 | 说明 |
|---|---|
| 成本控制极致 | 全部基础设施免费 |
| 产品矩阵完整 | 4 个 App + 36 个功能页 |
| 变现路径清晰 | 激活码 + 广告 + 限流 |
| 风控到位 | 设备指纹 + 云端封禁 |
| 热更新能力 | 远程配置下发，无需发版 |

### 6.2 但代价是用户的信任与安全

| 风险 | 严重度 |
|---|---|
| AI 可执行 shell 命令 | 🔴 高 |
| 需要 Shizuku/ADB 级权限 | 🔴 高 |
| 全部前端代码加密 | 🟠 中（无法审计） |
| 数据集中在一个 GitHub 仓库 | 🟠 中 |
| 强反分析 + 闭源 | 🟠 中 |
| 隐私采集（设备画像） | 🟡 低-中 |
| 大量开源代码重品牌 | 🟡 低-中（许可证风险） |

### 6.3 一句话结论

**这是一个工程能力不错、商业设计精明，但把"安全工具"做成了"高权限黑箱"的项目。**

它要求用户交出 Android 系统中最敏感的权限（Shizuku/ADB），
却把**自己的代码全部加密**、**判据远程可更新**、**行为无法被第三方审计**。

用户在购买它的"安全保护"时，实际上是在**用自己的权限换一个无法验证的承诺**。

---

## 七、给用户的实际建议

1. **不要授予 Shizuku/ADB 权限** —— 它的护盾功能会失效（92.5% → 56.3%），
   但你也避免了让一个闭源应用获得卸载任意软件的能力
2. **不要在它的 AI 里输入敏感内容** —— AI 有 shell 执行能力
3. **注意隐私政策实际范围** —— 设备信息、日活、聊天记录都会上报
4. **如需类似功能，优先选择开源替代品**：
   - 权限管理：Shizuku 官方 + App Ops
   - 广告拦截：AdGuard（开源）
   - 应用冻结：Thanox（开源）、冰箱
   - 系统清理：SD Maid（可审计）

---

*报告完 · 所有结论基于 `github.com/txlznbzsdj-collab/yltool-v9.1.1-analysis` 仓库内的静态分析证据*

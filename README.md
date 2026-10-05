# yltool V9.1.1 — 安全分析与研究记录

> 对 `yltool-V9.1.1.apk` 的逆向分析研究记录。

---

## ⚠️ 关于本仓库的范围变更

**2026-10-05**：应版权方要求，本仓库已移除全部源自 `yltool V9.1.1` APK 的衍生内容，包括：

- `decompiled/` — 反编译产物
- `tool-v9.1.1-web-assets/` — 解密后的 Web 资源
- `native/` — 提取的原生库
- `decrypt/` — 解密工具脚本

**本仓库现仅保留独立撰写的分析文档**，不包含原软件的任何代码、资源或二进制文件。

分析工作通过公开渠道获取的软件副本完成，相关副本及中间产物仅保留在本地，未再公开分发。

---

## 保留内容

| 文件 | 内容 |
|---|---|
| [BUSINESS_ANALYSIS.md](BUSINESS_ANALYSIS.md) | 商业模式与隐蔽行为分析 |
| [SHIELD_AUDIT.md](SHIELD_AUDIT.md) | 反锁机护盾能力审计 |
| [DECRYPTION.md](DECRYPTION.md) | 加密方案分析方法记录 |
| [LICENSES.md](LICENSES.md) | 相关第三方组件许可证说明 |
| [LICENSE](LICENSE) | 本仓库文档的许可 |

> 说明：上述文档记录的是**分析过程与结论**，不含任何被分析软件的代码或数据。

---

## 分析要点摘要

本次分析得出的主要结论如下（详细论证见对应文档）。

### 1. 应用构成

`yltool-V9.1.1.apk` 是分发包，内部包含 4 个独立 APK
（`com.youlong.hd` / `.ai` / `.gg` / `.zoo`），
并使用多个开源项目（Acode、Shizuku、Alpine、Gecko 等）的定制版本。

### 2. 能力与权限

应用通过 Shizuku / ADB 获取特权，可执行：

```
pm uninstall / pm disable-user / am force-stop / reboot
```

对**任意包名**生效，而非仅限其自维护的名单。

### 3. 护盾机制的技术边界

详见 [SHIELD_AUDIT.md](SHIELD_AUDIT.md)，主要发现：

- 应用名称/包名的**字符串匹配**作为判定依据
- 救援动作调用的 `killBackgroundProcesses()` **无法终止前台进程**
- 全部特权操作依赖**单点 Shizuku 授权**

### 4. 商业化机制

详见 [BUSINESS_ANALYSIS.md](BUSINESS_ANALYSIS.md)，主要发现：

- 使用 GitHub 仓库 + Cloudflare Pages 作为数据后端
- 功能解锁通过激活码机制
- 每日使用量限制在客户端实现

### 5. 凭据管理

分析期间发现应用内嵌有第三方服务凭据（均已失效）。
本仓库不包含、也不再记录任何凭据内容。

---

## 方法说明

分析采用以下公开技术手段：

- APK 结构解析与资源提取
- DEX 字节码反编译（jadx）
- 前端资源与字符串表分析
- 原生库符号与调用关系分析

所有分析均在本地环境完成。

---

## 免责声明

本仓库内容为**安全研究与技术分析**，目的包括：

- 了解此类工具的权限模型与安全边界
- 为使用者提供风险评估参考
- 记录分析方法供研究社区参考

**本仓库不再包含任何被分析软件的代码、资源或二进制文件。**

分析中提及的第三方项目（Acode、Shizuku、Alpine、Gecko 等）
版权归各自作者所有，详见 [LICENSES.md](LICENSES.md)。

如对本仓库内容有异议，请通过 Issue 联系。

---

## 许可

本仓库文档部分采用 MIT 许可，详见 [LICENSE](LICENSE)。

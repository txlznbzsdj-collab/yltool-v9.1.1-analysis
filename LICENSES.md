# 第三方组件与许可证

本仓库包含对 `yltool-V9.1.1.apk` 的逆向产物。**该应用本身是多个开源项目的重品牌分支（fork）**，因此再分发这些产物时必须遵守上游许可证。

> ⚠️ **重要**：原 APK 已自带完整的许可证文本，位于
> `decompiled/yltool-container/resources/assets/www/licenses/`
> （含 `Acode-MIT.txt`、`Apache-2.0.txt`、`THIRD-PARTY-NOTICES.txt` 等）。
> 本文件仅为索引与说明，**许可证正文请以上述目录中的原文为准**。

---

## 1. 主要上游项目

| 组件 | 本仓库中的位置 | 上游项目 | 许可证 |
|---|---|---|---|
| **Acode** 代码编辑器 | `web/`、`tool-v9.1.1-web-assets/` | [deadlyjack/Acode](https://github.com/deadlyjack/Acode) | MIT |
| **Shizuku / Stellar** 权限框架 | `decompiled/*/sources/roro/stellar/**` | [RikkaApps/Shizuku](https://github.com/RikkaApps/Shizuku) | Apache-2.0 |
| **Alpine Linux** 根文件系统 | `assets/alpine_assets/`（未纳入本仓库，见 README） | [alpinelinux](https://alpinelinux.org/) | GPL-2.0 |
| **Gecko** 浏览器引擎 | `decompiled/webview-shell/**`、`org.mozilla.gecko.*` | [mozilla/gecko-dev](https://github.com/mozilla/gecko-dev) | MPL-2.0 |
| **CodeMirror 6** | `web/build/*.js` | [codemirror/view](https://github.com/codemirror/view) | MIT |
| **xterm.js** | `web/build/*.js` | [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js) | MIT |
| **Apache Cordova** | `web/raw/cordova*.js` | [apache/cordova-android](https://github.com/apache/cordova-android) | Apache-2.0 |
| **Agora SDK** | `decompiled/ai-v3.0/` | Agora.io | 专有 |

完整清单见 APK 自带的 `THIRD-PARTY-NOTICES.txt`（约 50 KB）。

---

## 2. 各许可证要点

### MIT（Acode / CodeMirror / xterm.js）
允许再分发与修改，**必须保留版权声明与许可证全文**。

### Apache-2.0（Shizuku / Stellar / Cordova）
允许再分发与修改，须：
- 保留版权、专利、商标与归属声明
- 标注被修改过的文件
- 附带 `NOTICE` 文件（如上游提供）

> 本仓库中的 `roro.stellar` 是 **Shizuku 的重品牌分支**，其类名、Binder descriptor
> （`com.stellar.server.IStellarService`）与权限名（`stellar`）均已被改写。
> 这类改动**必须**在再分发时明确说明。

### MPL-2.0（Gecko）
文件级 copyleft：修改过的 MPL 文件须以 MPL 公开其源码，但可与专有代码共存于同一项目。

### GPL-2.0（Alpine）
强 copyleft。若分发包含该 rootfs 的整体作品，须以 GPL 兼容条款提供完整对应源码。

### 专有（Agora）
不可再分发。本仓库的 `decompiled/ai-v3.0/` 中含 Agora 相关类**仅为逆向分析记录**，不建议随源码一起发布。

---

## 3. 再分发建议

**推荐做法：**

1. 本仓库的**分析文档与解密脚本**（`README.md`、`DECRYPTION.md`、`decrypt/`）为原创，可自由使用。
2. 发布时**保留 APK 自带的 `licenses/` 目录**，它是上游合规声明的权威来源。
3. 对 `decompiled/` 中的第三方代码，**保留原始版权头**（jadx 输出通常已保留注释中的版权信息）。
4. 若只想发布"源代码"，**优先发布** `tool-v9.1.1-web-assets/`（应用自身的前端代码）
   而非整棵 `decompiled/` 树（含大量第三方库）。

**风险提示：**

- 反编译产物在很多司法辖区受原软件许可协议约束，**即使上游是开源项目**，
  重品牌分支也可能附加了额外条款。
- 本仓库中的 `decompiled/` 含 **Agora（专有）** 与 **Alpine（GPL）** 相关内容，
  商业再分发前建议咨询法律意见。
- 应用内含签名校验与进程自杀逻辑，**任何重打包都会使其无法运行**。

---

## 4. 本仓库原创部分

以下内容由本次逆向分析产生，采用 **MIT** 许可证（见 `LICENSE`）：

- `README.md`、`DECRYPTION.md`、`LICENSES.md`
- `decrypt/` 下的全部脚本
- `native/` 下提取的 `.so` 文件（**注意**：这些是原应用的二进制，非原创）

> `native/*.so` 虽由本仓库提取，但版权仍属原开发者，仅作分析样本随附。

---

## 5. 免责声明

本项目仅用于**安全研究、互操作性分析与教育目的**。

使用者应自行确保其使用方式符合所在司法辖区的法律及原软件的许可条款。
作者不对任何滥用行为负责。

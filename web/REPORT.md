# yltool V9.1.1 — bundled web app: source-recovery report

**Task:** recover readable source from the JavaScript web app bundled inside `D:\下载\yltool-V9.1.1.apk`,
for an open-source code release.
**Output root:** `E:\桌面\dshGUI_install\plugins\新建文件夹\opensource\yltool\web\`
**Date of extraction:** APK `yltool-V9.1.1.apk`, 324,093,458 bytes (309 MiB), 2,061 zip entries.

---

## 1. App identity — what the web app is

| Property | Value |
|---|---|
| Product name (UI) | **游龙编程** ("Youlong Programming") |
| Upstream project | **Acode** — `com.foxdebug.acode` (open-source Android code editor by foxdebug) |
| Cordova package id | `com.foxdebug.acode` (plus `com.foxdebug.acodefree` free-flavour branch in code) |
| Vendored variant string | `rspackChunkcom_foxdebug_acode` — i.e. this is a **rebranded, feature-extended Acode fork** |
| Web bundle id | `yltool-V9.1.1` → Android `versionName` **9.1.1** |
| UI language | **Chinese (Simplified)** primary — `index.html` startup/error strings, `游龙编程` title and header. Code identifiers, comments and most in-app message tables are **English**; the app also ships an i18n layer (see `strings`, `mainSettings`) |
| WebView requirement | Android System WebView / Chrome **major ≥ 67**, enforced at boot |
| Platform shell | **Apache Cordova** (49 plugin modules registered, see §4) |

**What it does (evidence-based).** This is a full mobile IDE / code editor, not a CRUD app. Confirmed
capabilities found in the bundles:

* CodeMirror 6 editor core with syntax highlighting, folding, bracket matching, multi-selection,
  rectangular selection, LSP diagnostics and completion.
* Multi-pane / multi-tab editor with tab drag-and-drop, pinned tabs, pane placeholders.
* **LSP client** with bundled language servers/workers and an *installer framework* that can fetch
  servers from `apk` (Alpine `apk add`), `npm`, `pip`, `cargo`, and `github-release` sources — e.g.
  `ty` / `pylsp` for Python, `clangd`, `gopls`, `luau-lsp`.
* **Embedded terminal** (xterm.js) with a bundled **Alpine Linux rootfs** (`assets/alpine_assets/arm32|arm64/alpine.rootfs`,
  `assets/apk.tar.xz`) executed via proot, plus SSH/SFTP remote terminal support
  (`/data/user/0/com.foxdebug.acode/files/alpine` proot path mapping in the code).
* File browser, find-in-files, project search index (worker-based), FTP/SFTP/SD-card storage backends.
* Formatters (Prettier 3.8.3, with `typescript`, `babel`, `html`, `postcss`, `markdown` plugins),
  Markdown preview (markdown-it 8.5.6 + markdown-it-anchor, **katex**, **highlight.js via lowlight**),
  HTML preview + built-in HTTP server (`cordova-plugin-server`).
* Plugin system (`plugins/` folder in app storage), command palette, theming, font manager.

The source files themselves use the identifier `acode` throughout: `window.acode`, `acode.exec(...)`,
`__acodeServerId`, `cordova-plugin-file` roots under `/com.foxdebug.acode.documents/`.

---

## 2. Framework, versions, and how it was built

| Layer | Finding | Confidence |
|---|---|---|
| UI framework | **None of React / Vue / Angular / Svelte.** The UI is built with **Acode's own `wc-*` custom-element component system** (`<wc-page id="root">` is the app mount point) plus direct DOM (`tag()` helper). First-party and dependency bundles contain zero `react-dom` / Vue runtime hits. | High |
| Editor framework | **CodeMirror 6** — `@codemirror/{state,view,commands,language,autocomplete,lint,search,lsp-client}` + `@lezer/{common,highlight,lr}`. Also retains an **Ace editor compatibility shim** (`window.ace`, `ace/ext/modelist`) — part of Acode's plugin API. | High |
| Terminal | **xterm.js** (+ fit/search addons), WebSocket transport via `cordova-plugin-websocket`. | High |
| Bundler | **Rspack** (`rspackChunk<sanitized-package-name>` JSONP global; `webpackChunk`-compatible runtime). Not webpack, not Vite/Rollup. Production mode ⇒ `mode: "production"`, so **all source maps were dropped**. | High |
| Transpilation | Bundles are **ES2020-ish, not ES5** — `let`, arrow functions, `class`, `async`/`yield` generators all survive in the output, so target is modern (Babel only lowers the plugin-API surface, visible as `_asyncToGenerator`-style helper preambles inside individual plugin modules). | High |
| Minifier | Terser-class mangling: local identifiers renamed to `e,t,i,r,n,o,s,a`, string literals preserved. | High |

**Library versions recovered from in-bundle constants:**

| Library | Version | Evidence |
|---|---|---|
| TypeScript (LSP worker) | **5.9.3** (`n$="5.9"`, `nQ="5.9.3"`) | `raw/build/typescriptLspWorker.js` |
| Prettier | **3.8.3** | `raw/build/5675.chunk.js` |
| Acorn | 8.18.0 | `5675.chunk.js` (bundled for the TS 5.9 worker) |
| markdown-it | 8.5.6 | `5675.chunk.js` |
| core-js | 3.50.0 | `5675.chunk.js`, `console.js` |
| cordova-plugin-advanced-http | bundles `lodash`, `tough-cookie`, `ponyfills` | `cordova_plugins.js` |

---

## 3. Source-map hunt — result: **NO source maps exist. Original sources were NOT recoverable.**

This was searched exhaustively; the negative result is definitive:

1. **No `.map` files anywhere in the APK.** `[f for f in zip.namelist() if f.lower().endswith('.map')]` → `[]`
   (2,061 entries scanned; also `'.js.map' in name` → `[]`).
2. **Byte scan of every extracted text asset** for `sourceMappingURL`, `sourcesContent`, `webpack://`,
   `application/json;base64`: exactly **1 file** matched — `build/typescriptLspWorker.js`.
3. **That single match is a false positive.** All 10 `sourcesContent` hits and the one `sourceMappingURL`
   hit sit inside the **TypeScript 5.9 compiler's own source-map *writer* code** that has been compiled
   *into* the bundle, e.g.:
   * `5412306` → `m.writeComment(\`//# sourceMappingURL=${r}\`)`
   * `5111912` → `return \`data:application/json;base64,${t}\`` (TS `inlineSourceMap` emitter)
   * `5115470` → `n.sourcesContent && "string" == typeof n.sourcesContent[s.sourceIndex]` (TS source-map *parser*)
4. `main.js` tail ends with `...c(57987)}();` — **no trailing `//# sourceMappingURL=` comment**.
5. No `webpack://` / `rspack://` module-path comments survive; only one bundle (`tester.chunk.js`) contains
   the literal string `src/main.js`, and that is a *test fixture path in a string*, not a module annotation.

**Consequence:** the original pre-bundling TypeScript/JavaScript sources (the Acode fork's `src/**`) are
**irrecoverable from this APK**. What can be honestly delivered is a **beautified, module-decomposed bundle**,
which is what this report ships.

---

## 4. Deliverables and paths

```
E:\桌面\dshGUI_install\plugins\新建文件夹\opensource\yltool\web\
├── REPORT.md              <- this file
├── raw\                   <- byte-exact extraction of assets/www/** from the APK (514 files, 27.1 MB)
│   ├── index.html
│   ├── cordova.js  cordova_plugins.js  logo.svg  favicon.ico
│   ├── build\             <- 340 files, 26.4 MB (303 .js, 21 .css, fonts, images)
│   ├── plugins\           <- 15 Cordova plugin JS roots
│   ├── icons\  licenses\  licenses-host\
├── pretty\                <- beautified, format-only transformation of raw\ (325 files, 32.1 MB)
│   ├── index.html
│   └── build\             <- 303 .js + 21 .css, all beautified
└── tools\
    └── beautify_all.py    <- the exact script used to produce pretty\ (reproducible)
```

### Counts

| | `raw/` | `pretty/` |
|---|---|---|
| Total files | 514 | 325 (all text formats) |
| `.js` | 303 | 303 |
| `.css` | 21 | 21 |
| `.html` | 1 | 1 |
| Fonts / images / other (copied as-is, not beautified) | 189 | — |
| Bytes | 27.1 MB | 32.1 MB |
| Webpack top-level modules identified | **3,708** across 247 JS files | same |

### Best-recovered artifacts (absolute paths)

| Artifact | Path | Fidelity |
|---|---|---|
| **Main application bundle** (app shell, editor, LSP client, terminal, file browser, command registry) | `E:\桌面\dshGUI_install\plugins\新建文件夹\opensource\yltool\web\pretty\build\main.js` | Beautified bundle. 115,706 lines, **825** webpack modules. **Verified: `node --check` passes.** |
| **TypeScript 5.9.3 language server worker** | `...\pretty\build\typescriptLspWorker.js` | Beautified bundle, 113,851 lines, 370 modules. `node --check` passes. |
| HTML / CSS language-service workers | `...\pretty\build\htmlLspWorker.js`, `...\pretty\build\cssLspWorker.js` | Beautified bundles (1.58 MB / 1.03 MB raw). |
| Search-index / search-in-files workers | `...\pretty\build\searchIndexWorker.js`, `...\pretty\build\searchInFilesWorker.js` | Beautified bundles. |
| Run-preview console runtime | `...\pretty\build\console.js` (+ `consoleWorker.js`) | Beautified bundle, 641 modules. |
| App HTML entry (startup script, splash, `<wc-page id="root">`) | `...\pretty\index.html` | **Format-preserved, near-original** — this file is *not* bundled. |
| Cordova plugin registry | `...\pretty\cordova_plugins.js` | Near-original (not bundled/minified). |
| Cordova plugin sources (49 modules) | `...\pretty\plugins\**` | **Largely original** — see §5. |
| Stylesheets | `...\pretty\build\main.css` (11,027 lines), `plugins.css`, `*.css` | Beautified from minified CSS. |
| Named lazy chunks (original names survive in the Rspack map) | `welcome`, `mainSettings`, `fileBrowser`, `about`, `help`, `plugins`, `tester`, `themeSetting`, `customTheme`, `changeTheme`, `changeMode`, `commandPalette`, `findFile`, `fontManager`, `formatterSettings`, `problems`, `prettierFormatter` (`...\pretty\build\*.chunk.js`) | Beautified bundles; **chunk names are original**. |
| Numeric lazy chunks | `...\pretty\build\<id>.chunk.js` — 242 files | Beautified bundles; original names were not emitted for these. |

---

## 5. Module / feature inventory

**Named chunks (original Rspack chunk names recovered from the runtime map in `main.js`):**

`mainSettings`, `findFile`, `fileBrowser`, `formatterSettings`, `plugins`, `changeMode`, `themeSetting`,
`tester`, `welcome`, `prettierFormatter`, `customTheme`, `commandPalette`, `help`, `fontManager`,
`problems`, `changeTheme`, `about` — plus 242 anonymous numeric chunks.

**Feature areas confirmed by code (all in `main.js` unless noted):**

* **Editor core** — CodeMirror 6 extensions, fold service, keymaps, Ace-compat `window.ace` + `modesByName`.
* **Multi-pane tabs** — pane split/merge, tab drag with `requestAnimationFrame` auto-scroll, pinned tabs,
  `file-content-changed` / `rename-file` / `remove-file` events.
* **LSP subsystem** — `LSPClient`, server launcher abstraction with `kind: apk | npm | pip | cargo |
  github-release | manual`, install/update/uninstall command builders, `window/workDoneProgress/create`
  auto-response, per-server log buffers (200-entry ring), `acode:lsp-diagnostics-updated` state effects.
  Bundled servers declared: `ty`, `pylsp` (Python), `clangd` (C/C++), `gopls` (Go), `luau-lsp`, plus
  builtin TS/HTML/CSS/JSON workers.
* **Terminal** — xterm.js, local (proot/Alpine) and server modes, SSH/SFTP remote shells via
  profile ids, `resizeTerminal`, touch-selection handles, install-flow terminal, quick-tools toggler.
* **Run / preview** — `run-preview`, HTML preview server on a configurable port, cache-busting, injected
  `<head>` snippet marked `<!-- Injected code, this is not present in original code -->`, SVG-as-image
  preview path.
* **Formatters** — Prettier registry (`prettierFormatter.chunk.js` + `5675.chunk.js`), language whitelist
  `js, cjs, mjs, jsx, ts, tsx, json, json5, css, scss, less, html, htm, vue, …`.
* **Markdown / docs** — markdown-it pipeline + anchor permalinks + KaTeX + lowlight; `README.md`/`*.md`
  rendering with a highlight stylesheet injected into `<style id=...>` and shadow roots.
* **Storage** — Cordova File API abstraction, SAF (`content://`) URIs, FTP, SFTP with native profile
  migration, sdcard plugin, internal-storage fallback when external storage is unavailable.
* **Logging** — `LOG_FILE_NAME` ring-buffer logger, `DATA_STORAGE` writes, size-capped at `0xa00000`
  (10 MiB), auto-flush interval, flush on Cordova `pause`.
* **Plugins** — plugin loader from `PLUGIN_DIR`, plugin file-handler registration, `registerQuickToolsAdapter`.

---

## 6. Fidelity statement (honest, per artifact class)

| Artifact class | Fidelity | What was and was not preserved |
|---|---|---|
| `raw/**` | **Bit-exact** | Straight `zipfile` extraction; bytes identical to APK. This is the ground truth for any further work. |
| `pretty/**/*.js` | **Beautified bundle — NOT original source** | Original string literals, object keys, exported names and code structure are intact and semantically identical. **Lost forever:** original file boundaries beyond webpack module boundaries, original identifier names for locals/params, original types (all TS annotations erased), original formatting, comments stripped by the minifier, original `import` specifiers (replaced by numeric module ids), and original directory layout. Module boundaries **are** preserved and visible as `NNNNN: function(e,t,i){…}` keys — 3,708 of them. Re-indentation is cosmetic only. |
| `pretty/**/*.css` | **Beautified (minified→expanded)** | Selectors/declarations intact; only whitespace re-added. |
| `pretty/index.html` | **Near-original** | Never minified; contains the original startup/handshake script and Chinese WebView-version error strings. |
| `pretty/cordova.js`, `cordova_plugins.js`, `plugins/**` | **Largely original** | Cordova ships these unminified; expect real variable names and original comments. Minor bundler wrappers only. |
| `pretty/**` fonts, images, `.ttf`/`.woff*`/`.png`/`.svg` | **Bit-exact copies** of `raw/**` | Not text; copied unchanged. |

**Bottom line on the open-source release:** the release cannot ship the fork's original `src/**`
TypeScript — those bytes do not exist in this APK. A defensible release artifact is
`pretty/` (readable, module-decomposed, semantically faithful bundles) plus `raw/` (byte-exact
provenance) plus `tools/beautify_all.py` (reproduction), with the fidelity table above published alongside.

**Legal note for the release:** the web app is a fork of the upstream **Acode** project
(`com.foxdebug.acode`), whose own licence and attribution must be respected. The APK ships
`assets/www/licenses/` and `assets/www/licenses-host/` (extracted to `raw/licenses/` and
`raw/licenses-host/`) which enumerate third-party licences — those should be carried into any release.

---

## 7. Reproduction / limitations

* **Reproduce `pretty/`:** `"C:\Users\Administrator\AppData\Local\Programs\Python\Python312\python.exe" tools\beautify_all.py`
  (requires `pip install jsbeautifier cssbeautifier`; it skips files already present, so it is re-runnable).
* **Scope respected:** nothing outside `opensource\yltool\web\` was written to, modified, or deleted.
  The APK was opened read-only; no Android binary was executed.
* **Resources:** beautification ran single-file, one file at a time, in a background job — peak RSS well
  under the machine's budget; no whole-APK in-memory expansion.
* **No reverse-engineering of webpack into original modules was attempted** (per task scope) — it would be
  guesswork, since identifier names and type information are irrecoverably destroyed.

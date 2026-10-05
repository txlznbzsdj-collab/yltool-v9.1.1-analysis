"""Beautify every extracted JS/CSS asset into pretty/ (memory-modest, one file at a time)."""
import os
import sys
import time

import jsbeautifier
import cssbeautifier

RAW = r"E:\桌面\dshGUI_install\plugins\新建文件夹\opensource\yltool\web\raw"
PRETTY = r"E:\桌面\dshGUI_install\plugins\新建文件夹\opensource\yltool\web\pretty"

JS_OPTS = jsbeautifier.default_options()
JS_OPTS.indent_size = 2
JS_OPTS.max_preserve_newlines = 2
JS_OPTS.end_with_newline = True
JS_OPTS.wrap_line_length = 0

CSS_OPTS = cssbeautifier.default_options()
CSS_OPTS.indent_size = 2
CSS_OPTS.end_with_newline = True

EXTS = {".js": "js", ".css": "css", ".html": "html", ".json": "json"}


def main():
    done = failed = skipped = 0
    total_in = total_out = 0
    t0 = time.time()
    for root, _dirs, files in os.walk(RAW):
        for name in files:
            ext = os.path.splitext(name)[1].lower()
            kind = EXTS.get(ext)
            if not kind:
                continue
            src = os.path.join(root, name)
            rel = os.path.relpath(src, RAW)
            dst = os.path.join(PRETTY, rel)
            if os.path.exists(dst) and os.path.getsize(dst) > 0:
                skipped += 1
                continue
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            try:
                with open(src, encoding="utf-8", errors="replace") as fh:
                    text = fh.read()
                if kind == "css":
                    out = cssbeautifier.beautify(text, CSS_OPTS)
                elif kind == "js":
                    out = jsbeautifier.beautify(text, JS_OPTS)
                else:
                    out = text
                with open(dst, "w", encoding="utf-8", newline="\n") as fh:
                    fh.write(out)
                done += 1
                total_in += len(text)
                total_out += len(out)
            except Exception as exc:  # keep going, report at end
                failed += 1
                print(f"FAIL {rel}: {exc}", flush=True)
    print(
        f"beautified={done} skipped={skipped} failed={failed} "
        f"in={total_in/1048576:.1f}MB out={total_out/1048576:.1f}MB "
        f"elapsed={time.time()-t0:.1f}s"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

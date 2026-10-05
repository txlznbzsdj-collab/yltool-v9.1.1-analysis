"use strict";
(self.rspackChunkcom_foxdebug_acode = self.rspackChunkcom_foxdebug_acode || []).push([
  [9562], {
    78177: function(e, t, l) {
      let i;
      l.r(t);
      var o = l(86732),
        r = l(58588),
        s = l(39037);

      function n(e) {
        r.Ay.refreshRenderedIcons(i), i.getAll(":scope .scroll[data-scroll-top]").forEach(e => {
          e.scrollTop = e.dataset.scrollTop
        })
      }

      function a(e) {
        if (!i.children.length) return void acode.exec("open-folder");
        let {
          target: t
        } = e;
        t.matches(".files>.list>.tile") && c(t.parentElement)
      }

      function c(e) {
        let t, l = Array.from(i.getAll(":scope > div")),
          o = (l.length - 1) * 30;
        if (s.default.value.openFileListPos === s.default.OPEN_FILE_LIST_POS_SIDEBAR) {
          let [e] = l;
          if (e.classList.contains("file-list") && (t = e, e.unclasped)) {
            let e = o - 30,
              i = Math.min(30 * t.$ul.children.length + 30, (1 !== l.length && l.slice(1).find(e => e.unclasped) ? window.innerHeight / 2 : window.innerHeight) - e);
            t.style.maxHeight = `${i}px`, t.style.height = `${i}px`, o += i - 30
          }
        }
        l.forEach(l => {
          if (l !== t) {
            if (e === t) {
              if (l.collapsed) {
                l.style.removeProperty("max-height"), l.style.removeProperty("height");
                return
              }
              e = l
            }
            if (l === e && e.unclasped) {
              l.style.maxHeight = `calc(100% - ${o}px)`, l.style.height = `calc(100% - ${o}px)`;
              return
            }
            if (l.collapsed) {
              l.style.removeProperty("max-height"), l.style.removeProperty("height");
              return
            }
            l.collapse(), l.style.removeProperty("max-height"), l.style.removeProperty("height")
          }
        })
      }
      t.default = ["documents", "files", strings.files, function(e) {
        (i = e).classList.add("files"), i.setAttribute("data-msg", strings["open folder"]), i.style.overflowX = "auto", i.addEventListener("click", a), editorManager.on(["new-file", "int-open-file-list", "remove-file"], e => {
          if ("string" == typeof e && e !== s.default.OPEN_FILE_LIST_POS_SIDEBAR) return;
          let t = i.get(":scope > div.file-list");
          t && c(t)
        }), editorManager.on("add-folder", c), o.A.on("show", n)
      }, !1, n], l.d(t, {
        fixHeight: function() {
          return c
        }
      })
    }
  }
]);

"use strict";
(self.rspackChunkcom_foxdebug_acode = self.rspackChunkcom_foxdebug_acode || []).push([
  [8175], {
    31746: function(e, t, o) {
      o.r(t);
      var r = o(57508),
        n = o(29715),
        l = o(38709);

      function i(e, t, o, r, n, l, i) {
        try {
          var d = e[l](i),
            a = d.value
        } catch (e) {
          o(e);
          return
        }
        d.done ? t(a) : Promise.resolve(a).then(r, n)
      }
      let d = null,
        a = !1;
      t.default = {
        get isInitialized() {
          return a
        },
        get eruda() {
          return d
        },
        init: (e = !1) => {
          var t;
          return (t = function*() {
            if (!a) try {
              let e = l.A.join(DATA_STORAGE, "eruda.js"),
                t = (0, r.default)(e);
              if (!(yield t.exists())) return void console.warn("Developer tools unavailable: eruda.js was not found in the app data directory.");
              let o = yield n.A.toInternalUri(e);
              yield new Promise((e, t) => {
                let r = document.createElement("script");
                r.src = o, r.id = "eruda-script", r.onload = e, r.onerror = t, document.head.appendChild(r)
              }), window.eruda && (window.eruda.init({
                useShadowDom: !0,
                autoScale: !0,
                defaults: {
                  displaySize: 50
                }
              }), window.eruda._shadowRoot.querySelector(".eruda-entry-btn").style.display = "none", d = window.eruda, a = !0)
            } catch (e) {
              throw console.error("Failed to initialize developer tools", e), e
            }
          }, function() {
            var e = this,
              o = arguments;
            return new Promise(function(r, n) {
              var l = t.apply(e, o);

              function d(e) {
                i(l, r, n, d, a, "next", e)
              }

              function a(e) {
                i(l, r, n, d, a, "throw", e)
              }
              d(void 0)
            })
          })()
        },
        show() {
          var e, t, o;
          if (!a) {
            null == (t = (o = window).toast) || t.call(o, "Developer mode is not enabled");
            return
          }
          let r = null == d || null == (e = d._shadowRoot) ? void 0 : e.querySelector(".eruda-entry-btn");
          r && (r.style.display = ""), null == d || d.show()
        },
        hide() {
          var e;
          if (!a) return;
          null == d || d.hide();
          let t = null == d || null == (e = d._shadowRoot) ? void 0 : e.querySelector(".eruda-entry-btn");
          t && (t.style.display = "none")
        },
        toggle() {
          if (!a) {
            var e, t;
            null == (e = (t = window).toast) || e.call(t, "Developer mode is not enabled");
            return
          }(null == d ? void 0 : d._isShow) ? this.hide(): this.show()
        },
        destroy() {
          if (!a) return;
          null == d || d.destroy(), d = null, a = !1;
          let e = document.getElementById("eruda-script");
          e && e.remove()
        }
      }
    }
  }
]);

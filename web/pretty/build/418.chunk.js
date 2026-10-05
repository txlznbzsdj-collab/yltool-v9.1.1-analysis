(self.rspackChunkcom_foxdebug_acode = self.rspackChunkcom_foxdebug_acode || []).push([
  [418], {
    64642: function(e) {
      e.exports = function() {
        "use strict";
        var e = {
            d: function(t, n) {
              for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: n[r]
              })
            },
            o: function(e, t) {
              return Object.prototype.hasOwnProperty.call(e, t)
            }
          },
          t = {};

        function n(e) {
          return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
          } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
          })(e)
        }

        function r(e) {
          var t = function(e) {
            if ("object" != n(e) || !e) return e;
            var t = e[Symbol.toPrimitive];
            if (void 0 !== t) {
              var r = t.call(e, "string");
              if ("object" != n(r)) return r;
              throw TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(e)
          }(e);
          return "symbol" == n(t) ? t : t + ""
        }

        function l(e) {
          return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
          })(e)
        }

        function o(e, t) {
          return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
            return e.__proto__ = t, e
          })(e, t)
        }

        function i() {
          try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
          } catch (e) {}
          return (i = function() {
            return !!e
          })()
        }

        function a(e) {
          var t = "function" == typeof Map ? new Map : void 0;
          return (a = function(e) {
            if (null === e || ! function(e) {
                try {
                  return -1 !== Function.toString.call(e).indexOf("[native code]")
                } catch (t) {
                  return "function" == typeof e
                }
              }(e)) return e;
            if ("function" != typeof e) throw TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
              if (t.has(e)) return t.get(e);
              t.set(e, n)
            }

            function n() {
              return function(e, t, n) {
                if (i()) return Reflect.construct.apply(null, arguments);
                var r = [null];
                r.push.apply(r, t);
                var l = new(e.bind.apply(e, r));
                return n && o(l, n.prototype), l
              }(e, arguments, l(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            }), o(n, e)
          })(e)
        }

        function c() {
          try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
          } catch (e) {}
          return (c = function() {
            return !!e
          })()
        }

        function s(e, t, n) {
          if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
          throw TypeError("Private element is not present on this object")
        }
        e.d(t, {
          default: function() {
            return d
          }
        });
        var u = new WeakMap,
          f = function(e) {
            var t;

            function i() {
              var e, t, o, a, s, f, d = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
              return function(e, t) {
                  if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                }(this, i), f = [d], s = l(s = i), e = a = function(e, t) {
                  if (t && ("object" == n(t) || "function" == typeof t)) return t;
                  if (void 0 !== t) throw TypeError("Derived constructors may only return object or undefined");
                  if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return e
                }(this, c() ? Reflect.construct(s, f || [], l(this).constructor) : s.apply(this, f)), (t = r(t = "onChange")) in e ? Object.defineProperty(e, t, {
                  value: null,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                }) : e[t] = null, o = void 0,
                function(e, t) {
                  if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object")
                }(a, u), u.set(a, o), a.clones = [a], a.shouldClone = !1, a.value = d, a
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                  }
                }), Object.defineProperty(e, "prototype", {
                  writable: !1
                }), t && o(e, t)
              }(i, e), t = [{
                key: "value",
                get: function() {
                  return u.get(s(u, this))
                },
                set: function(e) {
                  u.set(s(u, this), e), this.clones.forEach(function(t) {
                    t.textContent = e
                  }), "function" == typeof this.onChange && this.onChange.call(this, e)
                }
              }, {
                key: "clone",
                value: function() {
                  var e = new d(this.value);
                  return this.clones.push(e), e
                }
              }, {
                key: "toString",
                value: function() {
                  return "".concat(u.get(s(u, this)))
                }
              }],
              function(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var l = t[n];
                  l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, r(l.key), l)
                }
              }(i.prototype, t), Object.defineProperty(i, "prototype", {
                writable: !1
              }), i
          }(a(Text));

        function d(e) {
          return new f(e)
        }
        return d.isReactive = function(e) {
          return e instanceof f
        }, t.default
      }()
    },
    38953: function(e, t, n) {
      "use strict";
      let r;
      n.r(t), n.d(t, {
        default: function() {
          return eO
        }
      });
      var l = n(14765),
        o = n.n(l),
        i = n(57508),
        a = n(42040),
        c = n(30464),
        s = n(99913),
        u = n(86732),
        f = n(28898),
        d = n(64642),
        h = n.n(d),
        g = n(45584),
        p = n.n(g),
        m = n(30588),
        v = n(95190),
        y = n(77224),
        w = n(54694),
        b = n(39037),
        x = n(29715),
        S = n(85188),
        k = n(24665);

      function A(e, t, n, r, l, o, i) {
        try {
          var a = e[o](i),
            c = a.value
        } catch (e) {
          n(e);
          return
        }
        a.done ? t(c) : Promise.resolve(c).then(r, l)
      }

      function M(e, {
        row: t,
        column: n
      }) {
        let r = e.line(Math.max(1, Math.min(t + 1, e.lines)));
        return r.from + Math.max(0, Math.min(n, r.length))
      }

      function E(e, t, n, r, l, o, i) {
        try {
          var a = e[o](i),
            c = a.value
        } catch (e) {
          n(e);
          return
        }
        a.done ? t(c) : Promise.resolve(c).then(r, l)
      }

      function T(e) {
        return function() {
          var t = this,
            n = arguments;
          return new Promise(function(r, l) {
            var o = e.apply(t, n);

            function i(e) {
              E(o, r, l, i, a, "next", e)
            }

            function a(e) {
              E(o, r, l, i, a, "throw", e)
            }
            i(void 0)
          })
        }
      }
      let O = [],
        I = [],
        C = [],
        P = [],
        F = [],
        D = [],
        j = p()(),
        $ = p()(),
        W = p()(),
        _ = p()(),
        N = p()(),
        L = p()(),
        R = p()(),
        V = p()(),
        H = p()(),
        q = p()(),
        z = p()(),
        G = h()(),
        B = h()(),
        J = h()(""),
        U = null,
        X = {
          filesCount: 0,
          matchesCount: 0,
          reset() {
            this.filesCount = 0, this.matchesCount = 0, z.innerHTML = eB(0, 0), z.classList.remove("error")
          }
        },
        K = "search-in-files-case-sensitive",
        Q = "search-in-files-whole-word",
        Y = "search-in-files-reg-exp",
        Z = "search-in-files-exclude",
        ee = "search-in-files-include",
        et = "search-in-files-use-native-index",
        en = {
          get caseSensitive() {
            return "true" === localStorage.getItem(K)
          },
          set caseSensitive(e) {
            localStorage.setItem(K, e)
          },
          get wholeWord() {
            return "true" === localStorage.getItem(Q)
          },
          set wholeWord(e) {
            return localStorage.setItem(Q, e)
          },
          get regExp() {
            return "true" === localStorage.getItem(Y)
          },
          set regExp(e) {
            return localStorage.setItem(Y, e)
          },
          get exclude() {
            return localStorage.getItem(Z)
          },
          set exclude(e) {
            return localStorage.setItem(Z, e)
          },
          get include() {
            return localStorage.getItem(ee)
          },
          set include(e) {
            return localStorage.setItem(ee, e)
          },
          get useIndex() {
            return "true" === localStorage.getItem(et)
          },
          set useIndex(e) {
            localStorage.setItem(et, e)
          }
        },
        er = x.A.debounce(function() {
          return T(function*() {
            var e;
            let t = W.value;
            if (!t) return void ec.removeGhostText();
            let n = ez(),
              r = eU(t, n);
            if (!r) return void ec.removeGhostText();
            let l = em;
            if (yield(e = l, T(function*() {
                let t = (0, v.Ut)();
                U = e;
                let n = yield eR(t, 250);
                if (e === em && (n === eL && (J.value = "Scanning project files...", n = yield eR(t, 4750)), e === em)) {
                  if (J.value = "", n !== eL) {
                    U = null;
                    return
                  }
                  G.value = "Project scan is still running; search results may be incomplete.", t.then(() => {
                    e === em && (U = null, G.value = "Project scan finished; search again to include newly discovered files.")
                  })
                }
              })()), l !== em) return;
            v.Ay.on("add-file", eK), v.Ay.on("remove-file", eQ), v.Ay.on("add-folder", ej), v.Ay.on("remove-folder", ej), v.Ay.on("refresh", ej), editorManager.on("rename-file", eY), editorManager.on("file-content-changed", eY);
            let o = (0, v.Ay)().filter(e => !x.A.isBinary(e)),
              i = w.f.filter(({
                listFiles: e
              }) => e).map(({
                url: e
              }) => e).filter(e => eW(e)),
              a = [];
            if (editorManager.files.forEach(e => {
                !e.uri || x.A.isBinary(e.uri) || (eW(e.uri) ? a.push(new v.PH(e.name, e.uri, !1)) : o.find(t => t.url === e.uri) || o.push(new v.PH(e.name, e.uri, !1)))
              }), !o.length && !i.length && !a.length) {
              ec.setGhostText(strings["no result"], {
                row: 0,
                column: 0
              }), B.value = 100;
              return
            }
            ep = !0, O.length = 0, I.length = 0, es = r, ec.setGhostText(strings["searching..."], {
              row: 0,
              column: 0
            });
            let c = o.filter(e => !eW(e.url));
            eA = 0, (i.length || a.length) && (eA += 1, e_("search", a, t, n, void 0, i)), c.length && (eA += 1, eV("search-files", c, r, n))
          })()
        }, 500),
        el = !1,
        eo = !!(en.exclude || en.include),
        ei = eo,
        ea = p()(),
        ec = null,
        es = null,
        eu = 0,
        ef = 0,
        ed = 0,
        eh = !1,
        eg = 0,
        ep = !1,
        em = 0,
        ev = "",
        ey = 0,
        ew = [],
        eb = 0,
        ex = 0,
        eS = null,
        ek = null,
        eA = 0,
        eM = 0;

      function eE() {
        el = !el, ea.el.classList.toggle("show-replace", el);
        let e = ea.el.querySelector(".actions button:first-child");
        e && e.classList.toggle("active", el)
      }

      function eT() {
        var e, t;
        eo = !eo, ea.el.classList.toggle("show-extras", eo);
        let n = ea.el.querySelector(".actions button:last-child");
        n && n.classList.toggle("active", eo), ei = eo, ((null == (e = N.el) ? void 0 : e.value) || (null == (t = L.el) ? void 0 : t.value)) && ej()
      }
      eG($, "change", ej), eG(R, "change", ej), eG(V, "change", ej), eG(H, "change", ej), eG(W, "input", ej), eG(L, "input", ej), eG(N, "input", ej), eG(q, "click", function() {
        return T(function*() {
          eq(), D.length = 0;
          let e = W.value,
            t = _.value,
            n = ez();
          if (!e || !t) return;
          let r = eU(e, n);
          if (!r) return;
          eh = !0, eM = 0;
          let l = F.filter(e => eW(e.url)),
            o = F.filter(e => !eW(e.url));
          l.length && (eM += 1, e_("replace", l, e, n, t)), o.length && (eM += 1, eV("replace-files", o, r, n, t)), eM || (eh = !1)
        })()
      }), v.Ay.on("push-file", () => {
        ep && (G.value = strings["missed files"].replace("{count}", ++eg))
      }), j.onref = e => {
        var t;
        null == (t = (ec = function(e, {
          onLineClick: t,
          getWords: n,
          getFileInfo: r,
          getRegex: l
        }) {
          var o, i, a;
          let c, s, u = !1,
            f = S.StateEffect.define(),
            d = S.StateField.define({
              create: () => new Set,
              update(e, t) {
                let n = e;
                for (let r of t.effects)
                  if (r.is(f)) {
                    n === e && (n = new Set(e));
                    let t = r.value;
                    n.has(t) ? n.delete(t) : n.add(t)
                  } return t.docChanged && 0 === t.startState.doc.length ? new Set : n
              }
            });
          class h extends k.WidgetType {
            eq(e) {
              return e.collapsed === this.collapsed
            }
            toDOM() {
              let e = document.createElement("span");
              return e.className = `cm-foldChevron icon keyboard_arrow_${this.collapsed?"down":"up"}`, e
            }
            ignoreEvent() {
              return !1
            }
            constructor(e) {
              super(), this.collapsed = e
            }
          }
          class g extends k.WidgetType {
            eq(e) {
              return e.text === this.text
            }
            toDOM() {
              let e = document.createElement("div");
              return e.className = "cm-collapsedSummary", e.textContent = this.text, e
            }
            ignoreEvent() {
              return !1
            }
            constructor(e) {
              super(), this.text = e
            }
          }
          class p extends k.WidgetType {
            eq(e) {
              return e.count === this.count
            }
            toDOM() {
              let e = document.createElement("span");
              return e.className = "cm-fileCount", e.textContent = String(this.count), e
            }
            ignoreEvent() {
              return !0
            }
            constructor(e) {
              super(), this.count = e
            }
          }
          class m extends k.WidgetType {
            eq(e) {
              return e.className === this.className && e.name === this.name
            }
            toDOM() {
              let e = document.createElement("span");
              return e.className = `${x.A.getIconForFile(this.name)} cm-fileIcon`, e.dataset.fileIconName = this.name, e.dataset.fileIconExtra = "cm-fileIcon", e
            }
            ignoreEvent() {
              return !1
            }
            constructor(e, t) {
              super(), this.className = e, this.name = t
            }
          }

          function v(e) {
            let t = e.doc,
              n = e.field(d, !1) || new Set;
            if (u || 0 === t.length || 0 === t.lines) return k.Decoration.none;
            let l = [];
            return ! function(e, t) {
              let n = e.lines,
                r = 1;
              for (; r <= n;) {
                if (e.line(r).text.startsWith("	")) {
                  r++;
                  continue
                }
                let l = r;
                for (let t = r + 1; t <= n && e.line(t).text.startsWith("	"); t++) l = t;
                t({
                  start: r,
                  end: l
                }), r = l + 1
              }
            }(t, ({
              start: e,
              end: o
            }) => {
              let i = t.line(e),
                a = e - 1,
                c = n.has(a);
              l.push(k.Decoration.line({
                class: "cm-fileName"
              }).range(i.from));
              let s = (null == r ? void 0 : r(a)) || {},
                u = "string" == typeof s ? s : s.name || "",
                f = x.A.getIconForFile(u);
              l.push(k.Decoration.widget({
                widget: new m(f, u),
                side: -1
              }).range(i.from));
              let d = "object" == typeof s && Number.isFinite(s.count) ? s.count : Math.max(0, o - e);
              if (l.push(k.Decoration.widget({
                  widget: new p(d),
                  side: 1
                }).range(i.to)), l.push(k.Decoration.widget({
                  widget: new h(c),
                  side: 1
                }).range(i.to)), c && o > e) {
                let n = t.line(e + 1),
                  r = t.line(o);
                l.push(k.Decoration.replace({
                  block: !0
                }).range(n.from, r.to)), l.push(k.Decoration.widget({
                  widget: new g(`${d} result${d>1?"s":""}`),
                  side: 1,
                  block: !0
                }).range(n.from))
              }
            }), k.Decoration.set(l, !0)
          }
          let y = S.StateField.define({
              create: e => v(e),
              update: (e, t) => t.docChanged || t.startState.field(d, !1) !== t.state.field(d, !1) ? v(t.state) : e.map(t.changes),
              provide: e => k.EditorView.decorations.from(e)
            }),
            w = k.ViewPlugin.fromClass(class {
              update(e) {
                (e.docChanged || e.viewportChanged || e.startState.field(d) !== e.state.field(d)) && (this.decorations = this.buildDecos(e.view))
              }
              buildDecos(e) {
                let t = [];
                if (u) return k.Decoration.none;
                let r = null;
                if ("function" == typeof l) {
                  let e = l();
                  if (e && e.source) {
                    let t = (e.ignoreCase ? "i" : "") + "g";
                    try {
                      r = new RegExp(e.source, t)
                    } catch (e) {}
                  }
                }
                let o = r ? [] : ((null == n ? void 0 : n()) || []).filter(Boolean),
                  i = null;
                if (!r && o.length) {
                  let e = o.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
                  try {
                    i = RegExp(e, "g")
                  } catch (e) {}
                }
                let a = r || i;
                if (a)
                  for (let {
                      from: n,
                      to: r
                    }
                    of e.visibleRanges) {
                    let l = n;
                    for (; l <= r;) {
                      let n = e.state.doc.lineAt(l),
                        o = n.text;
                      if (o && 9 === o.charCodeAt(0)) {
                        let e, r = o.match(/^\t\d+: /),
                          l = r ? r[0].length : 0;
                        for (r && t.push(k.Decoration.mark({
                            class: "cm-resultLineNumber"
                          }).range(n.from + 1, n.from + r[0].length)), a.lastIndex = 0; e = a.exec(o);) {
                          if (e.index < l) {
                            e.index === a.lastIndex && a.lastIndex++;
                            continue
                          }
                          let r = n.from + e.index,
                            o = r + e[0].length;
                          t.push(k.Decoration.mark({
                            class: "cm-match"
                          }).range(r, o)), e.index === a.lastIndex && a.lastIndex++
                        }
                      }
                      if (n.to >= r) break;
                      l = n.to + 1
                    }
                  }
                return k.Decoration.set(t, !0)
              }
              constructor(e) {
                this.decorations = this.buildDecos(e)
              }
            }, {
              decorations: e => e.decorations,
              eventHandlers: {
                mousedown(e, n) {
                  if (u) return;
                  let r = e.target && e.target.closest ? e.target.closest(".cm-line") : null;
                  if (!r) return;
                  let l = n.posAtDOM(r, 0),
                    o = n.state.doc.lineAt(l).number - 1,
                    i = n.state.doc.line(o + 1).text,
                    a = r.classList.contains("cm-fileName"),
                    c = i.length > 0 && 9 !== i.charCodeAt(0);
                  if (a || c) {
                    n.dispatch({
                      effects: f.of(o)
                    }), e.preventDefault(), e.stopPropagation();
                    return
                  }
                  i && 9 === i.charCodeAt(0) && (null == t || t(o))
                }
              }
            }),
            A = S.EditorState.readOnly.of(!0),
            M = k.EditorView.lineWrapping,
            E = k.EditorView.editable.of(!1),
            T = k.EditorView.theme({
              "&": {
                fontSize: String((null === b.default || void 0 === b.default || null == (o = b.default.value) ? void 0 : o.fontSize) || "12px"),
                lineHeight: String((null === b.default || void 0 === b.default || null == (i = b.default.value) ? void 0 : i.lineHeight) || 1.5)
              },
              ".cm-content": {
                padding: 0,
                fontFamily: (s = (null === b.default || void 0 === b.default || null == (a = b.default.value) ? void 0 : a.editorFont) || "Roboto Mono", `${s}, Noto Mono, Monaco, monospace`)
              },
              ".cm-line": {
                color: "var(--primary-text-color)"
              }
            }),
            O = S.EditorState.create({
              doc: "",
              extensions: [S.EditorState.tabSize.of(4), A, E, M, T, d, y, w]
            });
          return c = new k.EditorView({
            state: O,
            parent: e
          }), {
            setValue(e) {
              u = !1, c.dispatch({
                changes: {
                  from: 0,
                  to: c.state.doc.length,
                  insert: e || ""
                }
              })
            },
            insert(e) {
              e && c.dispatch({
                changes: {
                  from: c.state.doc.length,
                  insert: e
                }
              })
            },
            setGhostText(e) {
              u = !0, c.dispatch({
                changes: {
                  from: 0,
                  to: c.state.doc.length,
                  insert: e || ""
                }
              })
            },
            removeGhostText() {
              u = !1, this.setValue("")
            },
            getScrollPosition() {
              var e, t, n, r;
              return {
                top: null != (e = null == (n = c.scrollDOM) ? void 0 : n.scrollTop) ? e : 0,
                left: null != (t = null == (r = c.scrollDOM) ? void 0 : r.scrollLeft) ? t : 0
              }
            },
            setScrollPosition({
              top: e = 0,
              left: t = 0
            } = {}) {
              let n = c.scrollDOM;
              n && (n.scrollTop = e, n.scrollLeft = t)
            },
            get view() {
              return c
            }
          }
        }(e, {
          onLineClick: eX,
          getWords: () => O,
          getFileInfo: e => {
            var t;
            return I[null == (t = P[e]) ? void 0 : t.file]
          },
          getRegex: () => es
        })).view.scrollDOM) || t.addEventListener("scroll", eZ, {
          passive: !0
        }), e0(), j.style.lineHeight = "1.5"
      }, (0, u.O)(e => {
        var t;
        return null == (t = j.el) ? void 0 : t.contains(e)
      });
      var eO = ["search", "searchInFiles", strings["search in files"], e => (e.classList.add("search-in-files"), u.A.on("show", e0), e.content = [o()("div", `header${el?" show-replace":""}${eo?" show-extras":""}`, null, [o()("div", "title-container", null, [o()("span", "title-text", null, [strings["search in files"]]), o()("div", "actions", null, [o()("button", `icon-button${el?" active":""}`, null, [o()("span", "icon replace_all", null)], {
        title: strings.replace,
        onclick: eE,
        type: "button"
      }), o()("button", `icon-button${eo?" active":""}`, null, [o()("span", "icon tune", null)], {
        title: `${strings["exclude files"]} / ${strings["include files"]}`,
        onclick: eT,
        type: "button"
      })])]), o()("div", "options", null, [o()(s.A, {
        ref: V,
        text: "aA",
        size: "10px",
        checked: en.caseSensitive
      }), o()(s.A, {
        ref: R,
        text: "a-z",
        size: "10px",
        checked: en.wholeWord
      }), o()(s.A, {
        ref: $,
        text: ".*",
        size: "10px",
        checked: en.regExp
      }), o()(s.A, {
        ref: H,
        text: "IDX",
        size: "10px",
        checked: en.useIndex
      })]), o()("div", "search-row", null, [o()(eJ, {
        placeholder: strings.search,
        name: "search",
        type: "search",
        ref: W
      })]), o()("div", "replace-row", null, [o()(eJ, {
        placeholder: strings.replace,
        name: "replace",
        type: "search",
        ref: _
      }), o()("button", "icon replace_all", null, {
        title: strings.replace,
        ref: q
      })]), o()("div", "extras-row", null, [o()("input", {
        placeholder: strings["exclude files"],
        name: "exclude",
        type: "search",
        ref: N,
        value: en.exclude
      }), o()("input", {
        placeholder: strings["include files"],
        name: "include",
        type: "search",
        ref: L,
        value: en.include
      })])], {
        ref: ea
      }), o()("div", "search-result-header", null, [o()("span", {
        innerHTML: eB(0, 0),
        ref: z
      }), " ", "\n					(", B, "%)\n				"]), o()("div", "index-status", null, [J]), o()("div", "error", null, [G]), o()("div", "search-in-file-editor editor-container", null, {
        ref: j
      })], () => u.A.off("show", e0)), !1, () => {}];

      function eI(e) {
        return T(function*() {
          let {
            action: t,
            error: n,
            data: r,
            id: l
          } = e.data, o = e.target.searchVersion;
          if (o === em) {
            if (n) {
              window.log("error", n), console.error(n);
              return
            }
            switch (t) {
              case "processing":
                clearTimeout(e.target.searchWatchdog), e.target.searchWatchdog = setTimeout(() => {
                  o === em && (G.value = "Search timed out; simplify the expression", eq(!1), eh ? eD(o) : eF(o))
                }, 2e3);
                break;
              case "processed":
                clearTimeout(e.target.searchWatchdog);
                break;
              case "get-file": {
                let t, n = "";
                try {
                  var a;
                  if ((n = yield eR((a = r, T(function*() {
                      if (x.A.isBinary(a)) return "";
                      let e = e$(editorManager.getFile(a, "uri"));
                      if (e) try {
                        return (0, c.uS)(e)
                      } catch (e) {
                        return ""
                      }
                      return (0, i.default)(a).readFile(b.default.value.defaultFileEncoding)
                    })()), 3e4)) === eL) throw Error("File read timed out")
                } catch (e) {
                  t = (null == e ? void 0 : e.message) || String(e), o === em && (G.value = t)
                }
                if (o !== em) return;
                e.target.postMessage({
                  id: l,
                  action: "get-file",
                  data: n,
                  error: t
                });
                break
              }
              case "search-result":
                clearTimeout(e.target.searchWatchdog), eC(r), e.target.postMessage({
                  action: "result-ack",
                  id: l
                });
                break;
              case "replace-result": {
                let {
                  file: e,
                  text: t
                } = r;
                D.push(e), (0, y.A)(e.url, {
                  render: F.length === D.length,
                  text: t
                });
                break
              }
              case "done-replacing":
                e.target.doneReplacing = !0, eq(!1), yield eD(o);
                break;
              case "done-searching":
                if (e.target.doneSearching = !0, C.find(e => e.started && !e.doneSearching)) break;
                eq(!1), yield eF(o);
                break;
              case "progress": {
                e.target.progress = r;
                let t = C.filter(e => e.started);
                B.value = Math.min(Math.round(t.reduce((e, {
                  progress: t = 0
                }) => e + t, 0) / t.length), 99)
              }
            }
          }
        })()
      }

      function eC(e) {
        var t;
        let {
          file: n,
          matches: r,
          limited: l
        } = e, o = P.length > 0;
        if (!r.length) return;
        let i = F.findIndex(e => e.url === n.url);
        i < 0 && (i = F.length, F.push(v.PH.fromJSON(n)), 1 === F.length && ec.setValue(""), X.filesCount += 1, I.push({
          name: n.name,
          path: n.path,
          count: 0
        })), I[i].count += r.length, X.matchesCount += r.length, z.innerHTML = eB(X.filesCount, X.matchesCount);
        let a = P.length && P[P.length - 1].file === i,
          c = function(e) {
            let t = [],
              n = new Set;
            for (let i of e) {
              var r, l, o;
              let e = null != (r = null == (o = i.position) || null == (l = o.start) ? void 0 : l.row) ? r : -1,
                a = String(i.line || i.text || i.renderText || i.match || "").trim(),
                c = `${e}
${a}`;
              n.has(c) || (n.add(c), t.push({
                result: i,
                preview: a
              }))
            }
            return t
          }(r);
        for (let e of (a || P.push({
            file: i,
            match: null,
            position: null
          }), r))
          if (e.file = i, O.length < 400) {
            let t = (0, f.A)(e.renderText);
            O.includes(t) || O.push(t)
          } for (let {
            result: e
          }
          of c) P.push(e);
        l && P.push({
          file: i,
          match: null,
          position: null,
          notice: !0
        });
        let s = function(e, t, n, r = !1) {
          let l = r ? [] : [e.name];
          for (let {
              result: e,
              preview: n
            }
            of t) {
            var o, i;
            let t = null == (i = e.position) || null == (o = i.start) ? void 0 : o.row,
              r = Number.isInteger(t) ? `${t+1}: ` : "";
            l.push(`	${r}${n}`)
          }
          return n && l.push("	... result limit reached for this file"), l.join("\n")
        }(n, c, l, a);
        t = `${o?"\n":""}${s}`, ev += t, ey || (ey = (window.requestAnimationFrame || (e => setTimeout(e, 16)))(() => {
          ec.insert(ev), ev = "", ey = 0
        }))
      }

      function eP() {
        ex && (window.cancelAnimationFrame || clearTimeout)(ex), ex = 0, ew = [], eb = 0, eS = null
      }

      function eF() {
        return T(function*(e = em) {
          e !== em || (eA = Math.max(0, eA - 1)) > 0 || (P.length || ec.setGhostText(strings["no result"], {
            row: 0,
            column: 0
          }), B.value = 100, ep = !1, ek = null, J.value = "")
        }).apply(this, arguments)
      }

      function eD() {
        return T(function*(e = em) {
          e !== em || (eM = Math.max(0, eM - 1)) > 0 || e === em && (eh = !1, ek = null, J.value = "")
        }).apply(this, arguments)
      }

      function ej(e) {
        if (!ec || eh) return;
        let {
          target: t
        } = e || {};
        (t === V.el && (en.caseSensitive = V.el.checked), t === R.el && (en.wholeWord = R.el.checked), t === $.el && (en.regExp = $.el.checked), t === H.el && (en.useIndex = H.el.checked), t === N.el && (en.exclude = N.el.value), t === L.el && (en.include = L.el.value), eq(), function() {
          if (ek && "u" > typeof sdcard) {
            try {
              sdcard.workspaceCancel(ek)
            } catch (e) {}
            ek = null
          }
        }(), J.value = "", em += 1, ep = !1, eA = 0, eM = 0, eg = 0, G.value = "", P.length = 0, O.length = 0, I.length = 0, es = null, B.value = 0, F.length = 0, X.reset(), eu = 0, ef = 0, cancelAnimationFrame(ed), ed = 0, ey && ((window.cancelAnimationFrame || clearTimeout)(ey), ev = "", ey = 0), eP(), ec.setValue(""), v.Ay.off("add-file", eK), v.Ay.off("remove-file", eQ), v.Ay.off("add-folder", ej), v.Ay.off("remove-folder", ej), v.Ay.off("refresh", ej), editorManager.off("rename-file", eY), editorManager.off("file-content-changed", eY), W.value) ? (ec.setGhostText(strings["searching..."], {
          row: 0,
          column: 0
        }), er()) : ec.removeGhostText()
      }

      function e$(e) {
        var t;
        let n = null == e || null == (t = e.session) ? void 0 : t.doc;
        return n && (e.loaded || e.loading && e.isUnsaved && n.length > 0) ? n : null
      }

      function eW(e = "") {
        return m.Ay.supports(e) && "u" > typeof sdcard && "function" == typeof sdcard.workspaceSearch && (/^file:/.test(e) || /^content:/.test(e))
      }

      function e_(e, t, n, r, l, o = []) {
        let i, a = `search-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          s = em;
        ek = a, sdcard.workspaceSearch({
          id: a,
          mode: e,
          files: t.map(e => e.toJSON()),
          roots: o,
          search: n,
          replace: l,
          options: r,
          overlays: (i = {}, editorManager.files.forEach(e => {
            if (!e.uri || !eW(e.uri)) return;
            let t = e$(e);
            if (t) try {
              i[e.uri] = (0, c.uS)(t)
            } catch (e) {}
          }), i),
          defaultEncoding: b.default.value.defaultFileEncoding,
          useIndex: en.useIndex,
          batchResults: !0
        }, t => T(function*() {
          if (t && t.id === a && s === em && ek === a) switch (t.type || t.action) {
            case "status":
              J.value = t.message || "";
              break;
            case "progress":
              B.value = Math.min(t.data || 0, 99);
              break;
            case "search-result":
              eC(t.data);
              break;
            case "search-results":
              var n;
              n = t.data, Array.isArray(n) && s === em && (ew.push(...n), function e(t) {
                ex || (ex = (window.requestAnimationFrame || (e => setTimeout(e, 16)))(() => (function(t) {
                  if (ex = 0, t !== em) return void eP();
                  let n = performance.now(),
                    r = 0;
                  for (; eb < ew.length && r < 4 && performance.now() - n < 8;) eC(ew[eb++]), r += 1;
                  eb < ew.length ? e(t) : (ew = [], eb = 0, eS === t && (eS = null, eF(t)))
                })(t)))
              }(s));
              break;
            case "replace-result":
              D.push(t.file), (0, y.A)(t.file.url, {
                render: F.length === D.length,
                text: t.text
              });
              break;
            case "done-searching":
              ek = null, eb < ew.length || ex ? eS = s : yield eF(s);
              break;
            case "done-replacing":
              ek = null, yield eD(s);
              break;
            case "error":
              console.error(t.error), G.value = t.error || "Native search failed", ek = null, eP(), yield "replace" === e ? eD(s) : eF(s)
          }
        })(), t => T(function*() {
          s === em && ek === a && (console.error(t), G.value = (null == t ? void 0 : t.message) || String(t), ek = null, eP(), yield "replace" === e ? eD(s) : eF(s))
        })())
      }

      function eN(e) {
        m.Ay.markDirty(e).catch(() => {})
      }
      let eL = Symbol("timeout");

      function eR(e, t) {
        let n;
        return Promise.race([e, new Promise(e => {
          n = setTimeout(() => e(eL), t)
        })]).finally(() => clearTimeout(n))
      }

      function eV(e, t, n, r, l) {
        let o = C.length,
          i = Math.ceil(t.length / o);
        for (let a = 0; a < o; a++) {
          let o = C[a],
            c = a * i,
            s = t.slice(c, c + i).map(e => e.toJSON());
          if (!s.length) break;
          o.started = !0, o.searchVersion = em, o.postMessage({
            action: e,
            data: {
              files: s,
              search: n,
              replace: l,
              options: r
            }
          })
        }
      }

      function eH(e) {
        console.error(e), e.target.searchVersion === em && (G.value = e.message || "Search worker failed", eq(!1), eh ? eD(em) : eF(em))
      }

      function eq(e = !0) {
        if (C.forEach(e => {
            clearTimeout(e.searchWatchdog), e.terminate()
          }), C.length = 0, e)
          for (let e = 0; e < 1; e++) {
            let e = new Worker("build/searchInFilesWorker.js");
            e.onmessage = eI, e.onerror = eH, C.push(e)
          }
      }

      function ez() {
        let e = ei ? N.el.value.trim() : "",
          t = ei ? L.el.value.trim() : "",
          n = V.el.checked;
        return {
          caseSensitive: n,
          wholeWord: R.el.checked,
          regExp: $.el.checked,
          exclude: e,
          include: t
        }
      }

      function eG(e, t, n) {
        e.onref = e => {
          e.addEventListener(t, n)
        }
      }

      function eB(e, t) {
        return strings["search result"].replace("{files}", `<strong>${e}</strong>`).replace("{matches}", `<strong>${t}</strong>`)
      }

      function eJ({
        name: e,
        placeholder: t,
        ref: n
      }) {
        return (0, a.A)(o()("textarea", {
          placeholder: t,
          name: e,
          ref: n
        }))
      }

      function eU(e, t) {
        let {
          caseSensitive: n = !1,
          wholeWord: r = !1,
          regExp: l = !1
        } = t, o = l ? e : (0, f.A)(e);
        r && (o = `\\b${o}\\b`);
        try {
          return new RegExp(o, n ? "gm" : "gim")
        } catch (t) {
          let [, e] = t.message.split(/:(.*)/);
          return z.classList.add("error"), z.textContent = strings["invalid regex"].replace("{message}", e || t.message), null
        }
      }

      function eX(e) {
        return T(function*() {
          var t, n;
          let l = P[e];
          if (!l) return;
          let {
            file: o,
            position: i
          } = l, a = null == (t = F[o]) ? void 0 : t.url;
          if (i && a) {
            eZ(), u.A.hide();
            try {
              yield(n = function*() {
                null == r || r.abort();
                let e = new AbortController;
                r = e;
                let {
                  signal: t
                } = e;
                try {
                  yield(0, y.A)(a, {
                    render: !0,
                    signal: t
                  });
                  let e = editorManager.getFile(a, "uri");
                  if (t.aborted || (null == e ? void 0 : e.type) !== "editor" || editorManager.activeFile !== e || (yield e.load(), t.aborted || !e.loaded || e.loading || editorManager.activeFile !== e || editorManager.getFile(a, "uri") !== e)) return !1;
                  let n = editorManager.editor.state.doc,
                    r = M(n, i.start),
                    l = M(n, i.end);
                  return editorManager.revealRange(r, l, {
                    y: "center",
                    userEvent: "select.search"
                  })
                } catch (e) {
                  if (t.aborted) return !1;
                  throw e
                } finally {
                  r === e && (r = void 0)
                }
              }, function() {
                var e = this,
                  t = arguments;
                return new Promise(function(r, l) {
                  var o = n.apply(e, t);

                  function i(e) {
                    A(o, r, l, i, a, "next", e)
                  }

                  function a(e) {
                    A(o, r, l, i, a, "throw", e)
                  }
                  i(void 0)
                })
              })()
            } catch (t) {
              console.warn(`Failed to focus search result at line ${e}.`, t)
            }
          }
        })()
      }

      function eK(e) {
        U !== em && eQ(e)
      }

      function eQ(e) {
        e && (null == e || !e.children) && (eN([e.url]), ej())
      }

      function eY(e) {
        let t = null == e ? void 0 : e.uri;
        t && eN([t]), ej()
      }

      function eZ() {
        var e;
        let t = null == ec || null == (e = ec.getScrollPosition) ? void 0 : e.call(ec);
        t && (eu = t.top, ef = t.left)
      }

      function e0() {
        cancelAnimationFrame(ed), ed = requestAnimationFrame(() => {
          var e;
          ed = 0, null == ec || null == (e = ec.setScrollPosition) || e.call(ec, {
            top: eu,
            left: ef
          })
        })
      }
    }
  }
]);

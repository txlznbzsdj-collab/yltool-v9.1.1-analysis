"use strict";
(self.rspackChunkcom_foxdebug_acode = self.rspackChunkcom_foxdebug_acode || []).push([
  [9178], {
    84721: function(e, t, n) {
      n.r(t), n.d(t, {
        commonmarkLanguage: function() {
          return e_
        },
        deleteMarkupBackward: function() {
          return eY
        },
        insertNewlineContinueMarkup: function() {
          return eK
        },
        insertNewlineContinueMarkupCommand: function() {
          return eG
        },
        markdown: function() {
          return e2
        },
        markdownKeymap: function() {
          return e1
        },
        markdownLanguage: function() {
          return eq
        },
        pasteURLAsLink: function() {
          return e9
        }
      });
      var r, s, i = n(85188),
        u = n(24665),
        o = n(27001),
        a = n(21131),
        l = n(26088),
        h = n(55275);
      class f {
        static create(e, t, n, r, s) {
          return new f(e, t, n, r + (r << 8) + e + (t << 4) | 0, s, [], [])
        }
        addChild(e, t) {
          e.prop(l.NodeProp.contextHash) != this.hash && (e = new l.Tree(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t)
        }
        toTree(e, t = this.end) {
          let n = this.children.length - 1;
          return n >= 0 && (t = Math.max(t, this.positions[n] + this.children[n].length + this.from)), new l.Tree(e.types[this.type], this.children, this.positions, t - this.from).balance({
            makeTree: (e, t, n) => new l.Tree(l.NodeType.none, e, t, n, this.hashProp)
          })
        }
        constructor(e, t, n, r, s, i, u) {
          this.type = e, this.value = t, this.from = n, this.hash = r, this.end = s, this.children = i, this.positions = u, this.hashProp = [
            [l.NodeProp.contextHash, r]
          ]
        }
      }(r = s || (s = {}))[r.Document = 1] = "Document", r[r.CodeBlock = 2] = "CodeBlock", r[r.FencedCode = 3] = "FencedCode", r[r.Blockquote = 4] = "Blockquote", r[r.HorizontalRule = 5] = "HorizontalRule", r[r.BulletList = 6] = "BulletList", r[r.OrderedList = 7] = "OrderedList", r[r.ListItem = 8] = "ListItem", r[r.ATXHeading1 = 9] = "ATXHeading1", r[r.ATXHeading2 = 10] = "ATXHeading2", r[r.ATXHeading3 = 11] = "ATXHeading3", r[r.ATXHeading4 = 12] = "ATXHeading4", r[r.ATXHeading5 = 13] = "ATXHeading5", r[r.ATXHeading6 = 14] = "ATXHeading6", r[r.SetextHeading1 = 15] = "SetextHeading1", r[r.SetextHeading2 = 16] = "SetextHeading2", r[r.HTMLBlock = 17] = "HTMLBlock", r[r.LinkReference = 18] = "LinkReference", r[r.Paragraph = 19] = "Paragraph", r[r.CommentBlock = 20] = "CommentBlock", r[r.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", r[r.Escape = 22] = "Escape", r[r.Entity = 23] = "Entity", r[r.HardBreak = 24] = "HardBreak", r[r.Emphasis = 25] = "Emphasis", r[r.StrongEmphasis = 26] = "StrongEmphasis", r[r.Link = 27] = "Link", r[r.Image = 28] = "Image", r[r.InlineCode = 29] = "InlineCode", r[r.HTMLTag = 30] = "HTMLTag", r[r.Comment = 31] = "Comment", r[r.ProcessingInstruction = 32] = "ProcessingInstruction", r[r.Autolink = 33] = "Autolink", r[r.HeaderMark = 34] = "HeaderMark", r[r.QuoteMark = 35] = "QuoteMark", r[r.ListMark = 36] = "ListMark", r[r.LinkMark = 37] = "LinkMark", r[r.EmphasisMark = 38] = "EmphasisMark", r[r.CodeMark = 39] = "CodeMark", r[r.CodeText = 40] = "CodeText", r[r.CodeInfo = 41] = "CodeInfo", r[r.LinkTitle = 42] = "LinkTitle", r[r.LinkLabel = 43] = "LinkLabel", r[r.URL = 44] = "URL";
      class d {
        constructor(e, t) {
          this.start = e, this.content = t, this.marks = [], this.parsers = []
        }
      }
      class c {
        forward() {
          this.basePos > this.pos && this.forwardInner()
        }
        forwardInner() {
          let e = this.skipSpace(this.basePos);
          this.indent = this.countIndent(e, this.pos, this.indent), this.pos = e, this.next = e == this.text.length ? -1 : this.text.charCodeAt(e)
        }
        skipSpace(e) {
          return F(this.text, e)
        }
        reset(e) {
          for (this.text = e, this.baseIndent = this.basePos = this.pos = this.indent = 0, this.forwardInner(), this.depth = 1; this.markers.length;) this.markers.pop()
        }
        moveBase(e) {
          this.basePos = e, this.baseIndent = this.countIndent(e, this.pos, this.indent)
        }
        moveBaseColumn(e) {
          this.baseIndent = e, this.basePos = this.findColumn(e)
        }
        addMarker(e) {
          this.markers.push(e)
        }
        countIndent(e, t = 0, n = 0) {
          for (let r = t; r < e; r++) n += 9 == this.text.charCodeAt(r) ? 4 - n % 4 : 1;
          return n
        }
        findColumn(e) {
          let t = 0;
          for (let n = 0; t < this.text.length && n < e; t++) n += 9 == this.text.charCodeAt(t) ? 4 - n % 4 : 1;
          return t
        }
        scrub() {
          if (!this.baseIndent) return this.text;
          let e = "";
          for (let t = 0; t < this.basePos; t++) e += " ";
          return e + this.text.slice(this.basePos)
        }
        constructor() {
          this.text = "", this.baseIndent = 0, this.basePos = 0, this.depth = 0, this.markers = [], this.pos = 0, this.indent = 0, this.next = -1
        }
      }

      function p(e, t, n) {
        if (n.pos == n.text.length || e != t.block && n.indent >= t.stack[n.depth + 1].value + n.baseIndent) return !0;
        if (n.indent >= n.baseIndent + 4) return !1;
        let r = (e.type == s.OrderedList ? L : B)(n, t, !1);
        return r > 0 && (e.type != s.BulletList || 0 > x(n, t, !1)) && n.text.charCodeAt(n.pos + r - 1) == e.value
      }
      let m = {
        [s.Blockquote]: (e, t, n) => 62 == n.next && (n.markers.push(G(s.QuoteMark, t.lineStart + n.pos, t.lineStart + n.pos + 1)), n.moveBase(n.pos + (g(n.text.charCodeAt(n.pos + 1)) ? 2 : 1)), e.end = t.lineStart + n.text.length, !0),
        [s.ListItem]: (e, t, n) => (!(n.indent < n.baseIndent + e.value) || !(n.next > -1)) && (n.moveBaseColumn(n.baseIndent + e.value), !0),
        [s.OrderedList]: p,
        [s.BulletList]: p,
        [s.Document]: () => !0
      };

      function g(e) {
        return 32 == e || 9 == e || 10 == e || 13 == e
      }

      function F(e, t = 0) {
        for (; t < e.length && g(e.charCodeAt(t));) t++;
        return t
      }

      function k(e, t, n) {
        for (; t > n && g(e.charCodeAt(t - 1));) t--;
        return t
      }

      function A(e) {
        if (96 != e.next && 126 != e.next) return -1;
        let t = e.pos + 1;
        for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
        if (t < e.pos + 3) return -1;
        if (96 == e.next) {
          for (let n = t; n < e.text.length; n++)
            if (96 == e.text.charCodeAt(n)) return -1
        }
        return t
      }

      function C(e) {
        return 62 != e.next ? -1 : 32 == e.text.charCodeAt(e.pos + 1) ? 2 : 1
      }

      function x(e, t, n) {
        if (42 != e.next && 45 != e.next && 95 != e.next) return -1;
        let r = 1;
        for (let t = e.pos + 1; t < e.text.length; t++) {
          let n = e.text.charCodeAt(t);
          if (n == e.next) r++;
          else if (!g(n)) return -1
        }
        return n && 45 == e.next && b(e) > -1 && e.depth == t.stack.length && t.parser.leafBlockParsers.indexOf(R.SetextHeading) > -1 || r < 3 ? -1 : 1
      }

      function E(e, t) {
        for (let n = e.stack.length - 1; n >= 0; n--)
          if (e.stack[n].type == t) return !0;
        return !1
      }

      function B(e, t, n) {
        return (45 == e.next || 43 == e.next || 42 == e.next) && (e.pos == e.text.length - 1 || g(e.text.charCodeAt(e.pos + 1))) && (!n || E(t, s.BulletList) || e.skipSpace(e.pos + 2) < e.text.length) ? 1 : -1
      }

      function L(e, t, n) {
        let r = e.pos,
          i = e.next;
        for (; i >= 48 && i <= 57;) {
          if (++r == e.text.length) return -1;
          i = e.text.charCodeAt(r)
        }
        return r == e.pos || r > e.pos + 9 || 46 != i && 41 != i || r < e.text.length - 1 && !g(e.text.charCodeAt(r + 1)) || n && !E(t, s.OrderedList) && (e.skipSpace(r + 1) == e.text.length || r > e.pos + 1 || 49 != e.next) ? -1 : r + 1 - e.pos
      }

      function D(e) {
        if (35 != e.next) return -1;
        let t = e.pos + 1;
        for (; t < e.text.length && 35 == e.text.charCodeAt(t);) t++;
        if (t < e.text.length && 32 != e.text.charCodeAt(t)) return -1;
        let n = t - e.pos;
        return n > 6 ? -1 : n
      }

      function b(e) {
        if (45 != e.next && 61 != e.next || e.indent >= e.baseIndent + 4) return -1;
        let t = e.pos + 1;
        for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
        let n = t;
        for (; t < e.text.length && g(e.text.charCodeAt(t));) t++;
        return t == e.text.length ? n : -1
      }
      let S = /^[ \t]*$/,
        y = /-->/,
        w = /\?>/,
        T = [
          [/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
          [/^\s*<!--/, y],
          [/^\s*<\?/, w],
          [/^\s*<![A-Z]/, />/],
          [/^\s*<!\[CDATA\[/, /\]\]>/],
          [/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, S],
          [/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, S]
        ];

      function I(e, t, n) {
        if (60 != e.next) return -1;
        let r = e.text.slice(e.pos);
        for (let e = 0, t = T.length - !!n; e < t; e++)
          if (T[e][0].test(r)) return e;
        return -1
      }

      function v(e, t) {
        let n = e.countIndent(t, e.pos, e.indent),
          r = e.countIndent(e.skipSpace(t), t, n);
        return r >= n + 5 ? n + 1 : r
      }

      function M(e, t, n) {
        let r = e.length - 1;
        r >= 0 && e[r].to == t && e[r].type == s.CodeText ? e[r].to = n : e.push(G(s.CodeText, t, n))
      }
      let H = {
        LinkReference: void 0,
        IndentedCode(e, t) {
          let n = t.baseIndent + 4;
          if (t.indent < n) return !1;
          let r = t.findColumn(n),
            i = e.lineStart + r,
            u = e.lineStart + t.text.length,
            o = [],
            a = [];
          for (M(o, i, u); e.nextLine() && t.depth >= e.stack.length;)
            if (t.pos == t.text.length)
              for (let n of (M(a, e.lineStart - 1, e.lineStart), t.markers)) a.push(n);
            else if (t.indent < n) break;
          else {
            if (a.length) {
              for (let e of a) e.type == s.CodeText ? M(o, e.from, e.to) : o.push(e);
              a = []
            }
            for (let n of (M(o, e.lineStart - 1, e.lineStart), t.markers)) o.push(n);
            u = e.lineStart + t.text.length;
            let n = e.lineStart + t.findColumn(t.baseIndent + 4);
            n < u && M(o, n, u)
          }
          return a.length && (a = a.filter(e => e.type != s.CodeText)).length && (t.markers = a.concat(t.markers)), e.addNode(e.buffer.writeElements(o, -i).finish(s.CodeBlock, u - i), i), !0
        },
        FencedCode(e, t) {
          let n = A(t);
          if (n < 0) return !1;
          let r = e.lineStart + t.pos,
            i = t.next,
            u = n - t.pos,
            o = t.skipSpace(n),
            a = k(t.text, t.text.length, o),
            l = [G(s.CodeMark, r, r + u)];
          o < a && l.push(G(s.CodeInfo, e.lineStart + o, e.lineStart + a));
          for (let n = !0, r = !0, o = !1; e.nextLine() && t.depth >= e.stack.length; n = !1) {
            let a = t.pos;
            if (t.indent - t.baseIndent < 4)
              for (; a < t.text.length && t.text.charCodeAt(a) == i;) a++;
            if (a - t.pos >= u && t.skipSpace(a) == t.text.length) {
              for (let e of t.markers) l.push(e);
              r && o && M(l, e.lineStart - 1, e.lineStart), l.push(G(s.CodeMark, e.lineStart + t.pos, e.lineStart + a)), e.nextLine();
              break
            } {
              for (let s of (o = !0, n || (M(l, e.lineStart - 1, e.lineStart), r = !1), t.markers)) l.push(s);
              let s = e.lineStart + t.basePos,
                i = e.lineStart + t.text.length;
              s < i && (M(l, s, i), r = !1)
            }
          }
          return e.addNode(e.buffer.writeElements(l, -r).finish(s.FencedCode, e.prevLineEnd() - r), r), !0
        },
        Blockquote(e, t) {
          let n = C(t);
          return !(n < 0) && (e.startContext(s.Blockquote, t.pos), e.addNode(s.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1), t.moveBase(t.pos + n), null)
        },
        HorizontalRule(e, t) {
          if (0 > x(t, e, !1)) return !1;
          let n = e.lineStart + t.pos;
          return e.nextLine(), e.addNode(s.HorizontalRule, n), !0
        },
        BulletList(e, t) {
          let n = B(t, e, !1);
          if (n < 0) return !1;
          e.block.type != s.BulletList && e.startContext(s.BulletList, t.basePos, t.next);
          let r = v(t, t.pos + 1);
          return e.startContext(s.ListItem, t.basePos, r - t.baseIndent), e.addNode(s.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null
        },
        OrderedList(e, t) {
          let n = L(t, e, !1);
          if (n < 0) return !1;
          e.block.type != s.OrderedList && e.startContext(s.OrderedList, t.basePos, t.text.charCodeAt(t.pos + n - 1));
          let r = v(t, t.pos + n);
          return e.startContext(s.ListItem, t.basePos, r - t.baseIndent), e.addNode(s.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null
        },
        ATXHeading(e, t) {
          let n = D(t);
          if (n < 0) return !1;
          let r = t.pos,
            i = e.lineStart + r,
            u = k(t.text, t.text.length, r),
            o = u;
          for (; o > r && t.text.charCodeAt(o - 1) == t.next;) o--;
          o != u && o != r && g(t.text.charCodeAt(o - 1)) || (o = t.text.length);
          let a = e.buffer.write(s.HeaderMark, 0, n).writeElements(e.parser.parseInline(t.text.slice(r + n + 1, o), i + n + 1), -i);
          o < t.text.length && a.write(s.HeaderMark, o - r, u - r);
          let l = a.finish(s.ATXHeading1 - 1 + n, t.text.length - r);
          return e.nextLine(), e.addNode(l, i), !0
        },
        HTMLBlock(e, t) {
          let n = I(t, e, !1);
          if (n < 0) return !1;
          let r = e.lineStart + t.pos,
            i = T[n][1],
            u = [],
            o = i != S;
          for (; !i.test(t.text) && e.nextLine();) {
            if (t.depth < e.stack.length) {
              o = !1;
              break
            }
            for (let e of t.markers) u.push(e)
          }
          o && e.nextLine();
          let a = i == y ? s.CommentBlock : i == w ? s.ProcessingInstructionBlock : s.HTMLBlock,
            l = e.prevLineEnd();
          return e.addNode(e.buffer.writeElements(u, -r).finish(a, l - r), r), !0
        },
        SetextHeading: void 0
      };
      class P {
        nextLine(e, t, n) {
          if (-1 == this.stage) return !1;
          let r = n.content + "\n" + t.scrub(),
            s = this.advance(r);
          return s > -1 && s < r.length && this.complete(e, n, s)
        }
        finish(e, t) {
          return (2 == this.stage || 3 == this.stage) && F(t.content, this.pos) == t.content.length && this.complete(e, t, t.content.length)
        }
        complete(e, t, n) {
          return e.addLeafElement(t, G(s.LinkReference, this.start, this.start + n, this.elts)), !0
        }
        nextStage(e) {
          return e ? (this.pos = e.to - this.start, this.elts.push(e), this.stage++, !0) : (!1 === e && (this.stage = -1), !1)
        }
        advance(e) {
          for (;;)
            if (-1 == this.stage) return -1;
            else if (0 == this.stage) {
            if (!this.nextStage(eu(e, this.pos, this.start, !0))) return -1;
            if (58 != e.charCodeAt(this.pos)) return this.stage = -1;
            this.elts.push(G(s.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++
          } else if (1 == this.stage) {
            if (!this.nextStage(es(e, F(e, this.pos), this.start))) return -1
          } else {
            if (2 != this.stage) return N(e, this.pos);
            let t = F(e, this.pos),
              n = 0;
            if (t > this.pos) {
              let r = ei(e, t, this.start);
              if (r) {
                let t = N(e, r.to - this.start);
                t > 0 && (this.nextStage(r), n = t)
              }
            }
            return n || (n = N(e, this.pos)), n > 0 && n < e.length ? n : -1
          }
        }
        constructor(e) {
          this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content)
        }
      }

      function N(e, t) {
        for (; t < e.length; t++) {
          let n = e.charCodeAt(t);
          if (10 == n) break;
          if (!g(n)) return -1
        }
        return t
      }
      class O {
        nextLine(e, t, n) {
          let r = t.depth < e.stack.length ? -1 : b(t),
            i = t.next;
          if (r < 0) return !1;
          let u = G(s.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
          return e.nextLine(), e.addLeafElement(n, G(61 == i ? s.SetextHeading1 : s.SetextHeading2, n.start, e.prevLineEnd(), [...e.parser.parseInline(n.content, n.start), u])), !0
        }
        finish() {
          return !1
        }
      }
      let R = {
          LinkReference: (e, t) => 91 == t.content.charCodeAt(0) ? new P(t) : null,
          SetextHeading: () => new O
        },
        X = {
          text: "",
          end: 0
        };
      class $ {
        get parsedPos() {
          return this.absoluteLineStart
        }
        advance() {
          if (null != this.stoppedAt && this.absoluteLineStart > this.stoppedAt) return this.finish();
          let {
            line: e
          } = this;
          for (;;) {
            for (let t = 0;;) {
              let n = e.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
              for (; t < e.markers.length && (!n || e.markers[t].from < n.end);) {
                let n = e.markers[t++];
                this.addNode(n.type, n.from, n.to)
              }
              if (!n) break;
              this.finishContext()
            }
            if (e.pos < e.text.length) break;
            if (!this.nextLine()) return this.finish()
          }
          if (this.fragments && this.reuseFragment(e.basePos)) return null;
          e: for (;;) {
            for (let t of this.parser.blockParsers)
              if (t) {
                let n = t(this, e);
                if (!1 != n) {
                  if (!0 == n) return null;
                  e.forward();
                  continue e
                }
              } break
          }
          let t = new d(this.lineStart + e.pos, e.text.slice(e.pos));
          for (let e of this.parser.leafBlockParsers)
            if (e) {
              let n = e(this, t);
              n && t.parsers.push(n)
            } t: for (; this.nextLine() && e.pos != e.text.length;) {
            if (e.indent < e.baseIndent + 4) {
              for (let n of this.parser.endLeafBlock)
                if (n(this, e, t)) break t
            }
            for (let n of t.parsers)
              if (n.nextLine(this, e, t)) return null;
            for (let n of (t.content += "\n" + e.scrub(), e.markers)) t.marks.push(n)
          }
          return this.finishLeaf(t), null
        }
        stopAt(e) {
          if (null != this.stoppedAt && this.stoppedAt < e) throw RangeError("Can't move stoppedAt forward");
          this.stoppedAt = e
        }
        reuseFragment(e) {
          if (!this.fragments.moveTo(this.absoluteLineStart + e, this.absoluteLineStart) || !this.fragments.matches(this.block.hash)) return !1;
          let t = this.fragments.takeNodes(this);
          return !!t && (this.absoluteLineStart += t, this.lineStart = ef(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++) : this.atEnd = !0, this.readLine(), !0)
        }
        get depth() {
          return this.stack.length
        }
        parentType(e = this.depth - 1) {
          return this.parser.nodeSet.types[this.stack[e].type]
        }
        nextLine() {
          return (this.lineStart += this.line.text.length, this.absoluteLineEnd >= this.to) ? (this.absoluteLineStart = this.absoluteLineEnd, this.atEnd = !0, this.readLine(), !1) : (this.lineStart++, this.absoluteLineStart = this.absoluteLineEnd + 1, this.moveRangeI(), this.readLine(), !0)
        }
        peekLine() {
          return this.scanLine(this.absoluteLineEnd + 1).text
        }
        moveRangeI() {
          for (; this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to;) this.rangeI++, this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from)
        }
        scanLine(e) {
          if (X.end = e, e >= this.to) X.text = "";
          else if (X.text = this.lineChunkAt(e), X.end += X.text.length, this.ranges.length > 1) {
            let e = this.absoluteLineStart,
              t = this.rangeI;
            for (; this.ranges[t].to < X.end;) {
              t++;
              let n = this.ranges[t].from,
                r = this.lineChunkAt(n);
              X.end = n + r.length, X.text = X.text.slice(0, this.ranges[t - 1].to - e) + r, e = X.end - X.text.length
            }
          }
          return X
        }
        readLine() {
          let {
            line: e
          } = this, {
            text: t,
            end: n
          } = this.scanLine(this.absoluteLineStart);
          for (this.absoluteLineEnd = n, e.reset(t); e.depth < this.stack.length; e.depth++) {
            let t = this.stack[e.depth],
              n = this.parser.skipContextMarkup[t.type];
            if (!n) throw Error("Unhandled block context " + s[t.type]);
            let r = this.line.markers.length;
            if (!n(t, this, e)) {
              this.line.markers.length > r && (t.end = this.line.markers[this.line.markers.length - 1].to), e.forward();
              break
            }
            e.forward()
          }
        }
        lineChunkAt(e) {
          let t = this.input.chunk(e),
            n;
          if (this.input.lineChunks) n = "\n" == t ? "" : t;
          else {
            let e = t.indexOf("\n");
            n = e < 0 ? t : t.slice(0, e)
          }
          return e + n.length > this.to ? n.slice(0, this.to - e) : n
        }
        prevLineEnd() {
          return this.atEnd ? this.lineStart : this.lineStart - 1
        }
        startContext(e, t, n = 0) {
          this.block = f.create(e, n, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block)
        }
        startComposite(e, t, n = 0) {
          this.startContext(this.parser.getNodeType(e), t, n)
        }
        addNode(e, t, n) {
          "number" == typeof e && (e = new l.Tree(this.parser.nodeSet.types[e], j, j, (null != n ? n : this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from)
        }
        addElement(e) {
          this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from)
        }
        addLeafElement(e, t) {
          this.addNode(this.buffer.writeElements(ea(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from)
        }
        finishContext() {
          let e = this.stack.pop(),
            t = this.stack[this.stack.length - 1];
          t.addChild(e.toTree(this.parser.nodeSet), e.from - t.from), this.block = t
        }
        finish() {
          for (; this.stack.length > 1;) this.finishContext();
          return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart))
        }
        addGaps(e) {
          return this.ranges.length > 1 ? function e(t, n, r, s, i) {
            let u = t[n].to,
              o = [],
              a = [],
              h = r.from + s;

            function f(e, r) {
              for (; r ? e >= u : e > u;) {
                let r = t[n + 1].from - u;
                s += r, e += r, u = t[++n].to
              }
            }
            for (let l = r.firstChild; l; l = l.nextSibling) {
              f(l.from + s, !0);
              let r = l.from + s,
                d, c = i.get(l.tree);
              c ? d = c : l.to + s > u ? (d = e(t, n, l, s, i), f(l.to + s, !1)) : d = l.toTree(), o.push(d), a.push(r - h)
            }
            return f(r.to + s, !1), new l.Tree(r.type, o, a, r.to + s - h, r.tree ? r.tree.propValues : void 0)
          }(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e
        }
        finishLeaf(e) {
          for (let t of e.parsers)
            if (t.finish(this, e)) return;
          let t = ea(this.parser.parseInline(e.content, e.start), e.marks);
          this.addNode(this.buffer.writeElements(t, -e.start).finish(s.Paragraph, e.content.length), e.start)
        }
        elt(e, t, n, r) {
          return "string" == typeof e ? G(this.parser.getNodeType(e), t, n, r) : new V(e, t)
        }
        get buffer() {
          return new Q(this.parser.nodeSet)
        }
        constructor(e, t, n, r) {
          this.parser = e, this.input = t, this.ranges = r, this.line = new c, this.atEnd = !1, this.reusePlaceholders = new Map, this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = f.create(s.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = n.length ? new eh(n, t) : null, this.readLine()
        }
      }
      class z extends l.Parser {
        createParse(e, t, n) {
          let r = new $(this, e, t, n);
          for (let s of this.wrappers) r = s(r, e, t, n);
          return r
        }
        configure(e) {
          let t = function e(t) {
            if (!Array.isArray(t)) return t;
            if (0 == t.length) return null;
            let n = e(t[0]);
            if (1 == t.length) return n;
            let r = e(t.slice(1));
            if (!r || !n) return n || r;
            let s = (e, t) => (e || j).concat(t || j),
              i = n.wrap,
              u = r.wrap;
            return {
              props: s(n.props, r.props),
              defineNodes: s(n.defineNodes, r.defineNodes),
              parseBlock: s(n.parseBlock, r.parseBlock),
              parseInline: s(n.parseInline, r.parseInline),
              remove: s(n.remove, r.remove),
              wrap: i ? u ? (e, t, n, r) => i(u(e, t, n, r), t, n, r) : i : u
            }
          }(e);
          if (!t) return this;
          let {
            nodeSet: n,
            skipContextMarkup: r
          } = this, i = this.blockParsers.slice(), u = this.leafBlockParsers.slice(), o = this.blockNames.slice(), a = this.inlineParsers.slice(), f = this.inlineNames.slice(), d = this.endLeafBlock.slice(), c = this.wrappers;
          if (_(t.defineNodes)) {
            r = Object.assign({}, r);
            let e = n.types.slice(),
              i;
            for (let n of t.defineNodes) {
              let {
                name: t,
                block: u,
                composite: o,
                style: a
              } = "string" == typeof n ? {
                name: n
              } : n;
              if (e.some(e => e.name == t)) continue;
              o && (r[e.length] = (e, t, n) => o(t, n, e.value));
              let f = e.length,
                d = o ? ["Block", "BlockContext"] : u ? f >= s.ATXHeading1 && f <= s.SetextHeading2 ? ["Block", "LeafBlock", "Heading"] : ["Block", "LeafBlock"] : void 0;
              e.push(l.NodeType.define({
                id: f,
                name: t,
                props: d && [
                  [l.NodeProp.group, d]
                ]
              })), a && (i || (i = {}), Array.isArray(a) || a instanceof h.Tag ? i[t] = a : Object.assign(i, a))
            }
            n = new l.NodeSet(e), i && (n = n.extend((0, h.styleTags)(i)))
          }
          if (_(t.props) && (n = n.extend(...t.props)), _(t.remove))
            for (let e of t.remove) {
              let t = this.blockNames.indexOf(e),
                n = this.inlineNames.indexOf(e);
              t > -1 && (i[t] = u[t] = void 0), n > -1 && (a[n] = void 0)
            }
          if (_(t.parseBlock))
            for (let e of t.parseBlock) {
              let t = o.indexOf(e.name);
              if (t > -1) i[t] = e.parse, u[t] = e.leaf;
              else {
                let t = e.before ? q(o, e.before) : e.after ? q(o, e.after) + 1 : o.length - 1;
                i.splice(t, 0, e.parse), u.splice(t, 0, e.leaf), o.splice(t, 0, e.name)
              }
              e.endLeaf && d.push(e.endLeaf)
            }
          if (_(t.parseInline))
            for (let e of t.parseInline) {
              let t = f.indexOf(e.name);
              if (t > -1) a[t] = e.parse;
              else {
                let t = e.before ? q(f, e.before) : e.after ? q(f, e.after) + 1 : f.length - 1;
                a.splice(t, 0, e.parse), f.splice(t, 0, e.name)
              }
            }
          return t.wrap && (c = c.concat(t.wrap)), new z(n, i, u, o, d, r, a, f, c)
        }
        getNodeType(e) {
          let t = this.nodeTypes[e];
          if (null == t) throw RangeError(`Unknown node type '${e}'`);
          return t
        }
        parseInline(e, t) {
          let n = new eo(this, e, t);
          n: for (let e = t; e < n.end;) {
            let t = n.char(e);
            for (let r of this.inlineParsers)
              if (r) {
                let s = r(n, t, e);
                if (s >= 0) {
                  e = s;
                  continue n
                }
              } e++
          }
          return n.resolveMarkers(0)
        }
        constructor(e, t, n, r, s, i, u, o, a) {
          for (let l of (super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = n, this.blockNames = r, this.endLeafBlock = s, this.skipContextMarkup = i, this.inlineParsers = u, this.inlineNames = o, this.wrappers = a, this.nodeTypes = Object.create(null), e.types)) this.nodeTypes[l.name] = l.id
        }
      }

      function _(e) {
        return null != e && e.length > 0
      }

      function q(e, t) {
        let n = e.indexOf(t);
        if (n < 0) throw RangeError(`Position specified relative to unknown parser ${t}`);
        return n
      }
      let U = [l.NodeType.none];
      for (let e = 1, t; t = s[e]; e++) U[e] = l.NodeType.define({
        id: e,
        name: t,
        props: e >= s.Escape ? [] : [
          [l.NodeProp.group, e in m ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]
        ],
        top: "Document" == t
      });
      let j = [];
      class Q {
        write(e, t, n, r = 0) {
          return this.content.push(e, t, n, 4 + 4 * r), this
        }
        writeElements(e, t = 0) {
          for (let n of e) n.writeTo(this, t);
          return this
        }
        finish(e, t) {
          return l.Tree.build({
            buffer: this.content,
            nodeSet: this.nodeSet,
            reused: this.nodes,
            topID: e,
            length: t
          })
        }
        constructor(e) {
          this.nodeSet = e, this.content = [], this.nodes = []
        }
      }
      class Z {
        writeTo(e, t) {
          let n = e.content.length;
          e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - n)
        }
        toTree(e) {
          return new Q(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from)
        }
        constructor(e, t, n, r = j) {
          this.type = e, this.from = t, this.to = n, this.children = r
        }
      }
      class V {
        get to() {
          return this.from + this.tree.length
        }
        get type() {
          return this.tree.type.id
        }
        get children() {
          return j
        }
        writeTo(e, t) {
          e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1)
        }
        toTree() {
          return this.tree
        }
        constructor(e, t) {
          this.tree = e, this.from = t
        }
      }

      function G(e, t, n, r) {
        return new Z(e, t, n, r)
      }
      let K = {
          resolve: "Emphasis",
          mark: "EmphasisMark"
        },
        J = {
          resolve: "Emphasis",
          mark: "EmphasisMark"
        },
        W = {},
        Y = {};
      class ee {
        constructor(e, t, n, r) {
          this.type = e, this.from = t, this.to = n, this.side = r
        }
      }
      let et = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        en = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
      try {
        en = RegExp("[\\u0024\\u002B\\u003C-\\u003E\\u005E\\u0060\\u007C\\u007E\\u00A2-\\u00A6\\u00A8-\\u00A9\\u00AC\\u00AE-\\u00B1\\u00B4\\u00B8\\u00D7\\u00F7\\u02C2-\\u02C5\\u02D2-\\u02DF\\u02E5-\\u02EB\\u02ED\\u02EF-\\u02FF\\u0375\\u0384-\\u0385\\u03F6\\u0482\\u058D-\\u058F\\u0606-\\u0608\\u060B\\u060E-\\u060F\\u06DE\\u06E9\\u06FD-\\u06FE\\u07F6\\u07FE-\\u07FF\\u0888\\u09F2-\\u09F3\\u09FA-\\u09FB\\u0AF1\\u0B70\\u0BF3-\\u0BFA\\u0C7F\\u0D4F\\u0D79\\u0E3F\\u0F01-\\u0F03\\u0F13\\u0F15-\\u0F17\\u0F1A-\\u0F1F\\u0F34\\u0F36\\u0F38\\u0FBE-\\u0FC5\\u0FC7-\\u0FCC\\u0FCE-\\u0FCF\\u0FD5-\\u0FD8\\u109E-\\u109F\\u1390-\\u1399\\u166D\\u17DB\\u1940\\u19DE-\\u19FF\\u1B61-\\u1B6A\\u1B74-\\u1B7C\\u1FBD\\u1FBF-\\u1FC1\\u1FCD-\\u1FCF\\u1FDD-\\u1FDF\\u1FED-\\u1FEF\\u1FFD-\\u1FFE\\u2044\\u2052\\u207A-\\u207C\\u208A-\\u208C\\u20A0-\\u20C1\\u2100-\\u2101\\u2103-\\u2106\\u2108-\\u2109\\u2114\\u2116-\\u2118\\u211E-\\u2123\\u2125\\u2127\\u2129\\u212E\\u213A-\\u213B\\u2140-\\u2144\\u214A-\\u214D\\u214F\\u218A-\\u218B\\u2190-\\u2307\\u230C-\\u2328\\u232B-\\u2429\\u2440-\\u244A\\u249C-\\u24E9\\u2500-\\u2767\\u2794-\\u27C4\\u27C7-\\u27E5\\u27F0-\\u2982\\u2999-\\u29D7\\u29DC-\\u29FB\\u29FE-\\u2B73\\u2B76-\\u2BFF\\u2CE5-\\u2CEA\\u2E50-\\u2E51\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u2FF0-\\u2FFF\\u3004\\u3012-\\u3013\\u3020\\u3036-\\u3037\\u303E-\\u303F\\u309B-\\u309C\\u3190-\\u3191\\u3196-\\u319F\\u31C0-\\u31E5\\u31EF\\u3200-\\u321E\\u322A-\\u3247\\u3250\\u3260-\\u327F\\u328A-\\u32B0\\u32C0-\\u33FF\\u4DC0-\\u4DFF\\uA490-\\uA4C6\\uA700-\\uA716\\uA720-\\uA721\\uA789-\\uA78A\\uA828-\\uA82B\\uA836-\\uA839\\uAA77-\\uAA79\\uAB5B\\uAB6A-\\uAB6B\\uFB29\\uFBB2-\\uFBD2\\uFD40-\\uFD4F\\uFD90-\\uFD91\\uFDC8-\\uFDCF\\uFDFC-\\uFDFF\\uFE62\\uFE64-\\uFE66\\uFE69\\uFF04\\uFF0B\\uFF1C-\\uFF1E\\uFF3E\\uFF40\\uFF5C\\uFF5E\\uFFE0-\\uFFE6\\uFFE8-\\uFFEE\\uFFFC-\\uFFFD\\u{10137}-\\u{1013F}\\u{10179}-\\u{10189}\\u{1018C}-\\u{1018E}\\u{10190}-\\u{1019C}\\u{101A0}\\u{101D0}-\\u{101FC}\\u{10877}-\\u{10878}\\u{10AC8}\\u{10D8E}-\\u{10D8F}\\u{10ED1}-\\u{10ED8}\\u{1173F}\\u{11FD5}-\\u{11FF1}\\u{16B3C}-\\u{16B3F}\\u{16B45}\\u{1BC9C}\\u{1CC00}-\\u{1CCEF}\\u{1CCFA}-\\u{1CCFC}\\u{1CD00}-\\u{1CEB3}\\u{1CEBA}-\\u{1CED0}\\u{1CEE0}-\\u{1CEF0}\\u{1CF50}-\\u{1CFC3}\\u{1D000}-\\u{1D0F5}\\u{1D100}-\\u{1D126}\\u{1D129}-\\u{1D164}\\u{1D16A}-\\u{1D16C}\\u{1D183}-\\u{1D184}\\u{1D18C}-\\u{1D1A9}\\u{1D1AE}-\\u{1D1EA}\\u{1D200}-\\u{1D241}\\u{1D245}\\u{1D300}-\\u{1D356}\\u{1D6C1}\\u{1D6DB}\\u{1D6FB}\\u{1D715}\\u{1D735}\\u{1D74F}\\u{1D76F}\\u{1D789}\\u{1D7A9}\\u{1D7C3}\\u{1D800}-\\u{1D9FF}\\u{1DA37}-\\u{1DA3A}\\u{1DA6D}-\\u{1DA74}\\u{1DA76}-\\u{1DA83}\\u{1DA85}-\\u{1DA86}\\u{1E14F}\\u{1E2FF}\\u{1ECAC}\\u{1ECB0}\\u{1ED2E}\\u{1EEF0}-\\u{1EEF1}\\u{1F000}-\\u{1F02B}\\u{1F030}-\\u{1F093}\\u{1F0A0}-\\u{1F0AE}\\u{1F0B1}-\\u{1F0BF}\\u{1F0C1}-\\u{1F0CF}\\u{1F0D1}-\\u{1F0F5}\\u{1F10D}-\\u{1F1AD}\\u{1F1E6}-\\u{1F202}\\u{1F210}-\\u{1F23B}\\u{1F240}-\\u{1F248}\\u{1F250}-\\u{1F251}\\u{1F260}-\\u{1F265}\\u{1F300}-\\u{1F6D8}\\u{1F6DC}-\\u{1F6EC}\\u{1F6F0}-\\u{1F6FC}\\u{1F700}-\\u{1F7D9}\\u{1F7E0}-\\u{1F7EB}\\u{1F7F0}\\u{1F800}-\\u{1F80B}\\u{1F810}-\\u{1F847}\\u{1F850}-\\u{1F859}\\u{1F860}-\\u{1F887}\\u{1F890}-\\u{1F8AD}\\u{1F8B0}-\\u{1F8BB}\\u{1F8C0}-\\u{1F8C1}\\u{1F8D0}-\\u{1F8D8}\\u{1F900}-\\u{1FA57}\\u{1FA60}-\\u{1FA6D}\\u{1FA70}-\\u{1FA7C}\\u{1FA80}-\\u{1FA8A}\\u{1FA8E}-\\u{1FAC6}\\u{1FAC8}\\u{1FACD}-\\u{1FADC}\\u{1FADF}-\\u{1FAEA}\\u{1FAEF}-\\u{1FAF8}\\u{1FB00}-\\u{1FB92}\\u{1FB94}-\\u{1FBEF}\\u{1FBFA}|\\u0021-\\u0023\\u0025-\\u002A\\u002C-\\u002F\\u003A-\\u003B\\u003F-\\u0040\\u005B-\\u005D\\u005F\\u007B\\u007D\\u00A1\\u00A7\\u00AB\\u00B6-\\u00B7\\u00BB\\u00BF\\u037E\\u0387\\u055A-\\u055F\\u0589-\\u058A\\u05BE\\u05C0\\u05C3\\u05C6\\u05F3-\\u05F4\\u0609-\\u060A\\u060C-\\u060D\\u061B\\u061D-\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964-\\u0965\\u0970\\u09FD\\u0A76\\u0AF0\\u0C77\\u0C84\\u0DF4\\u0E4F\\u0E5A-\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F3A-\\u0F3D\\u0F85\\u0FD0-\\u0FD4\\u0FD9-\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u1400\\u166E\\u169B-\\u169C\\u16EB-\\u16ED\\u1735-\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u180A\\u1944-\\u1945\\u1A1E-\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B4E-\\u1B4F\\u1B5A-\\u1B60\\u1B7D-\\u1B7F\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E-\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205E\\u207D-\\u207E\\u208D-\\u208E\\u2308-\\u230B\\u2329-\\u232A\\u2768-\\u2775\\u27C5-\\u27C6\\u27E6-\\u27EF\\u2983-\\u2998\\u29D8-\\u29DB\\u29FC-\\u29FD\\u2CF9-\\u2CFC\\u2CFE-\\u2CFF\\u2D70\\u2E00-\\u2E2E\\u2E30-\\u2E4F\\u2E52-\\u2E5D\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301F\\u3030\\u303D\\u30A0\\u30FB\\uA4FE-\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE-\\uA8CF\\uA8F8-\\uA8FA\\uA8FC\\uA92E-\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE-\\uA9DF\\uAA5C-\\uAA5F\\uAADE-\\uAADF\\uAAF0-\\uAAF1\\uABEB\\uFD3E-\\uFD3F\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE61\\uFE63\\uFE68\\uFE6A-\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF0A\\uFF0C-\\uFF0F\\uFF1A-\\uFF1B\\uFF1F-\\uFF20\\uFF3B-\\uFF3D\\uFF3F\\uFF5B\\uFF5D\\uFF5F-\\uFF65\\u{10100}-\\u{10102}\\u{1039F}\\u{103D0}\\u{1056F}\\u{10857}\\u{1091F}\\u{1093F}\\u{10A50}-\\u{10A58}\\u{10A7F}\\u{10AF0}-\\u{10AF6}\\u{10B39}-\\u{10B3F}\\u{10B99}-\\u{10B9C}\\u{10D6E}\\u{10EAD}\\u{10ED0}\\u{10F55}-\\u{10F59}\\u{10F86}-\\u{10F89}\\u{11047}-\\u{1104D}\\u{110BB}-\\u{110BC}\\u{110BE}-\\u{110C1}\\u{11140}-\\u{11143}\\u{11174}-\\u{11175}\\u{111C5}-\\u{111C8}\\u{111CD}\\u{111DB}\\u{111DD}-\\u{111DF}\\u{11238}-\\u{1123D}\\u{112A9}\\u{113D4}-\\u{113D5}\\u{113D7}-\\u{113D8}\\u{1144B}-\\u{1144F}\\u{1145A}-\\u{1145B}\\u{1145D}\\u{114C6}\\u{115C1}-\\u{115D7}\\u{11641}-\\u{11643}\\u{11660}-\\u{1166C}\\u{116B9}\\u{1173C}-\\u{1173E}\\u{1183B}\\u{11944}-\\u{11946}\\u{119E2}\\u{11A3F}-\\u{11A46}\\u{11A9A}-\\u{11A9C}\\u{11A9E}-\\u{11AA2}\\u{11B00}-\\u{11B09}\\u{11BE1}\\u{11C41}-\\u{11C45}\\u{11C70}-\\u{11C71}\\u{11EF7}-\\u{11EF8}\\u{11F43}-\\u{11F4F}\\u{11FFF}\\u{12470}-\\u{12474}\\u{12FF1}-\\u{12FF2}\\u{16A6E}-\\u{16A6F}\\u{16AF5}\\u{16B37}-\\u{16B3B}\\u{16B44}\\u{16D6D}-\\u{16D6F}\\u{16E97}-\\u{16E9A}\\u{16FE2}\\u{1BC9F}\\u{1DA87}-\\u{1DA8B}\\u{1E5FF}\\u{1E95E}-\\u{1E95F}]", "u")
      } catch (e) {}
      let er = {
        Escape(e, t, n) {
          if (92 != t || n == e.end - 1) return -1;
          let r = e.char(n + 1);
          for (let t = 0; t < et.length; t++)
            if (et.charCodeAt(t) == r) return e.append(G(s.Escape, n, n + 2));
          return -1
        },
        Entity(e, t, n) {
          if (38 != t) return -1;
          let r = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(e.slice(n + 1, n + 31));
          return r ? e.append(G(s.Entity, n, n + 1 + r[0].length)) : -1
        },
        InlineCode(e, t, n) {
          if (96 != t || n && 96 == e.char(n - 1)) return -1;
          let r = n + 1;
          for (; r < e.end && 96 == e.char(r);) r++;
          let i = r - n,
            u = 0;
          for (; r < e.end; r++)
            if (96 == e.char(r)) {
              if (++u == i && 96 != e.char(r + 1)) return e.append(G(s.InlineCode, n, r + 1, [G(s.CodeMark, n, n + i), G(s.CodeMark, r + 1 - i, r + 1)]))
            } else u = 0;
          return -1
        },
        HTMLTag(e, t, n) {
          if (60 != t || n == e.end - 1) return -1;
          let r = e.slice(n + 1, e.end),
            i = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(r);
          if (i) return e.append(G(s.Autolink, n, n + 1 + i[0].length, [G(s.LinkMark, n, n + 1), G(s.URL, n + 1, n + i[0].length), G(s.LinkMark, n + i[0].length, n + 1 + i[0].length)]));
          let u = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(r);
          if (u) return e.append(G(s.Comment, n, n + 1 + u[0].length));
          let o = /^\?[^]*?\?>/.exec(r);
          if (o) return e.append(G(s.ProcessingInstruction, n, n + 1 + o[0].length));
          let a = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(r);
          return a ? e.append(G(s.HTMLTag, n, n + 1 + a[0].length)) : -1
        },
        Emphasis(e, t, n) {
          if (95 != t && 42 != t) return -1;
          let r = n + 1;
          for (; e.char(r) == t;) r++;
          let s = e.slice(n - 1, n),
            i = e.slice(r, r + 1),
            u = en.test(s),
            o = en.test(i),
            a = /\s|^$/.test(s),
            l = /\s|^$/.test(i),
            h = !l && (!o || a || u),
            f = !a && (!u || l || o);
          return e.append(new ee(95 == t ? K : J, n, r, !!(h && (42 == t || !f || u)) | 2 * !!(f && (42 == t || !h || o))))
        },
        HardBreak(e, t, n) {
          if (92 == t && 10 == e.char(n + 1)) return e.append(G(s.HardBreak, n, n + 2));
          if (32 == t) {
            let t = n + 1;
            for (; 32 == e.char(t);) t++;
            if (10 == e.char(t) && t >= n + 2) return e.append(G(s.HardBreak, n, t + 1))
          }
          return -1
        },
        Link: (e, t, n) => 91 == t ? e.append(new ee(W, n, n + 1, 1)) : -1,
        Image: (e, t, n) => 33 == t && 91 == e.char(n + 1) ? e.append(new ee(Y, n, n + 2, 1)) : -1,
        LinkEnd(e, t, n) {
          if (93 != t) return -1;
          for (let t = e.parts.length - 1; t >= 0; t--) {
            let r = e.parts[t];
            if (r instanceof ee && (r.type == W || r.type == Y)) {
              if (!r.side || e.skipSpace(r.to) == n && !/[(\[]/.test(e.slice(n + 1, n + 2))) return e.parts[t] = null, -1;
              let i = e.takeContent(t),
                u = e.parts[t] = function(e, t, n, r, i) {
                  let {
                    text: u
                  } = e, o = e.char(i), a = i;
                  if (t.unshift(G(s.LinkMark, r, r + (n == s.Image ? 2 : 1))), t.push(G(s.LinkMark, i - 1, i)), 40 == o) {
                    let n = e.skipSpace(i + 1),
                      r = es(u, n - e.offset, e.offset),
                      o;
                    r && (n = e.skipSpace(r.to)) != r.to && (o = ei(u, n - e.offset, e.offset)) && (n = e.skipSpace(o.to)), 41 == e.char(n) && (t.push(G(s.LinkMark, i, i + 1)), a = n + 1, r && t.push(r), o && t.push(o), t.push(G(s.LinkMark, n, a)))
                  } else if (91 == o) {
                    let n = eu(u, i - e.offset, e.offset, !1);
                    n && (t.push(n), a = n.to)
                  }
                  return G(n, r, a, t)
                }(e, i, r.type == W ? s.Link : s.Image, r.from, n + 1);
              if (r.type == W)
                for (let n = 0; n < t; n++) {
                  let t = e.parts[n];
                  t instanceof ee && t.type == W && (t.side = 0)
                }
              return u.to
            }
          }
          return -1
        }
      };

      function es(e, t, n) {
        if (60 == e.charCodeAt(t)) {
          for (let r = t + 1; r < e.length; r++) {
            let i = e.charCodeAt(r);
            if (62 == i) return G(s.URL, t + n, r + 1 + n);
            if (60 == i || 10 == i) return !1
          }
          return null
        } {
          let r = 0,
            i = t;
          for (let t = !1; i < e.length; i++) {
            let n = e.charCodeAt(i);
            if (g(n)) break;
            if (t) t = !1;
            else if (40 == n) r++;
            else if (41 == n) {
              if (!r) break;
              r--
            } else 92 == n && (t = !0)
          }
          return i > t ? G(s.URL, t + n, i + n) : i == e.length && null
        }
      }

      function ei(e, t, n) {
        let r = e.charCodeAt(t);
        if (39 != r && 34 != r && 40 != r) return !1;
        let i = 40 == r ? 41 : r;
        for (let r = t + 1, u = !1; r < e.length; r++) {
          let o = e.charCodeAt(r);
          if (u) u = !1;
          else {
            if (o == i) return G(s.LinkTitle, t + n, r + 1 + n);
            92 == o && (u = !0)
          }
        }
        return null
      }

      function eu(e, t, n, r) {
        for (let i = !1, u = t + 1, o = Math.min(e.length, u + 999); u < o; u++) {
          let o = e.charCodeAt(u);
          if (i) i = !1;
          else {
            if (93 == o) return !r && G(s.LinkLabel, t + n, u + 1 + n);
            if (r && !g(o) && (r = !1), 91 == o) return !1;
            92 == o && (i = !0)
          }
        }
        return null
      }
      class eo {
        char(e) {
          return e >= this.end ? -1 : this.text.charCodeAt(e - this.offset)
        }
        get end() {
          return this.offset + this.text.length
        }
        slice(e, t) {
          return this.text.slice(e - this.offset, t - this.offset)
        }
        append(e) {
          return this.parts.push(e), e.to
        }
        addDelimiter(e, t, n, r, s) {
          return this.append(new ee(e, t, n, !!r | 2 * !!s))
        }
        get hasOpenLink() {
          for (let e = this.parts.length - 1; e >= 0; e--) {
            let t = this.parts[e];
            if (t instanceof ee && (t.type == W || t.type == Y)) return !0
          }
          return !1
        }
        addElement(e) {
          return this.append(e)
        }
        resolveMarkers(e) {
          for (let t = e; t < this.parts.length; t++) {
            let n = this.parts[t];
            if (!(n instanceof ee && n.type.resolve && 2 & n.side)) continue;
            let r = n.type == K || n.type == J,
              s = n.to - n.from,
              i, u = t - 1;
            for (; u >= e; u--) {
              let e = this.parts[u];
              if (e instanceof ee && 1 & e.side && e.type == n.type && !(r && (1 & n.side || 2 & e.side) && (e.to - e.from + s) % 3 == 0 && ((e.to - e.from) % 3 || s % 3))) {
                i = e;
                break
              }
            }
            if (!i) continue;
            let o = n.type.resolve,
              a = [],
              l = i.from,
              h = n.to;
            if (r) {
              let e = Math.min(2, i.to - i.from, s);
              l = i.to - e, h = n.from + e, o = 1 == e ? "Emphasis" : "StrongEmphasis"
            }
            i.type.mark && a.push(this.elt(i.type.mark, l, i.to));
            for (let e = u + 1; e < t; e++) this.parts[e] instanceof Z && a.push(this.parts[e]), this.parts[e] = null;
            n.type.mark && a.push(this.elt(n.type.mark, n.from, h));
            let f = this.elt(o, l, h, a);
            this.parts[u] = r && i.from != l ? new ee(i.type, i.from, l, i.side) : null, (this.parts[t] = r && n.to != h ? new ee(n.type, h, n.to, n.side) : null) ? this.parts.splice(t, 0, f) : this.parts[t] = f
          }
          let t = [];
          for (let n = e; n < this.parts.length; n++) {
            let e = this.parts[n];
            e instanceof Z && t.push(e)
          }
          return t
        }
        findOpeningDelimiter(e) {
          for (let t = this.parts.length - 1; t >= 0; t--) {
            let n = this.parts[t];
            if (n instanceof ee && n.type == e && 1 & n.side) return t
          }
          return null
        }
        takeContent(e) {
          let t = this.resolveMarkers(e);
          return this.parts.length = e, t
        }
        getDelimiterAt(e) {
          let t = this.parts[e];
          return t instanceof ee ? t : null
        }
        skipSpace(e) {
          return F(this.text, e - this.offset) + this.offset
        }
        elt(e, t, n, r) {
          return "string" == typeof e ? G(this.parser.getNodeType(e), t, n, r) : new V(e, t)
        }
        constructor(e, t, n) {
          this.parser = e, this.text = t, this.offset = n, this.parts = []
        }
      }

      function ea(e, t) {
        if (!t.length) return e;
        if (!e.length) return t;
        let n = e.slice(),
          r = 0;
        for (let e of t) {
          for (; r < n.length && n[r].to < e.to;) r++;
          if (r < n.length && n[r].from < e.from) {
            let t = n[r];
            t instanceof Z && (n[r] = new Z(t.type, t.from, t.to, ea(t.children, [e])))
          } else n.splice(r++, 0, e)
        }
        return n
      }
      eo.linkStart = W, eo.imageStart = Y;
      let el = [s.CodeBlock, s.ListItem, s.OrderedList, s.BulletList];
      class eh {
        nextFragment() {
          this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1
        }
        moveTo(e, t) {
          for (; this.fragment && this.fragment.to <= e;) this.nextFragment();
          if (!this.fragment || this.fragment.from > (e ? e - 1 : 0)) return !1;
          if (this.fragmentEnd < 0) {
            let e = this.fragment.to;
            for (; e > 0 && "\n" != this.input.read(e - 1, e);) e--;
            this.fragmentEnd = e ? e - 1 : 0
          }
          let n = this.cursor;
          n || (n = this.cursor = this.fragment.tree.cursor()).firstChild();
          let r = e + this.fragment.offset;
          for (; n.to <= r;)
            if (!n.parent()) return !1;
          for (;;) {
            if (n.from >= r) return this.fragment.from <= t;
            if (!n.childAfter(r)) return !1
          }
        }
        matches(e) {
          let t = this.cursor.tree;
          return t && t.prop(l.NodeProp.contextHash) == e
        }
        takeNodes(e) {
          let t = this.cursor,
            n = this.fragment.offset,
            r = this.fragmentEnd - !!this.fragment.openEnd,
            i = e.absoluteLineStart,
            u = i,
            o = e.block.children.length,
            a = u,
            h = o;
          for (;;) {
            if (t.to - n > r) {
              if (t.type.isAnonymous && t.firstChild()) continue;
              break
            }
            let i = ef(t.from - n, e.ranges);
            if (t.to - n <= e.ranges[e.rangeI].to) e.addNode(t.tree, i);
            else {
              let n = new l.Tree(e.parser.nodeSet.types[s.Paragraph], [], [], 0, e.block.hashProp);
              e.reusePlaceholders.set(n, t.tree), e.addNode(n, i)
            }
            if (t.type.is("Block") && (0 > el.indexOf(t.type.id) ? (u = t.to - n, o = e.block.children.length) : (u = a, o = h), a = t.to - n, h = e.block.children.length), !t.nextSibling()) break
          }
          for (; e.block.children.length > o;) e.block.children.pop(), e.block.positions.pop();
          return u - i
        }
        constructor(e, t) {
          this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++])
        }
      }

      function ef(e, t) {
        let n = e;
        for (let r = 1; r < t.length; r++) {
          let s = t[r - 1].to,
            i = t[r].from;
          s < e && (n -= i - s)
        }
        return n
      }
      let ed = (0, h.styleTags)({
          "Blockquote/...": h.tags.quote,
          HorizontalRule: h.tags.contentSeparator,
          "ATXHeading1/... SetextHeading1/...": h.tags.heading1,
          "ATXHeading2/... SetextHeading2/...": h.tags.heading2,
          "ATXHeading3/...": h.tags.heading3,
          "ATXHeading4/...": h.tags.heading4,
          "ATXHeading5/...": h.tags.heading5,
          "ATXHeading6/...": h.tags.heading6,
          "Comment CommentBlock": h.tags.comment,
          Escape: h.tags.escape,
          Entity: h.tags.character,
          "Emphasis/...": h.tags.emphasis,
          "StrongEmphasis/...": h.tags.strong,
          "Link/... Image/...": h.tags.link,
          "OrderedList/... BulletList/...": h.tags.list,
          "BlockQuote/...": h.tags.quote,
          "InlineCode CodeText": h.tags.monospace,
          "URL Autolink": h.tags.url,
          "HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": h.tags.processingInstruction,
          "CodeInfo LinkLabel": h.tags.labelName,
          LinkTitle: h.tags.string,
          Paragraph: h.tags.content
        }),
        ec = new z(new l.NodeSet(U).extend(ed), Object.keys(H).map(e => H[e]), Object.keys(H).map(e => R[e]), Object.keys(H), [(e, t) => D(t) >= 0, (e, t) => A(t) >= 0, (e, t) => C(t) >= 0, (e, t) => B(t, e, !0) >= 0, (e, t) => L(t, e, !0) >= 0, (e, t) => x(t, e, !0) >= 0, (e, t) => I(t, e, !0) >= 0], m, Object.keys(er).map(e => er[e]), Object.keys(er), []),
        ep = {
          resolve: "Strikethrough",
          mark: "StrikethroughMark"
        },
        em = {
          defineNodes: [{
            name: "Strikethrough",
            style: {
              "Strikethrough/...": h.tags.strikethrough
            }
          }, {
            name: "StrikethroughMark",
            style: h.tags.processingInstruction
          }],
          parseInline: [{
            name: "Strikethrough",
            parse(e, t, n) {
              if (126 != t || 126 != e.char(n + 1) || 126 == e.char(n + 2)) return -1;
              let r = e.slice(n - 1, n),
                s = e.slice(n + 2, n + 3),
                i = /\s|^$/.test(r),
                u = /\s|^$/.test(s),
                o = en.test(r),
                a = en.test(s);
              return e.addDelimiter(ep, n, n + 2, !u && (!a || i || o), !i && (!o || u || a))
            },
            after: "Emphasis"
          }]
        };

      function eg(e, t, n = 0, r, s = 0) {
        let i = 0,
          u = !0,
          o = -1,
          a = -1,
          l = !1,
          h = () => {
            r.push(e.elt("TableCell", s + o, s + a, e.parser.parseInline(t.slice(o, a), s + o)))
          };
        for (let f = n; f < t.length; f++) {
          let n = t.charCodeAt(f);
          124 != n || l ? (l || 32 != n && 9 != n) && (o < 0 && (o = f), a = f + 1) : ((!u || o > -1) && i++, u = !1, r && (o > -1 && h(), r.push(e.elt("TableDelimiter", f + s, f + s + 1))), o = a = -1), l = !l && 92 == n
        }
        return o > -1 && (i++, r && h()), i
      }

      function eF(e, t) {
        for (let n = t; n < e.length; n++) {
          let t = e.charCodeAt(n);
          if (124 == t) return !0;
          92 == t && n++
        }
        return !1
      }
      let ek = /^\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/;
      class eA {
        nextLine(e, t, n) {
          if (null == this.rows) {
            let r;
            if (this.rows = !1, (45 == t.next || 58 == t.next || 124 == t.next) && ek.test(r = t.text.slice(t.pos))) {
              let s = [];
              eg(e, n.content, 0, s, n.start) == eg(e, r, t.pos) && (this.rows = [e.elt("TableHeader", n.start, n.start + n.content.length, s), e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)])
            }
          } else if (this.rows) {
            let n = [];
            eg(e, t.text, t.pos, n, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, n))
          }
          return !1
        }
        finish(e, t) {
          return !!this.rows && (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), !0)
        }
        constructor() {
          this.rows = null
        }
      }
      let eC = {
        defineNodes: [{
          name: "Table",
          block: !0
        }, {
          name: "TableHeader",
          style: {
            "TableHeader/...": h.tags.heading
          }
        }, "TableRow", {
          name: "TableCell",
          style: h.tags.content
        }, {
          name: "TableDelimiter",
          style: h.tags.processingInstruction
        }],
        parseBlock: [{
          name: "Table",
          leaf: (e, t) => eF(t.content, 0) ? new eA : null,
          endLeaf(e, t, n) {
            if (n.parsers.some(e => e instanceof eA) || !eF(t.text, t.basePos)) return !1;
            let r = e.peekLine();
            return ek.test(r) && eg(e, t.text, t.basePos) == eg(e, r, t.basePos)
          },
          before: "SetextHeading"
        }]
      };
      class ex {
        nextLine() {
          return !1
        }
        finish(e, t) {
          return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [e.elt("TaskMarker", t.start, t.start + 3), ...e.parser.parseInline(t.content.slice(3), t.start + 3)])), !0
        }
      }
      let eE = {
          defineNodes: [{
            name: "Task",
            block: !0,
            style: h.tags.list
          }, {
            name: "TaskMarker",
            style: h.tags.atom
          }],
          parseBlock: [{
            name: "TaskList",
            leaf: (e, t) => /^\[[ xX]\][ \t]/.test(t.content) && "ListItem" == e.parentType().name ? new ex : null,
            after: "SetextHeading"
          }]
        },
        eB = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy,
        eL = /[\w-]+(\.[\w-]+)+(\/[^\s<]*)?/gy,
        eD = /[\w-]+\.[\w-]+($|\/)/,
        eb = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy,
        eS = /\/[a-zA-Z\d@.]+/gy;

      function ey(e, t, n, r) {
        let s = 0;
        for (let i = t; i < n; i++) e[i] == r && s++;
        return s
      }

      function ew(e, t) {
        eb.lastIndex = t;
        let n = eb.exec(e);
        if (!n) return -1;
        let r = n[0][n[0].length - 1];
        return "_" == r || "-" == r ? -1 : t + n[0].length - ("." == r)
      }
      let eT = [eC, eE, em, {
        parseInline: [{
          name: "Autolink",
          parse(e, t, n) {
            let r = n - e.offset;
            if (r && /\w/.test(e.text[r - 1])) return -1;
            eB.lastIndex = r;
            let s = eB.exec(e.text),
              i = -1;
            if (!s) return -1;
            if (s[1] || s[2]) {
              if ((i = function(e, t) {
                  eL.lastIndex = t;
                  let n = eL.exec(e);
                  if (!n || eD.exec(n[0])[0].indexOf("_") > -1) return -1;
                  let r = t + n[0].length;
                  for (;;) {
                    let n = e[r - 1],
                      s;
                    if (/[?!.,:*_~]/.test(n) || ")" == n && ey(e, t, r, ")") > ey(e, t, r, "(")) r--;
                    else if (";" == n && (s = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(e.slice(t, r)))) r = t + s.index;
                    else break
                  }
                  return r
                }(e.text, r + s[0].length)) > -1 && e.hasOpenLink) {
                let t = /([^\[\]]|\[[^\]]*\])*/.exec(e.text.slice(r, i));
                i = r + t[0].length
              }
            } else s[3] ? i = ew(e.text, r) : (i = ew(e.text, r + s[0].length)) > -1 && "xmpp:" == s[0] && (eS.lastIndex = i, (s = eS.exec(e.text)) && (i = s.index + s[0].length));
            return i < 0 ? -1 : (e.addElement(e.elt("URL", n, i + e.offset)), i + e.offset)
          }
        }]
      }];

      function eI(e, t, n) {
        return (r, s, i) => {
          if (s != e || r.char(i + 1) == e) return -1;
          let u = [r.elt(n, i, i + 1)];
          for (let s = i + 1; s < r.end; s++) {
            let o = r.char(s);
            if (o == e) return r.addElement(r.elt(t, i, s + 1, u.concat(r.elt(n, s, s + 1))));
            if (92 == o && u.push(r.elt("Escape", s, s++ + 2)), g(o)) break
          }
          return -1
        }
      }
      let ev = {
          defineNodes: [{
            name: "Superscript",
            style: h.tags.special(h.tags.content)
          }, {
            name: "SuperscriptMark",
            style: h.tags.processingInstruction
          }],
          parseInline: [{
            name: "Superscript",
            parse: eI(94, "Superscript", "SuperscriptMark")
          }]
        },
        eM = {
          defineNodes: [{
            name: "Subscript",
            style: h.tags.special(h.tags.content)
          }, {
            name: "SubscriptMark",
            style: h.tags.processingInstruction
          }],
          parseInline: [{
            name: "Subscript",
            parse: eI(126, "Subscript", "SubscriptMark")
          }]
        },
        eH = {
          defineNodes: [{
            name: "Emoji",
            style: h.tags.character
          }],
          parseInline: [{
            name: "Emoji",
            parse(e, t, n) {
              let r;
              return 58 == t && (r = /^[a-zA-Z_0-9]+:/.exec(e.slice(n + 1, e.end))) ? e.addElement(e.elt("Emoji", n, n + 1 + r[0].length)) : -1
            }
          }]
        };
      var eP = n(75750);
      let eN = (0, o.defineLanguageFacet)({
          commentTokens: {
            block: {
              open: "\x3c!--",
              close: "--\x3e"
            }
          }
        }),
        eO = new l.NodeProp,
        eR = ec.configure({
          props: [o.foldNodeProp.add(e => {
            var t;
            return !e.is("Block") || e.is("Document") || null != eX(e) || "OrderedList" == (t = e).name || "BulletList" == t.name ? void 0 : (e, t) => ({
              from: t.doc.lineAt(e.from).to,
              to: e.to
            })
          }), eO.add(eX), o.indentNodeProp.add({
            Document: () => null
          }), o.languageDataProp.add({
            Document: eN
          })]
        });

      function eX(e) {
        let t = /^(?:ATX|Setext)Heading(\d)$/.exec(e.name);
        return t ? +t[1] : void 0
      }
      let e$ = o.foldService.of((e, t, n) => {
        for (let r = (0, o.syntaxTree)(e).resolveInner(n, -1); r && !(r.from < t); r = r.parent) {
          let e = r.type.prop(eO);
          if (null == e) continue;
          let t = function(e, t) {
            let n = e;
            for (;;) {
              let e = n.nextSibling,
                r;
              if (!e || null != (r = eX(e.type)) && r <= t) break;
              n = e
            }
            return n.to
          }(r, e);
          if (t > n) return {
            from: n,
            to: t
          }
        }
        return null
      });

      function ez(e) {
        return new o.Language(eN, e, [], "markdown")
      }
      let e_ = ez(eR),
        eq = ez(eR.configure([eT, eM, ev, eH, {
          props: [o.foldNodeProp.add({
            Table: (e, t) => ({
              from: t.doc.lineAt(e.from).to,
              to: e.to
            })
          })]
        }]));
      class eU {
        blank(e, t = !0) {
          let n = this.spaceBefore + ("Blockquote" == this.node.name ? ">" : "");
          if (null != e) {
            for (; n.length < e;) n += " ";
            return n
          }
          for (let e = this.to - this.from - n.length - this.spaceAfter.length; e > 0; e--) n += " ";
          return n + (t ? this.spaceAfter : "")
        }
        marker(e, t) {
          let n = "OrderedList" == this.node.name ? String(+eQ(this.item, e)[2] + t) : "";
          return this.spaceBefore + n + this.type + this.spaceAfter
        }
        constructor(e, t, n, r, s, i, u) {
          this.node = e, this.from = t, this.to = n, this.spaceBefore = r, this.spaceAfter = s, this.type = i, this.item = u
        }
      }

      function ej(e, t) {
        let n = [],
          r = [];
        for (let t = e; t; t = t.parent) {
          if ("FencedCode" == t.name) return r;
          ("ListItem" == t.name || "Blockquote" == t.name) && n.push(t)
        }
        for (let e = n.length - 1; e >= 0; e--) {
          let s = n[e],
            i, u = t.lineAt(s.from),
            o = s.from - u.from;
          if ("Blockquote" == s.name && (i = /^ *>( ?)/.exec(u.text.slice(o)))) r.push(new eU(s, o, o + i[0].length, "", i[1], ">", null));
          else if ("ListItem" == s.name && "OrderedList" == s.parent.name && (i = /^( *)\d+([.)])( *)/.exec(u.text.slice(o)))) {
            let e = i[3],
              t = i[0].length;
            e.length >= 4 && (e = e.slice(0, e.length - 4), t -= 4), r.push(new eU(s.parent, o, o + t, i[1], e, i[2], s))
          } else if ("ListItem" == s.name && "BulletList" == s.parent.name && (i = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(u.text.slice(o)))) {
            let e = i[4],
              t = i[0].length;
            e.length > 4 && (e = e.slice(0, e.length - 4), t -= 4);
            let n = i[2];
            i[3] && (n += i[3].replace(/[xX]/, " ")), r.push(new eU(s.parent, o, o + t, i[1], e, n, s))
          }
        }
        return r
      }

      function eQ(e, t) {
        return /^(\s*)(\d+)(?=[.)])/.exec(t.sliceString(e.from, e.from + 10))
      }

      function eZ(e, t, n, r = 0) {
        for (let s = -1, i = e;;) {
          if ("ListItem" == i.name) {
            let e = eQ(i, t),
              u = +e[2];
            if (s >= 0) {
              if (u != s + 1) return;
              n.push({
                from: i.from + e[1].length,
                to: i.from + e[0].length,
                insert: String(s + 2 + r)
              })
            }
            s = u
          }
          let e = i.nextSibling;
          if (!e) break;
          i = e
        }
      }

      function eV(e, t) {
        let n = /^[ \t]*/.exec(e)[0].length;
        if (!n || "	" != t.facet(o.indentUnit)) return e;
        let r = (0, i.countColumn)(e, 4, n),
          s = "";
        for (let e = r; e > 0;) e >= 4 ? (s += "	", e -= 4) : (s += " ", e--);
        return s + e.slice(n)
      }
      let eG = (e = {}) => ({
          state: t,
          dispatch: n
        }) => {
          let r = (0, o.syntaxTree)(t),
            {
              doc: s
            } = t,
            u = null,
            a = t.changeByRange(n => {
              if (!n.empty || !eq.isActiveAt(t, n.from, -1) && !eq.isActiveAt(t, n.from, 1)) return u = {
                range: n
              };
              let o = n.from,
                a = s.lineAt(o),
                l = ej(r.resolveInner(o, -1), s);
              for (; l.length && l[l.length - 1].from > o - a.from;) l.pop();
              if (!l.length) return u = {
                range: n
              };
              let h = l[l.length - 1];
              if (h.to - h.spaceAfter.length > o - a.from) return u = {
                range: n
              };
              let f = o >= h.to - h.spaceAfter.length && !/\S/.test(a.text.slice(h.to));
              if (h.item && f) {
                if (h.item.from < a.from && !/^[\s>]*$/.test(a.text.slice(0, h.to))) return u = {
                  range: n
                };
                let r = h.node.firstChild,
                  f = h.node.getChild("ListItem", "ListItem");
                if (r.to >= o || f && f.to < o || a.from > 0 && !/[^\s>]/.test(s.lineAt(a.from - 1).text) || !1 === e.nonTightLists) {
                  let e = l.length > 1 ? l[l.length - 2] : null,
                    t, n = "";
                  e && e.item ? (t = a.from + e.from, n = e.marker(s, 1)) : t = a.from + (e ? e.to : 0);
                  let r = [{
                    from: t,
                    to: o,
                    insert: n
                  }];
                  return "OrderedList" == h.node.name && eZ(h.item, s, r, -2), e && "OrderedList" == e.node.name && eZ(e.item, s, r), {
                    range: i.EditorSelection.cursor(t + n.length),
                    changes: r
                  }
                } {
                  let e = eW(l, t, a);
                  return {
                    range: i.EditorSelection.cursor(o + e.length + 1),
                    changes: {
                      from: a.from,
                      insert: e + t.lineBreak
                    }
                  }
                }
              }
              if ("Blockquote" == h.node.name && f && a.from) {
                let e = s.lineAt(a.from - 1),
                  r = />\s*$/.exec(e.text);
                if (r && r.index == h.from) {
                  let s = t.changes([{
                    from: e.from + r.index,
                    to: e.to
                  }, {
                    from: a.from + h.from,
                    to: a.to
                  }]);
                  return {
                    range: n.map(s),
                    changes: s
                  }
                }
              }
              let d = [];
              "OrderedList" == h.node.name && eZ(h.item, s, d);
              let c = h.item && h.item.from < a.from,
                p = "";
              if (!c || /^[\s\d.)\-+*>]*/.exec(a.text)[0].length >= h.to)
                for (let e = 0, t = l.length - 1; e <= t; e++) p += e != t || c ? l[e].blank(e < t ? (0, i.countColumn)(a.text, 4, l[e + 1].from) - p.length : null) : l[e].marker(s, 1);
              let m = o;
              for (; m > a.from && /\s/.test(a.text.charAt(m - a.from - 1));) m--;
              return p = eV(p, t),
                function(e, t) {
                  if ("OrderedList" != e.name && "BulletList" != e.name) return !1;
                  let n = e.firstChild,
                    r = e.getChild("ListItem", "ListItem");
                  if (!r) return !1;
                  let s = t.lineAt(n.to),
                    i = t.lineAt(r.from),
                    u = /^[\s>]*$/.test(s.text);
                  return s.number + +!u < i.number
                }(h.node, t.doc) && (p = eW(l, t, a) + t.lineBreak + p), d.push({
                  from: m,
                  to: o,
                  insert: t.lineBreak + p
                }), {
                  range: i.EditorSelection.cursor(m + p.length + 1),
                  changes: d
                }
            });
          return !u && (n(t.update(a, {
            scrollIntoView: !0,
            userEvent: "input"
          })), !0)
        },
        eK = eG();

      function eJ(e) {
        return "QuoteMark" == e.name || "ListMark" == e.name
      }

      function eW(e, t, n) {
        let r = "";
        for (let t = 0, s = e.length - 2; t <= s; t++) r += e[t].blank(t < s ? (0, i.countColumn)(n.text, 4, e[t + 1].from) - r.length : null, t < s);
        return eV(r, t)
      }
      let eY = ({
          state: e,
          dispatch: t
        }) => {
          let n = (0, o.syntaxTree)(e),
            r = null,
            s = e.changeByRange(t => {
              let s = t.from,
                {
                  doc: u
                } = e;
              if (t.empty && eq.isActiveAt(e, t.from)) {
                let t = u.lineAt(s),
                  r = ej(function(e, t) {
                    let n = e.resolveInner(t, -1),
                      r = t;
                    eJ(n) && (r = n.from, n = n.parent);
                    for (let e; e = n.childBefore(r);)
                      if (eJ(e)) r = e.from;
                      else if ("OrderedList" == e.name || "BulletList" == e.name) r = (n = e.lastChild).to;
                    else break;
                    return n
                  }(n, s), u);
                if (r.length) {
                  let n = r[r.length - 1],
                    u = n.to - n.spaceAfter.length + +!!n.spaceAfter;
                  if (s - t.from > u && !/\S/.test(t.text.slice(u, s - t.from))) return {
                    range: i.EditorSelection.cursor(t.from + u),
                    changes: {
                      from: t.from + u,
                      to: s
                    }
                  };
                  if (s - t.from == u && (n.item && t.from <= n.item.from || /^[\s>]*$/.test(t.text.slice(0, n.to)))) {
                    let r = t.from + n.from;
                    if (n.item && n.node.from < n.item.from && /\S/.test(t.text.slice(n.from, n.to))) {
                      let s = n.blank((0, i.countColumn)(t.text, 4, n.to) - (0, i.countColumn)(t.text, 4, n.from));
                      return r == t.from && (s = eV(s, e)), {
                        range: i.EditorSelection.cursor(r + s.length),
                        changes: {
                          from: r,
                          to: t.from + n.to,
                          insert: s
                        }
                      }
                    }
                    if (r < s) return {
                      range: i.EditorSelection.cursor(r),
                      changes: {
                        from: r,
                        to: s
                      }
                    }
                  }
                }
              }
              return r = {
                range: t
              }
            });
          return !r && (t(e.update(s, {
            scrollIntoView: !0,
            userEvent: "delete"
          })), !0)
        },
        e1 = [{
          key: "Enter",
          run: eK
        }, {
          key: "Backspace",
          run: eY
        }],
        e0 = (0, eP.html)({
          matchClosingTags: !1
        });

      function e2(e = {}) {
        var t;
        let {
          codeLanguages: n,
          defaultCodeLanguage: r,
          addKeymap: a = !0,
          base: {
            parser: h
          } = e_,
          completeHTMLTags: f = !0,
          pasteURLAsLink: d = !0,
          htmlTagLanguage: c = e0
        } = e;
        if (!(h instanceof z)) throw RangeError("Base parser provided to `markdown` should be a Markdown parser");
        let p = e.extensions ? [e.extensions] : [],
          m = [c.support, e$],
          g;
        d && m.push(e9), r instanceof o.LanguageSupport ? (m.push(r.support), g = r.language) : r && (g = r);
        let F = n || g ? (t = g, e => {
          if (e && n) {
            let t = null;
            if (e = /\S*/.exec(e)[0], (t = "function" == typeof n ? n(e) : o.LanguageDescription.matchLanguageName(n, e, !0)) instanceof o.LanguageDescription) return t.support ? t.support.language.parser : o.ParseContext.getSkippingParser(t.load());
            if (t) return t.parser
          }
          return t ? t.parser : null
        }) : void 0;
        p.push(function(e) {
          let {
            codeParser: t,
            htmlParser: n
          } = e;
          return {
            wrap: (0, l.parseMixed)((e, r) => {
              let i = e.type.id;
              if (t && (i == s.CodeBlock || i == s.FencedCode)) {
                let n = "";
                if (i == s.FencedCode) {
                  let t = e.node.getChild(s.CodeInfo);
                  t && (n = r.read(t.from, t.to))
                }
                let u = t(n);
                if (u) return {
                  parser: u,
                  overlay: e => e.type.id == s.CodeText,
                  bracketed: i == s.FencedCode
                }
              } else if (n && (i == s.HTMLBlock || i == s.HTMLTag || i == s.CommentBlock)) return {
                parser: n,
                overlay: function(e, t, n) {
                  let r = [];
                  for (let s = e.firstChild, i = t;; s = s.nextSibling) {
                    let e = s ? s.from : n;
                    if (e > i && r.push({
                        from: i,
                        to: e
                      }), !s) break;
                    i = s.to
                  }
                  return r
                }(e.node, e.from, e.to)
              };
              return null
            })
          }
        }({
          codeParser: F,
          htmlParser: c.language.parser
        })), a && m.push(i.Prec.high(u.keymap.of(e1)));
        let k = ez(h.configure(p));
        return f && m.push(k.data.of({
          autocomplete: e3
        })), new o.LanguageSupport(k, m)
      }

      function e3(e) {
        let {
          state: t,
          pos: n
        } = e, r = /<[:\-\.\w\u00b7-\uffff]*$/.exec(t.sliceDoc(n - 25, n));
        if (!r) return null;
        let s = (0, o.syntaxTree)(t).resolveInner(n, -1);
        for (; s && !s.type.isTop;) {
          if ("CodeBlock" == s.name || "FencedCode" == s.name || "ProcessingInstructionBlock" == s.name || "CommentBlock" == s.name || "Link" == s.name || "Image" == s.name) return null;
          s = s.parent
        }
        return {
          from: n - r[0].length,
          to: n,
          options: function() {
            if (e4) return e4;
            let e = (0, eP.htmlCompletionSource)(new a.CompletionContext(i.EditorState.create({
              extensions: e0
            }), 0, !0));
            return e4 = e ? e.options : []
          }(),
          validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
        }
      }
      let e4 = null,
        e6 = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i,
        e9 = u.EditorView.domEventHandlers({
          paste: (e, t) => {
            var n;
            let {
              main: r
            } = t.state.selection;
            if (r.empty) return !1;
            let s = null == (n = e.clipboardData) ? void 0 : n.getData("text/plain");
            if (!s || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(s) || (/^www\./.test(s) && (s = "https://" + s), !eq.isActiveAt(t.state, r.from, 1))) return !1;
            let i = (0, o.syntaxTree)(t.state),
              u = !1;
            return i.iterate({
              from: r.from,
              to: r.to,
              enter: e => {
                (e.from > r.from || e6.test(e.name)) && (u = !0)
              },
              leave: e => {
                e.to < r.to && (u = !0)
              }
            }), !u && (t.dispatch({
              changes: [{
                from: r.from,
                insert: "["
              }, {
                from: r.to,
                insert: `](${s})`
              }],
              userEvent: "input.paste",
              scrollIntoView: !0
            }), !0)
          }
        })
    }
  }
]);

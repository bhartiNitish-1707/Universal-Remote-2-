function t(t, e, i, r) { var s, o = arguments.length, n = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--)(s = t[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, i, n) : s(e, i)) || n); return o > 3 && n && Object.defineProperty(e, i, n), n } "function" == typeof SuppressedError && SuppressedError; const e = globalThis, i = e.ShadowRoot && (void 0 === e.ShadyCSS || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, r = Symbol(), s = new WeakMap; let o = class { constructor(t, e, i) { if (this._$cssResult$ = !0, i !== r) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead."); this.cssText = t, this.t = e } get styleSheet() { let t = this.o; const e = this.t; if (i && void 0 === t) { const i = void 0 !== e && 1 === e.length; i && (t = s.get(e)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), i && s.set(e, t)) } return t } toString() { return this.cssText } }; const n = (t, ...e) => { const i = 1 === t.length ? t[0] : e.reduce((e, i, r) => e + (t => { if (!0 === t._$cssResult$) return t.cssText; if ("number" == typeof t) return t; throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.") })(i) + t[r + 1], t[0]); return new o(i, t, r) }, a = i ? t => t : t => t instanceof CSSStyleSheet ? (t => { let e = ""; for (const i of t.cssRules) e += i.cssText; return (t => new o("string" == typeof t ? t : t + "", void 0, r))(e) })(t) : t, { is: c, defineProperty: l, getOwnPropertyDescriptor: d, getOwnPropertyNames: h, getOwnPropertySymbols: p, getPrototypeOf: u } = Object, m = globalThis, f = m.trustedTypes, _ = f ? f.emptyScript : "", g = m.reactiveElementPolyfillSupport, v = (t, e) => t, b = { toAttribute(t, e) { switch (e) { case Boolean: t = t ? _ : null; break; case Object: case Array: t = null == t ? t : JSON.stringify(t) }return t }, fromAttribute(t, e) { let i = t; switch (e) { case Boolean: i = null !== t; break; case Number: i = null === t ? null : Number(t); break; case Object: case Array: try { i = JSON.parse(t) } catch (t) { i = null } }return i } }, $ = (t, e) => !c(t, e), y = { attribute: !0, type: String, converter: b, reflect: !1, useDefault: !1, hasChanged: $ }; Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= new WeakMap; let w = class extends HTMLElement { static addInitializer(t) { this._$Ei(), (this.l ??= []).push(t) } static get observedAttributes() { return this.finalize(), this._$Eh && [...this._$Eh.keys()] } static createProperty(t, e = y) { if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) { const i = Symbol(), r = this.getPropertyDescriptor(t, i, e); void 0 !== r && l(this.prototype, t, r) } } static getPropertyDescriptor(t, e, i) { const { get: r, set: s } = d(this.prototype, t) ?? { get() { return this[e] }, set(t) { this[e] = t } }; return { get: r, set(e) { const o = r?.call(this); s?.call(this, e), this.requestUpdate(t, o, i) }, configurable: !0, enumerable: !0 } } static getPropertyOptions(t) { return this.elementProperties.get(t) ?? y } static _$Ei() { if (this.hasOwnProperty(v("elementProperties"))) return; const t = u(this); t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties) } static finalize() { if (this.hasOwnProperty(v("finalized"))) return; if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) { const t = this.properties, e = [...h(t), ...p(t)]; for (const i of e) this.createProperty(i, t[i]) } const t = this[Symbol.metadata]; if (null !== t) { const e = litPropertyMetadata.get(t); if (void 0 !== e) for (const [t, i] of e) this.elementProperties.set(t, i) } this._$Eh = new Map; for (const [t, e] of this.elementProperties) { const i = this._$Eu(t, e); void 0 !== i && this._$Eh.set(i, t) } this.elementStyles = this.finalizeStyles(this.styles) } static finalizeStyles(t) { const e = []; if (Array.isArray(t)) { const i = new Set(t.flat(1 / 0).reverse()); for (const t of i) e.unshift(a(t)) } else void 0 !== t && e.push(a(t)); return e } static _$Eu(t, e) { const i = e.attribute; return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0 } constructor() { super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev() } _$Ev() { this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this)) } addController(t) { (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.() } removeController(t) { this._$EO?.delete(t) } _$E_() { const t = new Map, e = this.constructor.elementProperties; for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]); t.size > 0 && (this._$Ep = t) } createRenderRoot() { const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions); return ((t, r) => { if (i) t.adoptedStyleSheets = r.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet); else for (const i of r) { const r = document.createElement("style"), s = e.litNonce; void 0 !== s && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r) } })(t, this.constructor.elementStyles), t } connectedCallback() { this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(t => t.hostConnected?.()) } enableUpdating(t) { } disconnectedCallback() { this._$EO?.forEach(t => t.hostDisconnected?.()) } attributeChangedCallback(t, e, i) { this._$AK(t, i) } _$ET(t, e) { const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i); if (void 0 !== r && !0 === i.reflect) { const s = (void 0 !== i.converter?.toAttribute ? i.converter : b).toAttribute(e, i.type); this._$Em = t, null == s ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null } } _$AK(t, e) { const i = this.constructor, r = i._$Eh.get(t); if (void 0 !== r && this._$Em !== r) { const t = i.getPropertyOptions(r), s = "function" == typeof t.converter ? { fromAttribute: t.converter } : void 0 !== t.converter?.fromAttribute ? t.converter : b; this._$Em = r; const o = s.fromAttribute(e, t.type); this[r] = o ?? this._$Ej?.get(r) ?? o, this._$Em = null } } requestUpdate(t, e, i, r = !1, s) { if (void 0 !== t) { const o = this.constructor; if (!1 === r && (s = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? $)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return; this.C(t, e, i) } !1 === this.isUpdatePending && (this._$ES = this._$EP()) } C(t, e, { useDefault: i, reflect: r, wrapped: s }, o) { i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), !0 !== s || void 0 !== o) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), !0 === r && this._$Em !== t && (this._$Eq ??= new Set).add(t)) } async _$EP() { this.isUpdatePending = !0; try { await this._$ES } catch (t) { Promise.reject(t) } const t = this.scheduleUpdate(); return null != t && await t, !this.isUpdatePending } scheduleUpdate() { return this.performUpdate() } performUpdate() { if (!this.isUpdatePending) return; if (!this.hasUpdated) { if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) { for (const [t, e] of this._$Ep) this[t] = e; this._$Ep = void 0 } const t = this.constructor.elementProperties; if (t.size > 0) for (const [e, i] of t) { const { wrapped: t } = i, r = this[e]; !0 !== t || this._$AL.has(e) || void 0 === r || this.C(e, void 0, i, r) } } let t = !1; const e = this._$AL; try { t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(t => t.hostUpdate?.()), this.update(e)) : this._$EM() } catch (e) { throw t = !1, this._$EM(), e } t && this._$AE(e) } willUpdate(t) { } _$AE(t) { this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t) } _$EM() { this._$AL = new Map, this.isUpdatePending = !1 } get updateComplete() { return this.getUpdateComplete() } getUpdateComplete() { return this._$ES } shouldUpdate(t) { return !0 } update(t) { this._$Eq &&= this._$Eq.forEach(t => this._$ET(t, this[t])), this._$EM() } updated(t) { } firstUpdated(t) { } }; w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[v("elementProperties")] = new Map, w[v("finalized")] = new Map, g?.({ ReactiveElement: w }), (m.reactiveElementVersions ??= []).push("2.1.2"); const x = globalThis, A = t => t, S = x.trustedTypes, k = S ? S.createPolicy("lit-html", { createHTML: t => t }) : void 0, E = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, T = "?" + C, P = `<${T}>`, U = document, M = () => U.createComment(""), O = t => null === t || "object" != typeof t && "function" != typeof t, R = Array.isArray, V = "[ \t\n\f\r]", H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, N = /-->/g, z = />/g, D = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), B = /'/g, j = /"/g, L = /^(?:script|style|textarea|title)$/i, I = (t, ...e) => ({ _$litType$: 1, strings: t, values: e }), F = Symbol.for("lit-noChange"), W = Symbol.for("lit-nothing"), q = new WeakMap, Y = U.createTreeWalker(U, 129); function K(t, e) { if (!R(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array"); return void 0 !== k ? k.createHTML(e) : e } const X = (t, e) => { const i = t.length - 1, r = []; let s, o = 2 === e ? "<svg>" : 3 === e ? "<math>" : "", n = H; for (let e = 0; e < i; e++) { const i = t[e]; let a, c, l = -1, d = 0; for (; d < i.length && (n.lastIndex = d, c = n.exec(i), null !== c);)d = n.lastIndex, n === H ? "!--" === c[1] ? n = N : void 0 !== c[1] ? n = z : void 0 !== c[2] ? (L.test(c[2]) && (s = RegExp("</" + c[2], "g")), n = D) : void 0 !== c[3] && (n = D) : n === D ? ">" === c[0] ? (n = s ?? H, l = -1) : void 0 === c[1] ? l = -2 : (l = n.lastIndex - c[2].length, a = c[1], n = void 0 === c[3] ? D : '"' === c[3] ? j : B) : n === j || n === B ? n = D : n === N || n === z ? n = H : (n = D, s = void 0); const h = n === D && t[e + 1].startsWith("/>") ? " " : ""; o += n === H ? i + P : l >= 0 ? (r.push(a), i.slice(0, l) + E + i.slice(l) + C + h) : i + C + (-2 === l ? e : h) } return [K(t, o + (t[i] || "<?>") + (2 === e ? "</svg>" : 3 === e ? "</math>" : "")), r] }; class G { constructor({ strings: t, _$litType$: e }, i) { let r; this.parts = []; let s = 0, o = 0; const n = t.length - 1, a = this.parts, [c, l] = X(t, e); if (this.el = G.createElement(c, i), Y.currentNode = this.el.content, 2 === e || 3 === e) { const t = this.el.content.firstChild; t.replaceWith(...t.childNodes) } for (; null !== (r = Y.nextNode()) && a.length < n;) { if (1 === r.nodeType) { if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(E)) { const e = l[o++], i = r.getAttribute(t).split(C), n = /([.?@])?(.*)/.exec(e); a.push({ type: 1, index: s, name: n[2], strings: i, ctor: "." === n[1] ? et : "?" === n[1] ? it : "@" === n[1] ? rt : tt }), r.removeAttribute(t) } else t.startsWith(C) && (a.push({ type: 6, index: s }), r.removeAttribute(t)); if (L.test(r.tagName)) { const t = r.textContent.split(C), e = t.length - 1; if (e > 0) { r.textContent = S ? S.emptyScript : ""; for (let i = 0; i < e; i++)r.append(t[i], M()), Y.nextNode(), a.push({ type: 2, index: ++s }); r.append(t[e], M()) } } } else if (8 === r.nodeType) if (r.data === T) a.push({ type: 2, index: s }); else { let t = -1; for (; -1 !== (t = r.data.indexOf(C, t + 1));)a.push({ type: 7, index: s }), t += C.length - 1 } s++ } } static createElement(t, e) { const i = U.createElement("template"); return i.innerHTML = t, i } } function J(t, e, i = t, r) { if (e === F) return e; let s = void 0 !== r ? i._$Co?.[r] : i._$Cl; const o = O(e) ? void 0 : e._$litDirective$; return s?.constructor !== o && (s?._$AO?.(!1), void 0 === o ? s = void 0 : (s = new o(t), s._$AT(t, i, r)), void 0 !== r ? (i._$Co ??= [])[r] = s : i._$Cl = s), void 0 !== s && (e = J(t, s._$AS(t, e.values), s, r)), e } class Z { constructor(t, e) { this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e } get parentNode() { return this._$AM.parentNode } get _$AU() { return this._$AM._$AU } u(t) { const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? U).importNode(e, !0); Y.currentNode = r; let s = Y.nextNode(), o = 0, n = 0, a = i[0]; for (; void 0 !== a;) { if (o === a.index) { let e; 2 === a.type ? e = new Q(s, s.nextSibling, this, t) : 1 === a.type ? e = new a.ctor(s, a.name, a.strings, this, t) : 6 === a.type && (e = new st(s, this, t)), this._$AV.push(e), a = i[++n] } o !== a?.index && (s = Y.nextNode(), o++) } return Y.currentNode = U, r } p(t) { let e = 0; for (const i of this._$AV) void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++ } } class Q { get _$AU() { return this._$AM?._$AU ?? this._$Cv } constructor(t, e, i, r) { this.type = 2, this._$AH = W, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0 } get parentNode() { let t = this._$AA.parentNode; const e = this._$AM; return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t } get startNode() { return this._$AA } get endNode() { return this._$AB } _$AI(t, e = this) { t = J(this, t, e), O(t) ? t === W || null == t || "" === t ? (this._$AH !== W && this._$AR(), this._$AH = W) : t !== this._$AH && t !== F && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : (t => R(t) || "function" == typeof t?.[Symbol.iterator])(t) ? this.k(t) : this._(t) } O(t) { return this._$AA.parentNode.insertBefore(t, this._$AB) } T(t) { this._$AH !== t && (this._$AR(), this._$AH = this.O(t)) } _(t) { this._$AH !== W && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(U.createTextNode(t)), this._$AH = t } $(t) { const { values: e, _$litType$: i } = t, r = "number" == typeof i ? this._$AC(t) : (void 0 === i.el && (i.el = G.createElement(K(i.h, i.h[0]), this.options)), i); if (this._$AH?._$AD === r) this._$AH.p(e); else { const t = new Z(r, this), i = t.u(this.options); t.p(e), this.T(i), this._$AH = t } } _$AC(t) { let e = q.get(t.strings); return void 0 === e && q.set(t.strings, e = new G(t)), e } k(t) { R(this._$AH) || (this._$AH = [], this._$AR()); const e = this._$AH; let i, r = 0; for (const s of t) r === e.length ? e.push(i = new Q(this.O(M()), this.O(M()), this, this.options)) : i = e[r], i._$AI(s), r++; r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r) } _$AR(t = this._$AA.nextSibling, e) { for (this._$AP?.(!1, !0, e); t !== this._$AB;) { const e = A(t).nextSibling; A(t).remove(), t = e } } setConnected(t) { void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t)) } } class tt { get tagName() { return this.element.tagName } get _$AU() { return this._$AM._$AU } constructor(t, e, i, r, s) { this.type = 1, this._$AH = W, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String), this.strings = i) : this._$AH = W } _$AI(t, e = this, i, r) { const s = this.strings; let o = !1; if (void 0 === s) t = J(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== F, o && (this._$AH = t); else { const r = t; let n, a; for (t = s[0], n = 0; n < s.length - 1; n++)a = J(this, r[i + n], e, n), a === F && (a = this._$AH[n]), o ||= !O(a) || a !== this._$AH[n], a === W ? t = W : t !== W && (t += (a ?? "") + s[n + 1]), this._$AH[n] = a } o && !r && this.j(t) } j(t) { t === W ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "") } } class et extends tt { constructor() { super(...arguments), this.type = 3 } j(t) { this.element[this.name] = t === W ? void 0 : t } } class it extends tt { constructor() { super(...arguments), this.type = 4 } j(t) { this.element.toggleAttribute(this.name, !!t && t !== W) } } class rt extends tt { constructor(t, e, i, r, s) { super(t, e, i, r, s), this.type = 5 } _$AI(t, e = this) { if ((t = J(this, t, e, 0) ?? W) === F) return; const i = this._$AH, r = t === W && i !== W || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== W && (i === W || r); r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t } handleEvent(t) { "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t) } } class st { constructor(t, e, i) { this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i } get _$AU() { return this._$AM._$AU } _$AI(t) { J(this, t) } } const ot = x.litHtmlPolyfillSupport; ot?.(G, Q), (x.litHtmlVersions ??= []).push("3.3.2"); const nt = globalThis; class at extends w { constructor() { super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0 } createRenderRoot() { const t = super.createRenderRoot(); return this.renderOptions.renderBefore ??= t.firstChild, t } update(t) { const e = this.render(); this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((t, e, i) => { const r = i?.renderBefore ?? e; let s = r._$litPart$; if (void 0 === s) { const t = i?.renderBefore ?? null; r._$litPart$ = s = new Q(e.insertBefore(M(), t), t, void 0, i ?? {}) } return s._$AI(t), s })(e, this.renderRoot, this.renderOptions) } connectedCallback() { super.connectedCallback(), this._$Do?.setConnected(!0) } disconnectedCallback() { super.disconnectedCallback(), this._$Do?.setConnected(!1) } render() { return F } } at._$litElement$ = !0, at.finalized = !0, nt.litElementHydrateSupport?.({ LitElement: at }); const ct = nt.litElementPolyfillSupport; ct?.({ LitElement: at }), (nt.litElementVersions ??= []).push("4.2.2"); const lt = t => (e, i) => { void 0 !== i ? i.addInitializer(() => { customElements.define(t, e) }) : customElements.define(t, e) }, dt = { attribute: !0, type: String, converter: b, reflect: !1, hasChanged: $ }, ht = (t = dt, e, i) => { const { kind: r, metadata: s } = i; let o = globalThis.litPropertyMetadata.get(s); if (void 0 === o && globalThis.litPropertyMetadata.set(s, o = new Map), "setter" === r && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), "accessor" === r) { const { name: r } = i; return { set(i) { const s = e.get.call(this); e.set.call(this, i), this.requestUpdate(r, s, t, !0, i) }, init(e) { return void 0 !== e && this.C(r, void 0, t, e), e } } } if ("setter" === r) { const { name: r } = i; return function (i) { const s = this[r]; e.call(this, i), this.requestUpdate(r, s, t, !0, i) } } throw Error("Unsupported decorator location: " + r) }; function pt(t) { return (e, i) => "object" == typeof i ? ht(t, e, i) : ((t, e, i) => { const r = e.hasOwnProperty(i); return e.constructor.createProperty(i, t), r ? Object.getOwnPropertyDescriptor(e, i) : void 0 })(t, e, i) } function ut(t) { return pt({ ...t, state: !0, attribute: !1 }) } const mt = n`
  :host {
    --urc-bg: #1a1a2e;
    --urc-surface: #16213e;
    --urc-surface-2: #0f3460;
    --urc-accent: #e94560;
    --urc-accent-2: #f5a623;
    --urc-text: #eaeaea;
    --urc-text-muted: #8892a4;
    --urc-border: rgba(233, 69, 96, 0.25);
    --urc-shadow: 0 4px 24px rgba(0,0,0,0.5);
    --urc-btn-size: 48px;
    --urc-btn-radius: 12px;
    --urc-transition: 0.15s ease;
    display: block;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }

  :host([color-scheme="light"]) {
    --urc-bg: #f0f4f8;
    --urc-surface: #ffffff;
    --urc-surface-2: #e2e8f0;
    --urc-accent: #e94560;
    --urc-accent-2: #f5a623;
    --urc-text: #1a202c;
    --urc-text-muted: #718096;
    --urc-border: rgba(233, 69, 96, 0.2);
  }

  .card-container {
    background: var(--urc-bg);
    border-radius: 20px;
    padding: 16px;
    box-shadow: var(--urc-shadow);
    border: 1px solid var(--urc-border);
    overflow: hidden;
    position: relative;
  }

  .card-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--urc-accent), var(--urc-accent-2), var(--urc-accent));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--urc-text-muted);
    margin: 4px 0 14px 2px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--urc-border);
  }

  .platform-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(233, 69, 96, 0.12);
    border: 1px solid rgba(233, 69, 96, 0.3);
    color: var(--urc-accent);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: 20px;
    text-transform: uppercase;
    margin-left: 6px;
  }

  .rows-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .button-row {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .remote-btn {
    width: var(--urc-btn-size);
    height: var(--urc-btn-size);
    border-radius: var(--urc-btn-radius);
    background: var(--urc-surface);
    border: 1px solid var(--urc-border);
    color: var(--urc-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
    transition: all var(--urc-transition);
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    outline: none;
    padding: 0;
  }

  .remote-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity var(--urc-transition);
  }

  .remote-btn:hover {
    background: var(--urc-surface-2);
    border-color: rgba(233, 69, 96, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.2);
  }

  .remote-btn:hover::after {
    opacity: 1;
  }

  .remote-btn:active {
    transform: scale(0.92) translateY(0);
    background: var(--urc-accent);
    border-color: var(--urc-accent);
    box-shadow: 0 0 12px rgba(233, 69, 96, 0.5);
  }

  .remote-btn.power-btn {
    background: rgba(233, 69, 96, 0.1);
    border-color: rgba(233, 69, 96, 0.4);
    color: var(--urc-accent);
  }

  .remote-btn.power-btn:hover {
    background: var(--urc-accent);
    color: white;
  }

  .remote-btn.power-btn:active {
    background: #c73652;
  }

  .remote-btn ha-icon,
  .remote-btn .btn-icon {
    width: 20px;
    height: 20px;
    pointer-events: none;
    --mdc-icon-size: 20px;
  }

  .btn-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--urc-text-muted);
    pointer-events: none;
    line-height: 1;
  }

  .remote-btn:active .btn-label {
    color: rgba(255,255,255,0.8);
  }

  /* DPAD */
  .dpad-container {
    display: grid;
    grid-template-columns: repeat(3, var(--urc-btn-size));
    grid-template-rows: repeat(3, var(--urc-btn-size));
    gap: 4px;
    position: relative;
  }

  .dpad-container .remote-btn {
    border-radius: 8px;
  }

  .dpad-container .dpad-center {
    border-radius: 50%;
    background: linear-gradient(135deg, var(--urc-surface-2), var(--urc-surface));
    border-color: rgba(233, 69, 96, 0.5);
  }

  .dpad-container .dpad-center:active {
    background: var(--urc-accent);
  }

  /* Touchpad */
  .touchpad {
    width: 100%;
    max-width: 280px;
    height: 160px;
    background: var(--urc-surface);
    border: 1px solid var(--urc-border);
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    transition: all var(--urc-transition);
    touch-action: none;
  }

  .touchpad::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(233, 69, 96, 0.05) 0%, transparent 70%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(255,255,255,0.02) 20px,
        rgba(255,255,255,0.02) 21px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(255,255,255,0.02) 20px,
        rgba(255,255,255,0.02) 21px
      );
  }

  .touchpad-hint {
    font-size: 11px;
    color: var(--urc-text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 600;
    pointer-events: none;
  }

  .touchpad-icon {
    font-size: 24px;
    opacity: 0.3;
    pointer-events: none;
  }

  .touchpad:hover {
    border-color: rgba(233, 69, 96, 0.5);
    background: var(--urc-surface-2);
  }

  .touchpad.swiping {
    border-color: var(--urc-accent);
    box-shadow: 0 0 16px rgba(233, 69, 96, 0.3);
  }

  .touchpad-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(233, 69, 96, 0.3);
    transform: scale(0);
    animation: ripple 0.4s ease-out;
    pointer-events: none;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
  }

  @keyframes ripple {
    to { transform: scale(3); opacity: 0; }
  }

  .spacer {
    width: var(--urc-btn-size);
    height: var(--urc-btn-size);
    visibility: hidden;
  }

  /* Volume slider area */
  .vol-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Status bar */
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid var(--urc-border);
  }

  .status-entity {
    font-size: 11px;
    color: var(--urc-text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #666;
  }

  .status-dot.on {
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.5);
  }

  .status-dot.off {
    background: var(--urc-text-muted);
  }

  .status-state {
    font-size: 11px;
    color: var(--urc-text-muted);
    text-transform: capitalize;
  }
`, ft = n`
  .editor {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ha-textfield,
  ha-select {
    width: 100%;
  }
`; let _t = class extends at {
  static get styles() { return [ft] } setConfig(t) { this._config = t } _valueChanged(t) { if (!this._config || !this.hass) return; const e = t.target, i = e.value, r = e.configValue; r && (this._config = { ...this._config, [r]: i }, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }))) } render() {
    if (!this.hass || !this._config) return I``; const t = Object.keys(this.hass.states).filter(t => t.startsWith("media_player.")), e = Object.keys(this.hass.states).filter(t => t.startsWith("remote.")); return I`
      <div class="editor">
        <div class="editor-row">
          <label>Title</label>
          <ha-textfield
            .label=${"Card Title"}
            .value=${this._config.title || ""}
            .configValue=${"title"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-row">
          <label>Platform</label>
          <ha-select
            .label=${"Platform"}
            .value=${this._config.platform || "Fire TV"}
            .configValue=${"platform"}
            @selected=${this._valueChanged}
            @closed=${t => t.stopPropagation()}
          >
            <mwc-list-item value="Fire TV">Fire TV</mwc-list-item>
            <mwc-list-item value="Android TV">Android TV</mwc-list-item>
            <mwc-list-item value="Apple TV">Apple TV</mwc-list-item>
            <mwc-list-item value="Generic">Generic</mwc-list-item>
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Media Player Entity</label>
          <ha-select
            .label=${"Media Player"}
            .value=${this._config.media_player_id || ""}
            .configValue=${"media_player_id"}
            @selected=${this._valueChanged}
            @closed=${t => t.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${t.map(t => I`<mwc-list-item value="${t}">${t}</mwc-list-item>`)}
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Remote Entity</label>
          <ha-select
            .label=${"Remote"}
            .value=${this._config.remote_id || ""}
            .configValue=${"remote_id"}
            @selected=${this._valueChanged}
            @closed=${t => t.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${e.map(t => I`<mwc-list-item value="${t}">${t}</mwc-list-item>`)}
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Color Scheme</label>
          <ha-select
            .label=${"Color Scheme"}
            .value=${this._config.color_scheme || "dark"}
            .configValue=${"color_scheme"}
            @selected=${this._valueChanged}
            @closed=${t => t.stopPropagation()}
          >
            <mwc-list-item value="dark">Dark</mwc-list-item>
            <mwc-list-item value="light">Light</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
        </div>
      </div>
    `}
}; t([pt({ attribute: !1 })], _t.prototype, "hass", void 0), t([ut()], _t.prototype, "_config", void 0), _t = t([lt("universal-remote-card-editor")], _t); var gt = Object.freeze({ __proto__: null, get UniversalRemoteCardEditor() { return _t } }); const vt = { "Fire TV": "🔥", "Android TV": "🤖", "Apple TV": "🍎", Generic: "📺" }; function bt(t) { return { power: { icon: "mdi:power", label: "Power", service: "media_player.toggle" }, back: { icon: "mdi:arrow-left", label: "Back", key: "back" }, home: { icon: "mdi:home", label: "Home", key: "home" }, menu: { icon: "mdi:menu", label: "Menu", key: "Apple TV" === t ? "menu" : "settings" }, play_pause: { icon: "mdi:play-pause", label: "Play", service: "media_player.media_play_pause" }, rewind: { icon: "mdi:rewind", label: "Rwd", service: "media_player.media_previous_track" }, fast_forward: { icon: "mdi:fast-forward", label: "Fwd", service: "media_player.media_next_track" }, mute: { icon: "mdi:volume-mute", label: "Mute", service: "media_player.volume_mute" }, volume_up: { icon: "mdi:volume-high", label: "Vol+", service: "media_player.volume_up" }, volume_down: { icon: "mdi:volume-low", label: "Vol-", service: "media_player.volume_down" }, up: { icon: "mdi:chevron-up", label: "Up", key: "up" }, down: { icon: "mdi:chevron-down", label: "Down", key: "down" }, left: { icon: "mdi:chevron-left", label: "Left", key: "left" }, right: { icon: "mdi:chevron-right", label: "Right", key: "right" }, select: { icon: "mdi:checkbox-blank-circle", label: "OK", key: "select" }, app_switch: { icon: "mdi:view-grid", label: "Apps", key: "app_switch" }, search: { icon: "mdi:magnify", label: "Search", key: "search" }, input_select: { icon: "mdi:import", label: "Input", service: "media_player.select_source" }, channel_up: { icon: "mdi:chevron-double-up", label: "Ch+", key: "channel_up" }, channel_down: { icon: "mdi:chevron-double-down", label: "Ch-", key: "channel_down" }, record: { icon: "mdi:record", label: "Rec", key: "record" }, stop: { icon: "mdi:stop", label: "Stop", service: "media_player.media_stop" }, previous: { icon: "mdi:skip-previous", label: "Prev", service: "media_player.media_previous_track" }, next: { icon: "mdi:skip-next", label: "Next", service: "media_player.media_next_track" }, subtitle: { icon: "mdi:subtitles", label: "Sub", key: "subtitle" }, info: { icon: "mdi:information-outline", label: "Info", key: "info" }, touchpad: { icon: "mdi:gesture-swipe", label: "Touch", key: "touchpad" }, space: { icon: "", label: "", key: "space" } } } const $t = { "Fire TV": [["power", "back", "home", "menu"], ["touchpad"], ["rewind", "play_pause", "fast_forward"], ["volume_down", "mute", "volume_up"]], "Android TV": [["power", "back", "home", "app_switch"], ["touchpad"], ["rewind", "play_pause", "fast_forward"], ["volume_down", "mute", "volume_up"]], "Apple TV": [["power", "back", "home", "menu"], ["touchpad"], ["previous", "play_pause", "next"], ["volume_down", "mute", "volume_up"]], Generic: [["power", "back", "home"], ["up", "space", "space"], ["left", "select", "right"], ["down", "space", "space"], ["play_pause", "stop", "mute"]] }; let yt = class extends at {
  constructor() { super(...arguments), this._touchActive = !1, this._touchStartX = 0, this._touchStartY = 0, this._swipeThreshold = 30, this._lastSwipeTime = 0 } static get styles() { return [mt] } static async getConfigElement() { return await Promise.resolve().then(function () { return gt }), document.createElement("universal-remote-card-editor") } static getStubConfig() { return { type: "custom:universal-remote-card", title: "Fire TV", platform: "Fire TV", rows: $t["Fire TV"] } } setConfig(t) { if (!t) throw new Error("Invalid configuration"); this._config = { platform: "Fire TV", color_scheme: "dark", ...t } } getCardSize() { return 5 } async _pressRemoteKey(t) { const { remote_id: e, media_player_id: i } = this._config; if (e) await this.hass.callService("remote", "send_command", { entity_id: e, command: t }); else if (i) { const e = { select: ["media_player", "media_play_pause"] }[t]; e && await this.hass.callService(e[0], e[1], { entity_id: i }) } } async _callMediaService(t, e) { const { media_player_id: i } = this._config; if (!i) return; const [r, s] = t.split("."); await this.hass.callService(r, s, { entity_id: i, ...e }) } async _handleButtonPress(t) { const e = bt(this._config.platform || "Fire TV")[t]; if (!e) return; const i = this._config.custom_actions; if (i && i[t]) { const e = i[t]; if ("call-service" === e.action && e.service) { const [t, i] = e.service.split("."); return void await this.hass.callService(t, i, e.service_data || {}) } } e.service ? await this._callMediaService(e.service) : e.key && "space" !== e.key && "touchpad" !== e.key && await this._pressRemoteKey(e.key) } _onTouchStart(t) { this._touchStartX = t.touches[0].clientX, this._touchStartY = t.touches[0].clientY, this._touchActive = !0; const e = t.currentTarget, i = document.createElement("div"); i.className = "touchpad-ripple"; const r = e.getBoundingClientRect(); i.style.left = t.touches[0].clientX - r.left + "px", i.style.top = t.touches[0].clientY - r.top + "px", e.appendChild(i), setTimeout(() => i.remove(), 400) } _onTouchEnd(t) { this._touchActive = !1; const e = Date.now(), i = t.changedTouches[0].clientX - this._touchStartX, r = t.changedTouches[0].clientY - this._touchStartY, s = Math.abs(i), o = Math.abs(r); e - this._lastSwipeTime < 300 || (this._lastSwipeTime = e, s < 10 && o < 10 ? this._handleButtonPress("select") : (s > this._swipeThreshold || o > this._swipeThreshold) && this._handleButtonPress(s > o ? i > 0 ? "right" : "left" : r > 0 ? "down" : "up"), t.preventDefault()) } _onMouseSwipe(t) { this._handleButtonPress(t) } _renderButton(t) {
    if ("space" === t) return I`<div class="spacer"></div>`; if ("touchpad" === t) return this._renderTouchpad(); if ("dpad" === t) return this._renderDpad(); const e = bt(this._config.platform || "Fire TV")[t]; return e ? I`
      <button
        class="remote-btn ${"power" === t ? "power-btn" : ""}"
        title="${e.label}"
        @click=${() => this._handleButtonPress(t)}
        aria-label="${e.label}"
      >
        <ha-icon icon="${e.icon}"></ha-icon>
        <span class="btn-label">${e.label}</span>
      </button>
    `: I`<div class="spacer"></div>`
  } _renderDpad() {
    return I`
      <div class="dpad-container">
        <div class="spacer"></div>
        ${this._renderDpadBtn("up", "mdi:chevron-up", "Up")}
        <div class="spacer"></div>
        ${this._renderDpadBtn("left", "mdi:chevron-left", "Left")}
        <button
          class="remote-btn dpad-center"
          @click=${() => this._handleButtonPress("select")}
          aria-label="Select"
        >
          <ha-icon icon="mdi:checkbox-blank-circle"></ha-icon>
        </button>
        ${this._renderDpadBtn("right", "mdi:chevron-right", "Right")}
        <div class="spacer"></div>
        ${this._renderDpadBtn("down", "mdi:chevron-down", "Down")}
        <div class="spacer"></div>
      </div>
    `} _renderDpadBtn(t, e, i) {
    return I`
      <button
        class="remote-btn"
        @click=${() => this._handleButtonPress(t)}
        aria-label="${i}"
      >
        <ha-icon icon="${e}"></ha-icon>
      </button>
    `} _renderTouchpad() {
    return I`
      <div
        class="touchpad ${this._touchActive ? "swiping" : ""}"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
        @touchcancel=${() => { this._touchActive = !1 }}
      >
        <span class="touchpad-icon">👆</span>
        <span class="touchpad-hint">Swipe to navigate · Tap to select</span>
        <div style="display:flex;gap:6px;margin-top:8px;">
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe("left")} aria-label="Left">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe("up")} aria-label="Up">
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._handleButtonPress("select")} aria-label="OK">
            <ha-icon icon="mdi:checkbox-blank-circle"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe("down")} aria-label="Down">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe("right")} aria-label="Right">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>
      </div>
    `} _renderStatusBar() {
    const { media_player_id: t } = this._config; if (!t || !this.hass) return W; const e = this.hass.states[t]; if (!e) return W; const i = e.state, r = e.attributes.media_title || ""; return I`
      <div class="status-bar">
        <div class="status-entity">
          <div class="status-dot ${"off" !== i && "unavailable" !== i && "unknown" !== i ? "on" : "off"}"></div>
          ${t.replace("media_player.", "")}
        </div>
        <div class="status-state">${r || i}</div>
      </div>
    `} render() {
    if (!this._config) return I``; const { title: t, platform: e = "Fire TV", rows: i, color_scheme: r = "dark" } = this._config; return I`
      <ha-card>
        <div class="card-container" color-scheme="${r}">
          ${t ? I`
            <div class="card-title">
              ${t}
              <span class="platform-badge">${vt[e] || "📺"} ${e}</span>
            </div>
          `: W}

          <div class="rows-container">
            ${(i || $t[e] || $t.Generic).map(t => I`
              <div class="button-row">
                ${t.map(t => this._renderButton(t))}
              </div>
            `)}
          </div>

          ${this._renderStatusBar()}
        </div>
      </ha-card>
    `}
}; t([pt({ attribute: !1 })], yt.prototype, "hass", void 0), t([ut()], yt.prototype, "_config", void 0), t([ut()], yt.prototype, "_touchActive", void 0), yt = t([lt("universal-remote-card")], yt); let wt = class extends at { static getStubConfig() { return { type: "custom:android-tv-card", title: "Android TV", platform: "Android TV" } } setConfig(t) { this._inner || (this._inner = document.createElement("universal-remote-card"), this.renderRoot.appendChild(this._inner)), this._inner.setConfig({ ...t, platform: t.platform || "Android TV" }) } updated() { this._inner && (this._inner.hass = this.hass) } render() { return I`<slot></slot>` } createRenderRoot() { return this } }; t([pt({ attribute: !1 })], wt.prototype, "hass", void 0), wt = t([lt("android-tv-card")], wt), window.customCards = window.customCards || [], window.customCards.push({ type: "universal-remote-card", name: "Universal Remote Card", description: "Universal remote control card – Fire TV, Android TV, Apple TV, and more", preview: !0, documentationURL: "https://github.com/your-org/Fire-Tv#readme" }); export { wt as AndroidTvCard, yt as UniversalRemoteCard, _t as UniversalRemoteCardEditor };

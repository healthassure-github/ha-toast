// src/Toast.jsx
import { useEffect as useEffect2 } from "react";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t6, f3, n3 = "";
  if ("string" == typeof e || "number" == typeof e) n3 += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o5 = e.length;
    for (t6 = 0; t6 < o5; t6++) e[t6] && (f3 = r(e[t6])) && (n3 && (n3 += " "), n3 += f3);
  } else for (f3 in e) e[f3] && (n3 && (n3 += " "), n3 += f3);
  return n3;
}
function clsx() {
  for (var e, t6, f3 = 0, n3 = "", o5 = arguments.length; f3 < o5; f3++) (e = arguments[f3]) && (t6 = r(e)) && (n3 && (n3 += " "), n3 += t6);
  return n3;
}
var clsx_default = clsx;

// node_modules/@headlessui/react/dist/utils/env.js
var i = Object.defineProperty;
var d = (t6, e, n3) => e in t6 ? i(t6, e, { enumerable: true, configurable: true, writable: true, value: n3 }) : t6[e] = n3;
var r2 = (t6, e, n3) => (d(t6, typeof e != "symbol" ? e + "" : e, n3), n3);
var o = class {
  constructor() {
    r2(this, "current", this.detect());
    r2(this, "handoffState", "pending");
    r2(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
var s = new o();

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
import { useEffect as s2, useState as o3 } from "react";

// node_modules/@headlessui/react/dist/utils/micro-task.js
function t(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o5) => setTimeout(() => {
    throw o5;
  }));
}

// node_modules/@headlessui/react/dist/utils/disposables.js
function o2() {
  let s5 = [], r5 = { addEventListener(e, t6, n3, i4) {
    return e.addEventListener(t6, n3, i4), r5.add(() => e.removeEventListener(t6, n3, i4));
  }, requestAnimationFrame(...e) {
    let t6 = requestAnimationFrame(...e);
    return r5.add(() => cancelAnimationFrame(t6));
  }, nextFrame(...e) {
    return r5.requestAnimationFrame(() => r5.requestAnimationFrame(...e));
  }, setTimeout(...e) {
    let t6 = setTimeout(...e);
    return r5.add(() => clearTimeout(t6));
  }, microTask(...e) {
    let t6 = { current: true };
    return t(() => {
      t6.current && e[0]();
    }), r5.add(() => {
      t6.current = false;
    });
  }, style(e, t6, n3) {
    let i4 = e.style.getPropertyValue(t6);
    return Object.assign(e.style, { [t6]: n3 }), this.add(() => {
      Object.assign(e.style, { [t6]: i4 });
    });
  }, group(e) {
    let t6 = o2();
    return e(t6), this.add(() => t6.dispose());
  }, add(e) {
    return s5.includes(e) || s5.push(e), () => {
      let t6 = s5.indexOf(e);
      if (t6 >= 0) for (let n3 of s5.splice(t6, 1)) n3();
    };
  }, dispose() {
    for (let e of s5.splice(0)) e();
  } };
  return r5;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
function p() {
  let [e] = o3(o2);
  return s2(() => () => e.dispose(), [e]), e;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
import a from "react";

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
import { useRef as t2 } from "react";

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
import { useEffect as f, useLayoutEffect as c } from "react";
var n = (e, t6) => {
  s.isServer ? f(e, t6) : c(e, t6);
};

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function s3(e) {
  let r5 = t2(e);
  return n(() => {
    r5.current = e;
  }, [e]), r5;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var o4 = function(t6) {
  let e = s3(t6);
  return a.useCallback((...r5) => e.current(...r5), [e]);
};

// node_modules/@headlessui/react/dist/utils/render.js
import E, { Fragment as j, cloneElement as v, createElement as S, forwardRef as w, isValidElement as k, useCallback as x, useRef as M } from "react";

// node_modules/@headlessui/react/dist/utils/class-names.js
function t3(...r5) {
  return Array.from(new Set(r5.flatMap((n3) => typeof n3 == "string" ? n3.split(" ") : []))).filter(Boolean).join(" ");
}

// node_modules/@headlessui/react/dist/utils/match.js
function u(r5, n3, ...a2) {
  if (r5 in n3) {
    let e = n3[r5];
    return typeof e == "function" ? e(...a2) : e;
  }
  let t6 = new Error(`Tried to handle "${r5}" but there is no handler defined. Only defined handlers are: ${Object.keys(n3).map((e) => `"${e}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t6, u), t6;
}

// node_modules/@headlessui/react/dist/utils/render.js
var A = ((a2) => (a2[a2.None = 0] = "None", a2[a2.RenderStrategy = 1] = "RenderStrategy", a2[a2.Static = 2] = "Static", a2))(A || {});
var C = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(C || {});
function K() {
  let n3 = $();
  return x((r5) => U({ mergeRefs: n3, ...r5 }), [n3]);
}
function U({ ourProps: n3, theirProps: r5, slot: e, defaultTag: a2, features: s5, visible: t6 = true, name: l4, mergeRefs: i4 }) {
  i4 = i4 != null ? i4 : I;
  let o5 = P(r5, n3);
  if (t6) return F(o5, e, a2, l4, i4);
  let y2 = s5 != null ? s5 : 0;
  if (y2 & 2) {
    let { static: f3 = false, ...u4 } = o5;
    if (f3) return F(u4, e, a2, l4, i4);
  }
  if (y2 & 1) {
    let { unmount: f3 = true, ...u4 } = o5;
    return u(f3 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return F({ ...u4, hidden: true, style: { display: "none" } }, e, a2, l4, i4);
    } });
  }
  return F(o5, e, a2, l4, i4);
}
function F(n3, r5 = {}, e, a2, s5) {
  let { as: t6 = e, children: l4, refName: i4 = "ref", ...o5 } = h(n3, ["unmount", "static"]), y2 = n3.ref !== void 0 ? { [i4]: n3.ref } : {}, f3 = typeof l4 == "function" ? l4(r5) : l4;
  "className" in o5 && o5.className && typeof o5.className == "function" && (o5.className = o5.className(r5)), o5["aria-labelledby"] && o5["aria-labelledby"] === o5.id && (o5["aria-labelledby"] = void 0);
  let u4 = {};
  if (r5) {
    let d3 = false, p2 = [];
    for (let [c6, T2] of Object.entries(r5)) typeof T2 == "boolean" && (d3 = true), T2 === true && p2.push(c6.replace(/([A-Z])/g, (g) => `-${g.toLowerCase()}`));
    if (d3) {
      u4["data-headlessui-state"] = p2.join(" ");
      for (let c6 of p2) u4[`data-${c6}`] = "";
    }
  }
  if (b(t6) && (Object.keys(m(o5)).length > 0 || Object.keys(m(u4)).length > 0)) if (!k(f3) || Array.isArray(f3) && f3.length > 1 || D(f3)) {
    if (Object.keys(m(o5)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${a2} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(m(o5)).concat(Object.keys(m(u4))).map((d3) => `  - ${d3}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d3) => `  - ${d3}`).join(`
`)].join(`
`));
  } else {
    let d3 = f3.props, p2 = d3 == null ? void 0 : d3.className, c6 = typeof p2 == "function" ? (...R) => t3(p2(...R), o5.className) : t3(p2, o5.className), T2 = c6 ? { className: c6 } : {}, g = P(f3.props, m(h(o5, ["ref"])));
    for (let R in u4) R in g && delete u4[R];
    return v(f3, Object.assign({}, g, u4, y2, { ref: s5(H(f3), y2.ref) }, T2));
  }
  return S(t6, Object.assign({}, h(o5, ["ref"]), !b(t6) && y2, !b(t6) && u4), f3);
}
function $() {
  let n3 = M([]), r5 = x((e) => {
    for (let a2 of n3.current) a2 != null && (typeof a2 == "function" ? a2(e) : a2.current = e);
  }, []);
  return (...e) => {
    if (!e.every((a2) => a2 == null)) return n3.current = e, r5;
  };
}
function I(...n3) {
  return n3.every((r5) => r5 == null) ? void 0 : (r5) => {
    for (let e of n3) e != null && (typeof e == "function" ? e(r5) : e.current = r5);
  };
}
function P(...n3) {
  var a2;
  if (n3.length === 0) return {};
  if (n3.length === 1) return n3[0];
  let r5 = {}, e = {};
  for (let s5 of n3) for (let t6 in s5) t6.startsWith("on") && typeof s5[t6] == "function" ? ((a2 = e[t6]) != null || (e[t6] = []), e[t6].push(s5[t6])) : r5[t6] = s5[t6];
  if (r5.disabled || r5["aria-disabled"]) for (let s5 in e) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s5) && (e[s5] = [(t6) => {
    var l4;
    return (l4 = t6 == null ? void 0 : t6.preventDefault) == null ? void 0 : l4.call(t6);
  }]);
  for (let s5 in e) Object.assign(r5, { [s5](t6, ...l4) {
    let i4 = e[s5];
    for (let o5 of i4) {
      if ((t6 instanceof Event || (t6 == null ? void 0 : t6.nativeEvent) instanceof Event) && t6.defaultPrevented) return;
      o5(t6, ...l4);
    }
  } });
  return r5;
}
function Y(n3) {
  var r5;
  return Object.assign(w(n3), { displayName: (r5 = n3.displayName) != null ? r5 : n3.name });
}
function m(n3) {
  let r5 = Object.assign({}, n3);
  for (let e in r5) r5[e] === void 0 && delete r5[e];
  return r5;
}
function h(n3, r5 = []) {
  let e = Object.assign({}, n3);
  for (let a2 of r5) a2 in e && delete e[a2];
  return e;
}
function H(n3) {
  return E.version.split(".")[0] >= "19" ? n3.props.ref : n3.ref;
}
function b(n3) {
  return n3 === j || n3 === /* @__PURE__ */ Symbol.for("react.fragment");
}
function D(n3) {
  return b(n3.type);
}

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
import { useEffect as l, useRef as i2 } from "react";
var u2 = /* @__PURE__ */ Symbol();
function y(...t6) {
  let n3 = i2(t6);
  l(() => {
    n3.current = t6;
  }, [t6]);
  let c6 = o4((e) => {
    for (let o5 of n3.current) o5 != null && (typeof o5 == "function" ? o5(e) : o5.current = e);
  });
  return t6.every((e) => e == null || (e == null ? void 0 : e[u2])) ? void 0 : c6;
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
import { useRef as c3, useState as b3 } from "react";

// node_modules/@headlessui/react/dist/hooks/use-flags.js
import { useCallback as t4, useState as b2 } from "react";
function c2(u4 = 0) {
  let [r5, a2] = b2(u4), g = t4((e) => a2(e), []), s5 = t4((e) => a2((l4) => l4 | e), []), m2 = t4((e) => (r5 & e) === e, [r5]), n3 = t4((e) => a2((l4) => l4 & ~e), []), F2 = t4((e) => a2((l4) => l4 ^ e), []);
  return { flags: r5, setFlag: g, addFlag: s5, hasFlag: m2, removeFlag: n3, toggleFlag: F2 };
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
var T;
var S2;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((T = process == null ? void 0 : process.env) == null ? void 0 : T["NODE_ENV"]) === "test" && typeof ((S2 = Element == null ? void 0 : Element.prototype) == null ? void 0 : S2.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var A2 = ((i4) => (i4[i4.None = 0] = "None", i4[i4.Closed = 1] = "Closed", i4[i4.Enter = 2] = "Enter", i4[i4.Leave = 4] = "Leave", i4))(A2 || {});
function x2(e) {
  let r5 = {};
  for (let t6 in e) e[t6] === true && (r5[`data-${t6}`] = "");
  return r5;
}
function N(e, r5, t6, n3) {
  let [i4, a2] = b3(t6), { hasFlag: s5, addFlag: o5, removeFlag: l4 } = c2(e && i4 ? 3 : 0), u4 = c3(false), f3 = c3(false), E2 = p();
  return n(() => {
    var d3;
    if (e) {
      if (t6 && a2(true), !r5) {
        t6 && o5(3);
        return;
      }
      return (d3 = n3 == null ? void 0 : n3.start) == null || d3.call(n3, t6), C2(r5, { inFlight: u4, prepare() {
        f3.current ? f3.current = false : f3.current = u4.current, u4.current = true, !f3.current && (t6 ? (o5(3), l4(4)) : (o5(4), l4(2)));
      }, run() {
        f3.current ? t6 ? (l4(3), o5(4)) : (l4(4), o5(3)) : t6 ? l4(1) : o5(1);
      }, done() {
        var p2;
        f3.current && D2(r5) || (u4.current = false, l4(7), t6 || a2(false), (p2 = n3 == null ? void 0 : n3.end) == null || p2.call(n3, t6));
      } });
    }
  }, [e, t6, r5, E2]), e ? [i4, { closed: s5(1), enter: s5(2), leave: s5(4), transition: s5(2) || s5(4) }] : [t6, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function C2(e, { prepare: r5, run: t6, done: n3, inFlight: i4 }) {
  let a2 = o2();
  return j2(e, { prepare: r5, inFlight: i4 }), a2.nextFrame(() => {
    t6(), a2.requestAnimationFrame(() => {
      a2.add(M2(e, n3));
    });
  }), a2.dispose;
}
function M2(e, r5) {
  var a2, s5;
  let t6 = o2();
  if (!e) return t6.dispose;
  let n3 = false;
  t6.add(() => {
    n3 = true;
  });
  let i4 = (s5 = (a2 = e.getAnimations) == null ? void 0 : a2.call(e).filter((o5) => o5 instanceof CSSTransition)) != null ? s5 : [];
  return i4.length === 0 ? (r5(), t6.dispose) : (Promise.allSettled(i4.map((o5) => o5.finished)).then(() => {
    n3 || r5();
  }), t6.dispose);
}
function j2(e, { inFlight: r5, prepare: t6 }) {
  if (r5 != null && r5.current) {
    t6();
    return;
  }
  let n3 = e.style.transition;
  e.style.transition = "none", t6(), e.offsetHeight, e.style.transition = n3;
}
function D2(e) {
  var t6, n3;
  return ((n3 = (t6 = e.getAnimations) == null ? void 0 : t6.call(e)) != null ? n3 : []).some((i4) => i4 instanceof CSSTransition && i4.playState !== "finished");
}

// node_modules/@headlessui/react/dist/internal/open-closed.js
import r3, { createContext as l2, useContext as d2 } from "react";
var n2 = l2(null);
n2.displayName = "OpenClosedContext";
var i3 = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(i3 || {});
function u3() {
  return d2(n2);
}
function c4({ value: o5, children: t6 }) {
  return r3.createElement(n2.Provider, { value: o5 }, t6);
}

// node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
import * as t5 from "react";
function s4() {
  let r5 = typeof document == "undefined";
  return "useSyncExternalStore" in t5 ? ((o5) => o5.useSyncExternalStore)(t5)(() => () => {
  }, () => false, () => !r5) : false;
}
function l3() {
  let r5 = s4(), [e, n3] = t5.useState(s.isHandoffComplete);
  return e && s.isHandoffComplete === false && n3(false), t5.useEffect(() => {
    e !== true && n3(true);
  }, [e]), t5.useEffect(() => s.handoff(), []), r5 ? false : e;
}

// node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
import { useRef as r4 } from "react";
function f2() {
  let e = r4(false);
  return n(() => (e.current = true, () => {
    e.current = false;
  }), []), e;
}

// node_modules/@headlessui/react/dist/components/transition/transition.js
import c5, { Fragment as k2, createContext as ne, useContext as q, useEffect as ge, useMemo as ie, useRef as b4, useState as O } from "react";
function ue(e) {
  var t6;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !b((t6 = e.as) != null ? t6 : de) || c5.Children.count(e.children) === 1;
}
var V = ne(null);
V.displayName = "TransitionContext";
var De = ((n3) => (n3.Visible = "visible", n3.Hidden = "hidden", n3))(De || {});
function He() {
  let e = q(V);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Ae() {
  let e = q(w2);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
var w2 = ne(null);
w2.displayName = "NestingContext";
function M3(e) {
  return "children" in e ? M3(e.children) : e.current.filter(({ el: t6 }) => t6.current !== null).filter(({ state: t6 }) => t6 === "visible").length > 0;
}
function Te(e, t6) {
  let n3 = s3(e), l4 = b4([]), S3 = f2(), R = p(), d3 = o4((o5, i4 = C.Hidden) => {
    let a2 = l4.current.findIndex(({ el: s5 }) => s5 === o5);
    a2 !== -1 && (u(i4, { [C.Unmount]() {
      l4.current.splice(a2, 1);
    }, [C.Hidden]() {
      l4.current[a2].state = "hidden";
    } }), R.microTask(() => {
      var s5;
      !M3(l4) && S3.current && ((s5 = n3.current) == null || s5.call(n3));
    }));
  }), y2 = o4((o5) => {
    let i4 = l4.current.find(({ el: a2 }) => a2 === o5);
    return i4 ? i4.state !== "visible" && (i4.state = "visible") : l4.current.push({ el: o5, state: "visible" }), () => d3(o5, C.Unmount);
  }), C3 = b4([]), p2 = b4(Promise.resolve()), h2 = b4({ enter: [], leave: [] }), g = o4((o5, i4, a2) => {
    C3.current.splice(0), t6 && (t6.chains.current[i4] = t6.chains.current[i4].filter(([s5]) => s5 !== o5)), t6 == null || t6.chains.current[i4].push([o5, new Promise((s5) => {
      C3.current.push(s5);
    })]), t6 == null || t6.chains.current[i4].push([o5, new Promise((s5) => {
      Promise.all(h2.current[i4].map(([r5, f3]) => f3)).then(() => s5());
    })]), i4 === "enter" ? p2.current = p2.current.then(() => t6 == null ? void 0 : t6.wait.current).then(() => a2(i4)) : a2(i4);
  }), v2 = o4((o5, i4, a2) => {
    Promise.all(h2.current[i4].splice(0).map(([s5, r5]) => r5)).then(() => {
      var s5;
      (s5 = C3.current.shift()) == null || s5();
    }).then(() => a2(i4));
  });
  return ie(() => ({ children: l4, register: y2, unregister: d3, onStart: g, onStop: v2, wait: p2, chains: h2 }), [y2, d3, l4, g, v2, h2, p2]);
}
var de = k2;
var fe = A.RenderStrategy;
function Fe(e, t6) {
  var ee, te;
  let { transition: n3 = true, beforeEnter: l4, afterEnter: S3, beforeLeave: R, afterLeave: d3, enter: y2, enterFrom: C3, enterTo: p2, entered: h2, leave: g, leaveFrom: v2, leaveTo: o5, ...i4 } = e, [a2, s5] = O(null), r5 = b4(null), f3 = ue(e), U2 = y(...f3 ? [r5, t6, s5] : t6 === null ? [] : [t6]), H2 = (ee = i4.unmount) == null || ee ? C.Unmount : C.Hidden, { show: u4, appear: z, initial: K2 } = He(), [m2, j3] = O(u4 ? "visible" : "hidden"), Q = Ae(), { register: A3, unregister: F2 } = Q;
  n(() => A3(r5), [A3, r5]), n(() => {
    if (H2 === C.Hidden && r5.current) {
      if (u4 && m2 !== "visible") {
        j3("visible");
        return;
      }
      return u(m2, { ["hidden"]: () => F2(r5), ["visible"]: () => A3(r5) });
    }
  }, [m2, r5, A3, F2, u4, H2]);
  let G = l3();
  n(() => {
    if (f3 && G && m2 === "visible" && r5.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [r5, m2, G, f3]);
  let ce = K2 && !z, Y2 = z && u4 && K2, B = b4(false), I2 = Te(() => {
    B.current || (j3("hidden"), F2(r5));
  }, Q), Z = o4((W) => {
    B.current = true;
    let L = W ? "enter" : "leave";
    I2.onStart(r5, L, (_) => {
      _ === "enter" ? l4 == null || l4() : _ === "leave" && (R == null || R());
    });
  }), $2 = o4((W) => {
    let L = W ? "enter" : "leave";
    B.current = false, I2.onStop(r5, L, (_) => {
      _ === "enter" ? S3 == null || S3() : _ === "leave" && (d3 == null || d3());
    }), L === "leave" && !M3(I2) && (j3("hidden"), F2(r5));
  });
  ge(() => {
    f3 && n3 || (Z(u4), $2(u4));
  }, [u4, f3, n3]);
  let pe = /* @__PURE__ */ (() => !(!n3 || !f3 || !G || ce))(), [, T2] = N(pe, a2, u4, { start: Z, end: $2 }), Ce = m({ ref: U2, className: ((te = t3(i4.className, Y2 && y2, Y2 && C3, T2.enter && y2, T2.enter && T2.closed && C3, T2.enter && !T2.closed && p2, T2.leave && g, T2.leave && !T2.closed && v2, T2.leave && T2.closed && o5, !T2.transition && u4 && h2)) == null ? void 0 : te.trim()) || void 0, ...x2(T2) }), N2 = 0;
  m2 === "visible" && (N2 |= i3.Open), m2 === "hidden" && (N2 |= i3.Closed), u4 && m2 === "hidden" && (N2 |= i3.Opening), !u4 && m2 === "visible" && (N2 |= i3.Closing);
  let he = K();
  return c5.createElement(w2.Provider, { value: I2 }, c5.createElement(c4, { value: N2 }, he({ ourProps: Ce, theirProps: i4, defaultTag: de, features: fe, visible: m2 === "visible", name: "Transition.Child" })));
}
function Ie(e, t6) {
  let { show: n3, appear: l4 = false, unmount: S3 = true, ...R } = e, d3 = b4(null), y2 = ue(e), C3 = y(...y2 ? [d3, t6] : t6 === null ? [] : [t6]);
  l3();
  let p2 = u3();
  if (n3 === void 0 && p2 !== null && (n3 = (p2 & i3.Open) === i3.Open), n3 === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [h2, g] = O(n3 ? "visible" : "hidden"), v2 = Te(() => {
    n3 || g("hidden");
  }), [o5, i4] = O(true), a2 = b4([n3]);
  n(() => {
    o5 !== false && a2.current[a2.current.length - 1] !== n3 && (a2.current.push(n3), i4(false));
  }, [a2, n3]);
  let s5 = ie(() => ({ show: n3, appear: l4, initial: o5 }), [n3, l4, o5]);
  n(() => {
    n3 ? g("visible") : !M3(v2) && d3.current !== null && g("hidden");
  }, [n3, v2]);
  let r5 = { unmount: S3 }, f3 = o4(() => {
    var u4;
    o5 && i4(false), (u4 = e.beforeEnter) == null || u4.call(e);
  }), U2 = o4(() => {
    var u4;
    o5 && i4(false), (u4 = e.beforeLeave) == null || u4.call(e);
  }), H2 = K();
  return c5.createElement(w2.Provider, { value: v2 }, c5.createElement(V.Provider, { value: s5 }, H2({ ourProps: { ...r5, as: k2, children: c5.createElement(me, { ref: C3, ...r5, ...R, beforeEnter: f3, beforeLeave: U2 }) }, theirProps: {}, defaultTag: k2, features: fe, visible: h2 === "visible", name: "Transition" })));
}
function Le(e, t6) {
  let n3 = q(V) !== null, l4 = u3() !== null;
  return c5.createElement(c5.Fragment, null, !n3 && l4 ? c5.createElement(X, { ref: t6, ...e }) : c5.createElement(me, { ref: t6, ...e }));
}
var X = Y(Ie);
var me = Y(Fe);
var Oe = Y(Le);
var Ke = Object.assign(X, { Child: Oe, Root: X });

// node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js
import * as React from "react";
function CheckCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
var ForwardRef = /* @__PURE__ */ React.forwardRef(CheckCircleIcon);
var CheckCircleIcon_default = ForwardRef;

// node_modules/@heroicons/react/24/outline/esm/ExclamationCircleIcon.js
import * as React2 from "react";
function ExclamationCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React2.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React2.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React2.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
  }));
}
var ForwardRef2 = /* @__PURE__ */ React2.forwardRef(ExclamationCircleIcon);
var ExclamationCircleIcon_default = ForwardRef2;

// node_modules/@heroicons/react/24/outline/esm/ExclamationTriangleIcon.js
import * as React3 from "react";
function ExclamationTriangleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React3.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React3.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React3.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
var ForwardRef3 = /* @__PURE__ */ React3.forwardRef(ExclamationTriangleIcon);
var ExclamationTriangleIcon_default = ForwardRef3;

// node_modules/@heroicons/react/24/outline/esm/InformationCircleIcon.js
import * as React4 from "react";
function InformationCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React4.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React4.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React4.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
var ForwardRef4 = /* @__PURE__ */ React4.forwardRef(InformationCircleIcon);
var InformationCircleIcon_default = ForwardRef4;

// node_modules/@heroicons/react/20/solid/esm/XMarkIcon.js
import * as React5 from "react";
function XMarkIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React5.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React5.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React5.createElement("path", {
    d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
  }));
}
var ForwardRef5 = /* @__PURE__ */ React5.forwardRef(XMarkIcon);
var XMarkIcon_default = ForwardRef5;

// src/Toast.jsx
import { createPortal } from "react-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Toast = ({
  open,
  setOpen,
  content,
  setContent,
  buttonClickHandler,
  duration = 4e3,
  children,
  ...props
}) => {
  useEffect2(() => {
    if (!open) return;
    const shouldAutoClose = typeof duration === "number" && Number.isFinite(duration) && duration > 0;
    if (!shouldAutoClose) return;
    const timer = setTimeout(() => {
      setContent(null);
      setOpen(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, setContent, setOpen]);
  const getRingClass = () => {
    switch (content == null ? void 0 : content.type) {
      case "error":
        return "ring-red-700 dark:ring-red-300";
      case "warning":
        return "ring-yellow-700 dark:ring-yellow-300";
      case "info":
        return "ring-blue-700 dark:ring-blue-300";
      case "success":
        return "ring-green-700 dark:ring-green-300";
      default:
        return "";
    }
  };
  return createPortal(
    /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 flex items-end px-4 py-6 z-[99999]", children: /* @__PURE__ */ jsx("div", { className: "flex w-full max-h-full flex-col items-center space-y-4", children: /* @__PURE__ */ jsx(Ke, { show: open, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx_default(
          "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-900 ring-1 shadow-lg dark:shadow-gray-700 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0",
          getRingClass()
        ),
        children: /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: {
            error: /* @__PURE__ */ jsx(
              ExclamationTriangleIcon_default,
              {
                "aria-hidden": "true",
                className: "size-6 text-red-400 dark:text-red-600"
              }
            ),
            warning: /* @__PURE__ */ jsx(
              ExclamationCircleIcon_default,
              {
                "aria-hidden": "true",
                className: "size-6 text-yellow-400 dark:text-yellow-600"
              }
            ),
            info: /* @__PURE__ */ jsx(
              InformationCircleIcon_default,
              {
                "aria-hidden": "true",
                className: "size-6 text-blue-400 dark:text-blue-600"
              }
            ),
            success: /* @__PURE__ */ jsx(
              CheckCircleIcon_default,
              {
                "aria-hidden": "true",
                className: "size-6 text-green-400 dark:text-green-600"
              }
            )
          }[content == null ? void 0 : content.type] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3 w-0 flex-1 pt-0.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-gray-50", children: content == null ? void 0 : content.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: content == null ? void 0 : content.subtitle })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ml-4 flex shrink-0", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setContent(null);
                setOpen(false);
              },
              className: "cursor-pointer inline-flex rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" }),
                /* @__PURE__ */ jsx(XMarkIcon_default, { "aria-hidden": "true", className: "size-5" })
              ]
            }
          ) })
        ] }) })
      }
    ) }) }) }) }),
    document.body
  );
};

// src/ToastContext.jsx
import { createContext, useContext } from "react";

// src/useToastState.js
import { useCallback, useMemo, useState as useState2 } from "react";
var useToastState = (options = {}) => {
  const { duration: defaultDuration = 4e3 } = options;
  const [open, setOpen] = useState2(false);
  const [content, setContent] = useState2(null);
  const [duration, setDuration] = useState2(defaultDuration);
  const showToast = useCallback(
    (nextContent, overrides = {}) => {
      if (!nextContent) return;
      const nextDuration = Object.prototype.hasOwnProperty.call(overrides, "duration") ? overrides.duration : defaultDuration;
      setDuration(nextDuration);
      setContent(nextContent);
      setOpen(true);
    },
    [defaultDuration]
  );
  const closeToast = useCallback(() => {
    setOpen(false);
    setContent(null);
  }, []);
  const toastProps = useMemo(
    () => ({
      open,
      setOpen,
      content,
      setContent,
      duration
    }),
    [open, content, duration]
  );
  return {
    open,
    setOpen,
    content,
    setContent,
    duration,
    setDuration,
    showToast,
    closeToast,
    toastProps
  };
};

// src/ToastContext.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ToastContext = createContext(null);
var ToastProvider = ({ children, duration = 4e3 }) => {
  const toast = useToastState({ duration });
  return /* @__PURE__ */ jsx2(ToastContext.Provider, { value: toast, children });
};
var useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
var ToastViewport = (props) => {
  const { toastProps } = useToast();
  return /* @__PURE__ */ jsx2(Toast, { ...toastProps, ...props });
};
export {
  Toast,
  ToastProvider,
  ToastViewport,
  useToast,
  useToastState
};
//# sourceMappingURL=index.js.map
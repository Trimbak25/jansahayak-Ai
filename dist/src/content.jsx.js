import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content.jsx.js");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const ReactDOM = __vite__cjsImport1_reactDom_client;const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--3836866d.js";
import __vite__cjsImport1_reactDom_client from "/vendor/.vite-deps-react-dom_client.js__v--7680e05b.js";
import { ShieldCheck, X } from "/vendor/.vite-deps-lucide-react.js__v--7bb5a13d.js";
import "/src/content.css.js";
var _jsxFileName = "D:/Trimbak/VOICE/src/content.jsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--3836866d.js";
var _s = $RefreshSig$();
const FloatingHelper = () => {
	_s();
	const [isOpen, setIsOpen] = useState(false);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "jansahayak-floating-container",
		children: [isOpen && /* @__PURE__ */ _jsxDEV("div", {
			className: "jansahayak-tooltip",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "jansahayak-tooltip-header",
				children: [
					/* @__PURE__ */ _jsxDEV(ShieldCheck, {
						size: 18,
						color: "#000080"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 14,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("span", { children: "JanSahayak AI" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 15,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => setIsOpen(false),
						className: "jansahayak-close-btn",
						children: /* @__PURE__ */ _jsxDEV(X, { size: 16 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 17,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 11
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "jansahayak-tooltip-body",
				children: /* @__PURE__ */ _jsxDEV("p", { children: "Need help filling out this form? Open the JanSahayak extension to get step-by-step voice assistance!" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 12,
			columnNumber: 9
		}, this), /* @__PURE__ */ _jsxDEV("button", {
			className: "jansahayak-floating-btn",
			onClick: () => setIsOpen(!isOpen),
			children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, {
				size: 24,
				color: "#fff"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("span", {
				className: "jansahayak-btn-text",
				children: "Need Help?"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 10,
		columnNumber: 5
	}, this);
};
_s(FloatingHelper, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = FloatingHelper;
// Inject into DOM
const injectRoot = document.createElement("div");
injectRoot.id = "jansahayak-extension-root";
document.body.appendChild(injectRoot);
ReactDOM.createRoot(injectRoot).render(/* @__PURE__ */ _jsxDEV(React.StrictMode, { children: /* @__PURE__ */ _jsxDEV(FloatingHelper, {}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 43,
	columnNumber: 5
}, this) }, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 42,
	columnNumber: 3
}, this));
var _c;
$RefreshReg$(_c, "FloatingHelper");
import * as RefreshRuntime from "/vendor/react-refresh.js";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/content.jsx.js";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("D:/Trimbak/VOICE/src/content.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("D:/Trimbak/VOICE/src/content.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "D:/Trimbak/VOICE/src/content.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

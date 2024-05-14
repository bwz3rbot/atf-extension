import React from "react";
import ReactDOM from "react-dom/client";
export default function injectReactComponent(rootEl, ReactComponent) {
	ReactDOM.createRoot(rootEl).render(ReactComponent);
}

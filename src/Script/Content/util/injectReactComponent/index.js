import React from "react";
import ReactDOM from "react-dom/client";
export default function injectReactComponent(element, ReactComponent) {
	const root = ReactDOM.createRoot(element).render(ReactComponent);
}

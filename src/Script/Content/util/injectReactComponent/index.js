import React from "react";
import ReactDOM from "react-dom/client";
const createUUID = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0,
				v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
};

export default function injectReactComponent(ReactComponent, props, element) {
	const id = `react-component-${createUUID()}`;
	const rootNode = document.createElement("div");
	rootNode.id = id;

	element.appendChild(rootNode);
	ReactDOM.createRoot(document.getElementById(id)).render(
		<ReactComponent {...props} />
	);
}

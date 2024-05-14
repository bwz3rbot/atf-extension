import React from "react";
import ReactDOM from "react-dom";
export default function injectReactComponent(element, ReactComponent) {
	ReactDOM.render(ReactComponent, element);
}

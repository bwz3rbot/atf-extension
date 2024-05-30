// ONLY USE THIS FUNCTION ONCE
export default function routeChangeListener(onChange) {
	// Override history methods to detect URL changes
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;

	history.pushState = function () {
		originalPushState.apply(this, arguments);
		window.dispatchEvent(new Event("pushState"));
	};

	history.replaceState = function () {
		originalReplaceState.apply(this, arguments);
		window.dispatchEvent(new Event("replaceState"));
	};

	// Event listeners for history changes
	window.addEventListener("popstate", onChange);
	window.addEventListener("pushState", onChange);
	window.addEventListener("replaceState", onChange);

	// Initial URL setup
	let currentURL = location.href;

	// MutationObserver to detect manual URL changes
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (location.href === currentURL) return;
			currentURL = location.href;
			onChange();
		});
	});

	// Start observing the document body
	const config = { childList: true, subtree: true };
	observer.observe(document.body, config);
}

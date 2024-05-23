export default function waitForUIChanges(targetNode, timeout = 3000) {
	// observe the target node for changes. once the node has stopped changing for the timeout period, resolve the promise
	return new Promise(resolve => {
		let changesDetected = false;
		const observer = new MutationObserver(() => {
			changesDetected = true;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				observer.disconnect();
				resolve();
			}, timeout);
		});

		let timeoutId = setTimeout(() => {
			if (changesDetected) return;
			observer.disconnect();
			resolve();
		}, timeout);

		observer.observe(targetNode, {
			childList: true,
			subtree: true,
			attributes: true,
			characterData: true,
		});
	});
}

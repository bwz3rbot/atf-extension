// listen for messages from the content script
console.log("background script running");

chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse,
	...other
) {
	if (request.type === "SIGN_CONNECT") return; // this is handled by the extension reload script
	console.log("got message in background script", {
		request,
		sender,
		sendResponse,
		other,
	});

	if (request.message === "hide-users") {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					message: "hide-users",
					users: request.users,
				});
			}
		);
	}
	if (request.message === "add-to-queue") {
		// add the recipe to the queue
		console.log("adding recipe to queue", request);
		// add to storage
		const queue = await new Promise(resolve => {
			chrome.storage.local.get("queue", data => {
				resolve(data?.queue || []);
			});
		});
		console.log("got queue from storage", queue);
		const newQueue = [...queue, request];
		console.log("newQueue", newQueue);
		chrome.storage.local.set({ queue: newQueue }, () => {
			console.log("set queue to", newQueue);
		});
	}
});

// when the tab first loads, send a message to the content script
chrome.tabs.onActivated.addListener(function (activeInfo) {
	console.log("tab activated", activeInfo);
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		console.log("tab", tab);
		if (!tab.url.includes("alltheflavors")) return;
		const url = new URL(tab.url);
		chrome.tabs.sendMessage(tab.id, {
			message: { pathname: url.pathname },
		});
	});
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// read changeInfo data and do something with it
	// like send the new url to contentscripts.js
	console.log("changeInfo", changeInfo);
	console.log("tab", tab);
	if (!tab.url.includes("alltheflavors")) return;
	const url = new URL(tab.url);
	chrome.tabs.sendMessage(tabId, {
		message: { pathname: url.pathname },
	});
});

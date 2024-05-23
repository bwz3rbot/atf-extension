// listen for messages from the content script
console.log("background script running");
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
	if (!details.url.includes("alltheflavors")) return;
	const url = new URL(details.url);
	console.log("onDOMContentLoaded", {
		details,
		url,
	});

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
	});

	// when the tab first loads, send a message to the content script

	chrome.tabs.onCreated.addListener(function (tab) {
		if (!tab.url.includes("alltheflavors")) return;

		console.log("tab created", tab);

		chrome.tabs
			.sendMessage(tab.id, {
				url: tab.url,
			})
			.catch(err => {
				console.error("error sending message", err);
			});
	});

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (!tab.url.includes("alltheflavors")) return;
		if (tab.status !== "complete") return;
		console.log("changeInfo", changeInfo);
		console.log("tab", tab);
		chrome.tabs
			.sendMessage(tabId, {
				url: tab.url,
			})
			.catch(err => {
				console.error("error sending message", err);
			});
	});
});

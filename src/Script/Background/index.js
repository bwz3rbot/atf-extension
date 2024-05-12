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
	// await sendResponse({
	// 	message: "Sent response from background",
	// });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// read changeInfo data and do something with it
	// like send the new url to contentscripts.js
	if (changeInfo.url) {
		console.log("changeInfo.url", changeInfo.url);
		chrome.tabs.sendMessage(tabId, {
			message: "hide-users",
		});
	}
});

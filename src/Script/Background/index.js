chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
	if (!details.url.includes("alltheflavors")) return;
	chrome.runtime.onMessage.addListener(async function (
		request,
		sender,
		sendResponse,
		...other
	) {
		if (request.type === "SIGN_CONNECT") return; // this is handled by the extension reload script
	});
});

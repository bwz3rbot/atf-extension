import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
// listen from message from popup
chrome.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	console.log("got message in content script", {
		request,
		sender,
	});
	if (request.message === "/recipe") {
		await handleHideUsers();
		await handleAddMixQueueButtons();
	}
	if (request.message === "hide-users") await handleHideUsers();
});

import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
import { debounce } from "lodash";

console.log("content script loaded...");

const handleHideUsersDebounced = debounce(handleHideUsers, 1000);
const handleAddMixQueueButtonsDebounced = debounce(
	handleAddMixQueueButtons,
	1000
);

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
		await handleHideUsersDebounced();
		await handleAddMixQueueButtonsDebounced();
	}
	if (request.message === "hide-users") await handleHideUsersDebounced();
});

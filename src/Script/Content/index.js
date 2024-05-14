import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
import { debounce } from "lodash";
import waitForLoaded from "./util/waitForLoaded";

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
	await waitForLoaded();

	switch (request.message?.pathname) {
		case "/recipe":
			await handleHideUsersDebounced();
			await handleAddMixQueueButtonsDebounced();
			break;
	}

	if (request.message === "hide-users") await handleHideUsersDebounced();
});

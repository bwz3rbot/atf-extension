import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
import { debounce } from "lodash";
import waitForLoaded from "./util/waitForLoaded";
const text = `
_______  ______    ___   __    _  ___   _ 
|       ||    _ |  |   | |  |  | ||   | | |
|    ___||   | ||  |   | |   |_| ||   |_| |
|   |___ |   |_||_ |   | |       ||      _|
|    ___||    __  ||   | |  _    ||     |_ 
|   |    |   |  | ||   | | | |   ||    _  |
|___|    |___|  |_||___| |_|  |__||___| |_|
`;
console.log(text);
console.log(`https://alltheflavors.com/mixers/Frink`);
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
	await waitForLoaded();
	switch (request.message?.pathname) {
		case "/recipe":
			await handleHideUsersDebounced();
			await handleAddMixQueueButtonsDebounced();
			break;
	}
	if (request.message === "hide-users") await handleHideUsersDebounced();
});

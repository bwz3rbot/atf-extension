import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
import { debounce } from "lodash";
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

const handleHideUsersDebounced = debounce(handleHideUsers, 1000, {
	trailing: true,
});
const handleAddMixQueueButtonsDebounced = debounce(
	handleAddMixQueueButtons,
	1000,
	{
		trailing: true,
	}
);

const handleURL = async _url => {
	const url = new URL(_url);
	switch (url.pathname) {
		case "/recipe":
			await handleHideUsersDebounced();
			await handleAddMixQueueButtonsDebounced();
			break;
	}
};
const handleURLDebounced = debounce(handleURL, 1000, {
	trailing: true,
});
window.addEventListener("load", async () => {
	handleURLDebounced(window.location.href);
	chrome.runtime.onMessage.addListener(async function (
		request,
		sender,
		sendResponse
	) {
		if (request.url) handleURLDebounced(request.url);
		if (request.message === "hide-users") handleHideUsersDebounced();
	});
});

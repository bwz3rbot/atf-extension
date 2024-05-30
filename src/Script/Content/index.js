import handleAddMixQueueButtons from "./handleAddMixQueueButtons";
import handleHideUsers from "./handleHideUsers";
import { debounce } from "lodash";
import routeChangeListener from "./routeChangeListener";

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

const handleRoutechange = async location => {
	switch (location.pathname) {
		case "/recipe":
		case "/recipe/flavorSearch":
		case "/user/recipes":
			await handleHideUsersDebounced();
			await handleAddMixQueueButtonsDebounced();
			break;
	}

	// mixer page
	if (/\/mixers\/[a-zA-Z0-9]+/.test(location.pathname)) {
		await handleAddMixQueueButtonsDebounced();
	}

	// flavor page
	if (/\/flavor\/[a-zA-Z0-9]+/.test(location.pathname)) {
		await handleAddMixQueueButtonsDebounced();
		await handleHideUsersDebounced();
	}
};
const handleRouteChangeDebounced = debounce(handleRoutechange, 1000, {
	trailing: true,
});
window.addEventListener("load", () => {
	handleRouteChangeDebounced(location);
	routeChangeListener(() => handleRouteChangeDebounced(location));
	chrome.runtime.onMessage.addListener(async function (
		request,
		sender,
		sendResponse
	) {
		if (request.message === "hide-users") handleHideUsersDebounced();
	});
});

// send message to the background script

(async () => {
	// const res = await chrome.runtime.sendMessage({
	// 	message: "Sent message from content script",
	// });
	// console.log("got response from background script", res);

	// get the users from storage
	const getUsers = async () => {
		const users = await new Promise(resolve => {
			chrome.storage.local.get("hidden-users", resolve);
		});
		return users["hidden-users"];
	};
	const loaded = await new Promise(resolve => {
		window.addEventListener("load", resolve);
	});

	const waitForLoaded = async () => {
		do {
			await new Promise(resolve => {
				setTimeout(resolve, 1000);
			});
		} while (!loaded);
		return true;
	};
	const handleHideUsers = async () => {
		console.log("handling hide users...");
		const users = await getUsers();
		console.log("users", users);

		await waitForLoaded();

		// wait for page to load

		const findRecipeList = () => {
			const ul = document.querySelectorAll("ul");
			const recipeList = ul[1];

			// find the div

			const recipeListInner = recipeList.querySelector("div");
			// find the list items
			const recipeListItems = recipeListInner.querySelectorAll("div");
			// iterate the list items
			return recipeListItems;
		};
		let items;
		do {
			items = findRecipeList();
			if (!items.length) {
				await new Promise(resolve => {
					setTimeout(resolve, 1000);
				});
			}
		} while (!items.length);

		// find the author by finding the first span with classname = 'MuiTypography-body2'
		for (const item of items) {
			const author = item.querySelector(
				"span.MuiTypography-body2"
			)?.innerText;
			const authorName = author?.split("by ")[1];
			if (!authorName) continue;
			const shouldHide = users.includes(authorName);
			if (!shouldHide) continue;
			// hide the element
			console.log("hiding recipe from author: ", authorName);
			item.style.display = "none";
		}
	};

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
		if (request.message === "hide-users") await handleHideUsers();
	});

	await handleHideUsers();
})();

// send message to the background script

(async () => {
	console.log("content script loaded...");
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

	const findRecipeList = async () => {
		console.log("finding recipe list...");
		const _findRecipeList = () => {
			const ul = document.querySelectorAll("ul");
			const recipeList = ul[1];

			// find the div

			const recipeListInner = recipeList.querySelector("div");
			// get a list of all the first children
			const recipeListItems = Array.from(recipeListInner.children);
			// iterate the list items
			return recipeListItems;
		};
		let items;
		do {
			items = _findRecipeList();
			if (!items.length) {
				await new Promise(resolve => {
					setTimeout(resolve, 1000);
				});
			}
		} while (!items.length);
		return items;
	};
	const handleHideUsers = async () => {
		console.log("handling hide users...");
		const url = new URL(window.location.href);

		if (url.pathname !== "/recipe") {
			console.log("not on recipe page");
			return;
		}
		await waitForLoaded();
		const recipeList = await findRecipeList();
		const users = await getUsers();
		console.log("users", users);

		// wait for page to load

		// find the author by finding the first span with classname = 'MuiTypography-body2'
		for (const item of recipeList) {
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

	const handleAddMixQueueButtons = async () => {
		console.log("handling add mix queue buttons...");

		const url = new URL(window.location.href);
		await waitForLoaded();

		if (url.pathname !== "/recipe") {
			console.log("not on recipe page");
			return;
		}
		const recipeList = await findRecipeList();

		for (const item of recipeList) {
			const addToQueueButtonExists =
				item.querySelector(".addToQueueButton");
			if (addToQueueButtonExists) return;
			const titleElement = item.querySelector("span.MuiTypography-h4");
			const linkElement = titleElement.querySelector("a");

			const title = titleElement.innerText;
			const href = linkElement.getAttribute("href");

			const addToQueueButton = document.createElement("button");
			addToQueueButton.className = "addToQueueButton";
			addToQueueButton.onclick = async () => {
				const res = await chrome.runtime.sendMessage({
					message: "add-to-queue",
					title,
					href,
				});
				console.log("got response from background script", res);
			};
			addToQueueButton.innerText = "Add to Queue";
			// find a span with clasName = 'MuiTypography-h4'
			titleElement.prepend(addToQueueButton);
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
		if (request.message === "/recipe") {
			await handleHideUsers();
			await handleAddMixQueueButtons();
		}
	});
})();

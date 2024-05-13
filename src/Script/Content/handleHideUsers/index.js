import waitForLoaded from "../util/waitForLoaded";
import findRecipeList from "../util/findRecipeList";
import getUsers from "../util/getUsers";

export default async function handleHideUsers() {
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
}

import findRecipeList from "../util/findRecipeList";
import waitForLoaded from "../util/waitForLoaded";
import injectReactComponent from "../util/injectReactComponent";
import EnqueueButton from "./EnqueueButton";
export const getQueue = async () =>
	new Promise(resolve => {
		chrome.storage.local.get("queue", res => {
			resolve(res.queue || []);
		});
	});
export const getIsInQueue = (queue, recipe) =>
	queue.some(r => r.href === recipe.href);

export default async function handleAddMixQueueButtons() {
	console.log("handling add mix queue buttons...");

	const url = new URL(window.location.href);
	await waitForLoaded();

	if (url.pathname !== "/recipe") {
		console.log("not on recipe page");
		return;
	}
	const recipeList = await findRecipeList();
	const getQueue = async () =>
		await new Promise(resolve => {
			chrome.storage.local.get("queue", res => {
				resolve(res.queue || []);
			});
		});

	const queue = await getQueue();
	for (const item of recipeList) {
		const enqueueButtonExists = item.querySelector(".enqueueButton");
		if (enqueueButtonExists) return;
		const titleElement = item.querySelector("span.MuiTypography-h4");
		const linkElement = titleElement.querySelector("a");
		const authorElement = item.querySelector("span.MuiTypography-body2");
		console.log("creating recipe object..");

		const recipe = {
			title: titleElement.innerText,
			href: linkElement.getAttribute("href"),
			author: authorElement.innerText.split("by ")[1],
		};

		const prepend = document.createElement("span");
		prepend.innerText = " ";
		titleElement.prepend(prepend);

		injectReactComponent(
			EnqueueButton,
			{ queue, recipe, getQueue },
			prepend
		);
	}
}

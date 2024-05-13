import findRecipeList from "../util/findRecipeList";
import waitForLoaded from "../util/waitForLoaded";
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

		const title = titleElement.innerText;
		const href = linkElement.getAttribute("href");
		const getIsInQueue = queue =>
			queue.some(recipe => recipe.href === href);

		const enqueueButton = document.createElement("button");
		enqueueButton.className = "enqueueButton";
		enqueueButton.onclick = async () => {
			let queue = await getQueue();
			const isInQueue = getIsInQueue(queue);
			const recipe = { title, href };
			if (isInQueue) {
				queue = queue.filter(r => r.href !== href);
			} else {
				queue.push(recipe);
			}
			chrome.storage.local.set({ queue }, () => {
				console.log("added to queue", recipe);
				enqueueButton.innerText = isInQueue
					? "Add to Queue"
					: "In Queue";
			});
		};
		const isInQueue = getIsInQueue(queue);

		// TODO: get queue from storage and update the innerText of the button if the recipe is already in the queue
		enqueueButton.innerText = isInQueue ? "In Queue" : "Add to Queue";
		// find a span with clasName = 'MuiTypography-h4'
		titleElement.prepend(enqueueButton);
	}
}

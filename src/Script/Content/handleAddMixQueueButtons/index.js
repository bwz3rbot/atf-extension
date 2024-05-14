import findRecipeList from "../util/findRecipeList";
import injectReactComponent from "../util/injectReactComponent";
import EnqueueButton from "./EnqueueButton";
import sleep from "../util/sleep";
export const getQueue = async () =>
	new Promise(resolve => {
		chrome.storage.local.get("queue", res => {
			resolve(res.queue || []);
		});
	});
export default async function handleAddMixQueueButtons() {
	const recipeList = await findRecipeList();
	const queue = await getQueue();
	/* 
	attempt to fix:
	DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
	*/
	await sleep(1000);
	for (const item of recipeList) {
		const enqueueButtonExists = item.querySelector(".enqueueButton");
		if (enqueueButtonExists) return;
		const titleElement = item.querySelector("span.MuiTypography-h4");
		const linkElement = item.querySelector("a");
		const authorElement = item.querySelector("span.MuiTypography-body2");

		const recipe = {
			title: titleElement.innerText,
			href: linkElement.getAttribute("href"),
			author: authorElement.innerText.split("by ")[1],
		};

		const prependElement = document.createElement("span");
		prependElement.innerText = " ";
		titleElement.prepend(prependElement);

		titleElement.style.display = "flex";
		titleElement.style.flexDirection = "row";
		titleElement.style.alignItems = "center";

		injectReactComponent(
			prependElement,
			<EnqueueButton queue={queue} recipe={recipe} />
		);
	}
}

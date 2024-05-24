import findRecipeList from "../util/findRecipeList";
import injectReactComponent from "../util/injectReactComponent";
import EnqueueButton from "./EnqueueButton";
export const getQueue = async () =>
	new Promise(resolve => {
		chrome.storage.local.get("queue", res => {
			resolve(res.queue || []);
		});
	});
export default async function handleAddMixQueueButtons() {
	const recipeList = await findRecipeList();
	const queue = await getQueue();

	for (const item of recipeList) {
		const enqueueButtonExists = item.querySelector(".enqueueButton");
		if (enqueueButtonExists) continue;
		const titleElement = item.querySelector("span.MuiTypography-h4");
		const linkElement = item.querySelector("a");
		const authorElement = item.querySelector("span.MuiTypography-body2");

		const recipe = {
			title: titleElement.innerText,
			href: linkElement.getAttribute("href"),
			author: authorElement.innerText.split("by ")[1],
		};

		const prependElement = document.createElement("span");

		const titleParentEl = titleElement.parentElement;
		titleParentEl.insertBefore(prependElement, titleParentEl.firstChild);

		titleParentEl.style.display = "flex";
		titleParentEl.style.flexDirection = "row";
		titleParentEl.style.alignItems = "center";

		injectReactComponent(
			prependElement,
			<EnqueueButton queue={queue} recipe={recipe} />
		);
	}
}

import waitForUIChanges from "../waitForUIChanges";
export default async function findRecipeList(timeout = 3000) {
	const recipeList = document.querySelectorAll("ul")[1];
	await waitForUIChanges(recipeList, timeout);
	return Array.from(recipeList.querySelector("div").children);
}

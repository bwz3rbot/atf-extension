import waitForUIChanges from "../waitForUIChanges";
export default async function findRecipeList() {
	const ul = document.querySelectorAll("ul");
	const recipeList = ul[1];

	await waitForUIChanges(recipeList, 3000);

	const recipeListInner = recipeList.querySelector("div");
	// get a list of all the first children
	const recipeListItems = Array.from(recipeListInner.children);
	// iterate the list items
	return recipeListItems;
}

export default async function findRecipeList() {
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
}

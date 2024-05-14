const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

export default async function findRecipeList() {
	let retries = 0;
	const RETRY_LIMIT = 5;
	const handleRetryFindRecipeList = async () => {
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
			if (!items.length) await sleep(1000);
		} while (!items.length);

		console.log("found recipe list", items.length);
		// try finding the title

		if (!items[0].querySelector("span.MuiTypography-h4")) {
			await sleep(3000);
			retries++;
			if (retries >= RETRY_LIMIT) return [];
			return handleRetryFindRecipeList();
		}
		return items;
	};

	return handleRetryFindRecipeList();
}

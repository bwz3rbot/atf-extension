export default async function waitForLoaded() {
	return new Promise(resolve => {
		window.addEventListener("load", () => {
			console.log("loaded");
			resolve(true);
		});
		if (document.readyState === "complete") {
			console.log("readyState complete");
			resolve(true);
		}
	});
}

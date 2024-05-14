export default async function waitForLoaded() {
	return new Promise(resolve => {
		window.addEventListener("load", () => {
			resolve(true);
		});
		if (document.readyState === "complete") {
			resolve(true);
		}
	});
}

export default async function waitForSelector({
	timeout = 5000,
	rootElement = document,
	selector,
}) {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			const element = rootElement.querySelector(selector);
			if (element) {
				clearInterval(interval);
				resolve(element);
			}
		}, 100);
		setTimeout(() => {
			clearInterval(interval);
			reject(new Error(`Timed out waiting for selector ${selector}`));
		}, timeout);
	});
}

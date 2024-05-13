const loaded = await new Promise(resolve => {
	window.addEventListener("load", resolve);
});

const waitForLoaded = async () => {
	do {
		await new Promise(resolve => {
			setTimeout(resolve, 1000);
		});
	} while (!loaded);
	return true;
};

export default waitForLoaded;

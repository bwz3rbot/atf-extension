export default async function getUsers() {
	const users = await new Promise(resolve => {
		chrome.storage.local.get("hidden-users", resolve);
	});
	return users["hidden-users"] || [];
}

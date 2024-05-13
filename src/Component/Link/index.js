export default function Link({ url, text }) {
	return (
		<button
			style={{
				// make it like an anchor tag
				background: "none",
				border: "none",
				color: "#1CE0FE",
				cursor: "pointer",
			}}
			onClick={() => {
				// open the link in the current tab
				chrome.tabs.create({
					url,
				});
			}}
		>
			{text}
		</button>
	);
}

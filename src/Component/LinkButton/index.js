export default function LinkButton({ url, text }) {
	return (
		<button
			style={{
				// make it like an anchor tag
				background: "none",
				border: "none",
				color: "blue",
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

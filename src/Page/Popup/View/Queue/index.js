import { Typography, Box } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
import { useValueStore } from "@/Context/Storage";
export default function QueueView() {
	const [queue, setQueue, { loading, error }] = useValueStore("queue", []);
	console.log({ queue });

	return (
		<Box>
			<Heading text="Recipe Queue" />
			{queue.map((recipe, index) => (
				<Box key={index}>
					<Body>
						<button
							onClick={() => {
								const newQueue = queue.filter(
									(_, i) => i !== index
								);
								setQueue(newQueue);
							}}
						>
							remove
						</button>
						<button
							style={{
								background: "none",
								border: "none",
								color: "blue",
								textDecoration: "underline",
								cursor: "pointer",
							}}
							onClick={() => {
								chrome.tabs.update({
									url: `https://alltheflavors.com${recipe.href}`,
								});
							}}
						>
							{recipe.title}
						</button>
					</Body>
				</Box>
			))}
		</Box>
	);
}

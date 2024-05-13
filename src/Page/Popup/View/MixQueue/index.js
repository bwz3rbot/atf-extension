import { Typography, Box } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
import Link from "@/Component/Link";
import { useValueStore } from "@/Context/Storage";
import Button from "@Component/Button";
import ClearIcon from "@mui/icons-material/Clear";

export default function MixQueueView() {
	const [queue, setQueue, { loading, error }] = useValueStore("queue", []);
	console.log({ queue });

	return (
		<Box>
			<Heading text="Mix Queue" />
			{queue.map((recipe, index) => (
				<Box key={index}>
					<Body>
						<Button
							text="remove"
							Icon={<ClearIcon />}
							onClick={() => {
								const newQueue = queue.filter(
									(_, i) => i !== index
								);
								setQueue(newQueue);
							}}
						/>
						<Link
							text={recipe.title}
							url={`https://alltheflavors.com${recipe.href}`}
						/>
					</Body>
				</Box>
			))}
		</Box>
	);
}

import { useValueStore } from "@/Context/Storage";

import { Stack, Box } from "@mui/material";
import Heading from "@Component/Heading";

import Body from "@Component/Body";
import Link from "@/Component/Link";
import Button from "@Component/Button";
import ClearIcon from "@mui/icons-material/Clear";

export default function MixQueueView() {
	const [queue, setQueue, { loading, error }] = useValueStore("queue", []);
	return (
		<Box>
			<Heading text="Mix Queue" />
			<Stack spacing={1}>
				{queue.map((recipe, index) => (
					<Box key={index}>
						<Body>
							<Button
								text={<ClearIcon />}
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
			</Stack>
		</Box>
	);
}

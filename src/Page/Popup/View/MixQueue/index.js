import { useValueStore } from "@/Context/Storage";

import { Stack, Box, Paper, Typography } from "@mui/material";
import Heading from "@Component/Heading";
import Link from "@/Component/Link";
import Button from "@Component/Button";
import ClearIcon from "@mui/icons-material/Clear";
import QueueIcon from "@mui/icons-material/Queue";
export default function MixQueueView() {
	const [queue, setQueue, { loading, error }] = useValueStore("queue", []);
	return (
		<Paper
			sx={{
				height: "100%",
				overflowY: "scroll",
			}}
		>
			<Heading text="Mix Queue" />

			<Stack spacing={1}>
				{!queue.length && (
					<>
						<Typography
							sx={{
								margin: "16px",
							}}
							variant="body1"
						>
							No mixes in queue.
							<br /> Go to{" "}
							<Link
								text="the recipes page"
								url="https://alltheflavors.com/recipe"
							/>
							and click the <QueueIcon /> button on a recipe to
							add it to the queue.
						</Typography>
					</>
				)}
				{queue.map((recipe, index) => (
					<Box key={index}>
						<Stack direction={"row"} spacing={1}>
							<Button
								text={<ClearIcon />}
								onClick={() => {
									const newQueue = queue.filter(
										(_, i) => i !== index
									);
									setQueue(newQueue);
								}}
							/>
							<Stack
								sx={{
									alignItems: "flex-start",
								}}
							>
								<Link
									text={recipe.title}
									url={`https://alltheflavors.com${recipe.href}`}
								/>
								<Box>
									<Typography
										sx={{
											marginLeft: "6px",
										}}
										variant="caption"
									>
										by
									</Typography>
									<Link
										text={recipe.author}
										url={`https://alltheflavors.com/mixers/${recipe.author}`}
									/>
								</Box>
							</Stack>
						</Stack>
					</Box>
				))}
			</Stack>
		</Paper>
	);
}

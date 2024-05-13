import { getIsInQueue } from "..";
import { useState } from "react";
import Button from "@Component/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function EnqueueButton({ queue, recipe, getQueue }) {
	const [isInQueue, setIsInQueue] = useState(getIsInQueue(queue, recipe));

	return (
		<Button
			className="enqueueButton"
			Icon={isInQueue ? <RemoveIcon /> : <AddIcon />}
			text={isInQueue ? "In Queue" : "Add to Queue"}
			sx={{
				backgroundColor: "white",
				"&:hover": {
					backgroundColor: "white",
				},
			}}
			onClick={async () => {
				let queue = await getQueue();
				const isInQueue = getIsInQueue(queue, recipe);
				if (isInQueue) {
					queue = queue.filter(r => r.href !== recipe.href);
				} else {
					queue.push(recipe);
				}
				chrome.storage.local.set({ queue }, () => {
					console.log("added to queue", recipe);
					setIsInQueue(!isInQueue);
				});
			}}
		/>
	);
}

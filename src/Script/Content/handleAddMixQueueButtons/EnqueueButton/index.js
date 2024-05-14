import { getQueue } from "..";
import { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import IconButton from "@Component/IconButton";
import Slide from "@mui/material/Slide";
import { Snackbar } from "@mui/material";
export const getIsInQueue = (queue, recipe) =>
	queue.some(r => r.href === recipe.href);
export default function EnqueueButton({ queue, recipe }) {
	const [isInQueue, setIsInQueue] = useState(getIsInQueue(queue, recipe));
	const [toast, setToast] = useState(null);

	return (
		<>
			<IconButton
				Icon={isInQueue ? RemoveFromQueueIcon : QueueIcon}
				className={"enqueueButton"}
				onClick={async () => {
					let queue = await getQueue();
					const isInQueue = getIsInQueue(queue, recipe);
					if (isInQueue) {
						queue = queue.filter(r => r.href !== recipe.href);
					} else {
						queue.push(recipe);
					}
					chrome.storage.local.set({ queue }, () => {
						setIsInQueue(!isInQueue);
					});
					setToast({
						message: isInQueue
							? "Removed from Mix Queue"
							: "Added to Mix Queue",
					});
				}}
			/>
			<Snackbar
				open={!!toast}
				autoHideDuration={3000}
				onClose={() => setToast(null)}
				TransitionComponent={Slide}
				message={toast?.message}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			/>
		</>
	);
}

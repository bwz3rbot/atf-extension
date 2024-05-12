import { IconButton, Box, Button, OutlinedInput } from "@mui/material";
import Heading from "@Component/Heading";
import { useValueStore } from "@/Context/Storage";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useEffect } from "react";
export default function ConfigureView() {
	const [hiddenUsers, setHiddenUsers, { loading, error }] = useValueStore(
		"hidden-users",
		[]
	);
	console.log("useValueStore['hiddenUsers']", {
		hiddenUsers,
		loading,

		error,
	});

	const hideUser = useCallback(
		user => {
			console.log("hiding user from users: ", hiddenUsers);
			setHiddenUsers([...new Set([...hiddenUsers, user])]);
		},
		[loading, hiddenUsers, setHiddenUsers]
	);

	const unhideUser = useCallback(
		user => {
			setHiddenUsers(hiddenUsers.filter(u => u !== user));
		},
		[hiddenUsers, setHiddenUsers]
	);
	const sendHideUsersMessage = async users => {
		chrome.runtime.sendMessage({
			message: "hide-users",
			users,
		});
	};

	return (
		<Box>
			<Heading text={"Hide Users"} />
			<form
				onSubmit={e => {
					e.preventDefault();
					if (e.target.name.value === "") return;
					hideUser(e.target.name.value);
				}}
			>
				<OutlinedInput size="small" type="text" name="name" />
			</form>
			<Button onClick={() => sendHideUsersMessage(hiddenUsers)}>
				Hide Users
			</Button>
			<Box>
				{hiddenUsers.map(user => {
					console.log("user", user);
					return (
						<Box key={user}>
							{user}
							<Button onClick={() => unhideUser(user)}>
								Remove
							</Button>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}

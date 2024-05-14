import { Box, TextField, Stack, Typography } from "@mui/material";
import Heading from "@Component/Heading";
import { useValueStore } from "@/Context/Storage";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useState } from "react";
import Button from "@Component/Button";
export default function HideMixersView() {
	const [hiddenUsers, setHiddenUsers, { loading, error }] = useValueStore(
		"hidden-users",
		[]
	);

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
	const [inputValue, setInputValue] = useState("");

	return (
		<Box
			sx={{
				padding: "10px",
			}}
		>
			<Heading text={"Hide users from recipes page"} />
			<Stack spacing={2}>
				<form
					onSubmit={e => {
						e.preventDefault();
						if (e.target.name.value === "") return;
						hideUser(e.target.name.value);
						setInputValue("");
					}}
				>
					<TextField
						value={inputValue}
						onInput={e => setInputValue(e.target.value)}
						label="User name"
						size="small"
						type="text"
						name="name"
					/>
				</form>

				<Box>
					{hiddenUsers.map(user => {
						return (
							<Box key={user}>
								<Button
									text={<ClearIcon />}
									onClick={() => unhideUser(user)}
								/>
								<Typography
									sx={{
										display: "inline",
										marginLeft: "10px",
									}}
								>
									{user}
								</Typography>
							</Box>
						);
					})}
				</Box>
			</Stack>
		</Box>
	);
}

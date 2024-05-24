import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function DeveloperMenu({ developer }) {
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<>
			<IconButton
				aria-label="settings"
				onClick={e => {
					e.stopPropagation();
					setAnchorEl(e.currentTarget);
				}}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem onClick={() => window.open(developer.mixer)}>
					Mixer Profile
				</MenuItem>
				<MenuItem onClick={() => window.open(developer.github)}>
					Github
				</MenuItem>
				<MenuItem onClick={() => window.open(developer.link.url)}>
					{developer.link.title}
				</MenuItem>
			</Menu>
		</>
	);
}

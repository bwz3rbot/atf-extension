import { IconButton } from "@mui/material";
export default function Button({ Icon, onClick = () => {}, className }) {
	return (
		<IconButton onClick={onClick} className={className}>
			<Icon />
		</IconButton>
	);
}

import { IconButton } from "@mui/material";
export default function Button({ Icon, onClick = () => {}, className, title }) {
	return (
		<IconButton onClick={onClick} className={className} title={title}>
			<Icon />
		</IconButton>
	);
}

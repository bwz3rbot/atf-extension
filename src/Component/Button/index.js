import { Button as ButtonBase } from "@mui/material";
export default function Button({ text, Icon, onClick = () => {} }) {
	return (
		<ButtonBase variant="outlined" startIcon={Icon} onClick={onClick}>
			{text}
		</ButtonBase>
	);
}

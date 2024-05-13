import { Button as ButtonBase } from "@mui/material";
export default function Button({
	text,
	Icon,
	onClick = () => {},
	className,
	sx,
}) {
	return (
		<ButtonBase
			variant="outlined"
			startIcon={Icon}
			onClick={onClick}
			className={className}
			sx={sx}
		>
			{text}
		</ButtonBase>
	);
}

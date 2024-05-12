import { Typography } from "@mui/material";
export default function Subheading({ text, children }) {
	return <Typography variant="subtitle2">{text || children}</Typography>;
}

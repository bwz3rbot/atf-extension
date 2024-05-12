import { Typography } from "@mui/material";
export default function Body({ text, children }) {
	return <Typography variant="body1">{text || children}</Typography>;
}

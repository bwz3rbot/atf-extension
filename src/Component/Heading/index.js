import { Typography } from "@mui/material";
export default function Heading({ text, children }) {
	return <Typography sx={{
		marginBottom: "10px",
	}} variant="h5">{text || children}</Typography>;
}

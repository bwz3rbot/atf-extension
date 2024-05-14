import { Paper } from "@mui/material";
export default function ViewBox({ children }) {
	return (
		<Paper
			sx={{
				width: "100%",
				height: "100%",
				// padding: "10px",
			}}
		>
			{children}
		</Paper>
	);
}

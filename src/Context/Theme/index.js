import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "@fontsource/inter";

const WHITE = "#ffffff";
const WHITE_SECONDARY = "rgba(255, 255, 255, 0.4)";
const DARK_BLUE = "#1B2635";
const LIGHT_BLUE = "#1CE0FE";
const LIGHT_BLUE_SECONDARY = "#05b2bd";
const LIGHT_GREY = "#6D838A";
const DARK_GREY = "#233044";

const BUTTON_BLUE_SELECTED = "#407AD6";
const BUTTON_BLUE_UNSELECTED = "#2C5595";
const theme = createTheme({
	typography: {
		fontFamily: "Inter",
	},
	components: {
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: WHITE,
					backgroundColor: DARK_BLUE,
					"&:hover": {
						backgroundColor: DARK_GREY,
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					backgroundColor: WHITE,
					margin: "10px 0",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: WHITE,
					borderColor: WHITE,
					"&:hover": {
						backgroundColor: "#407AD6",
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& label": {
						color: WHITE,
					},
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: WHITE,
						},
						"&:hover fieldset": {
							borderColor: WHITE,
						},
						"&.Mui-focused fieldset": {
							borderColor: WHITE,
						},
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: DARK_GREY,
						color: WHITE,
					},
					"&:not(.Mui-selected)": {
						backgroundColor: DARK_BLUE,
						color: WHITE_SECONDARY,
					},
					"&:hover": {
						backgroundColor: DARK_GREY,
						color: WHITE,
					},

					background: {
						color: WHITE,
					},
				},
			},
		},
	},
	palette: {
		background: {
			default: DARK_BLUE,
			paper: DARK_GREY,
		},
		text: {
			primary: WHITE,
		},

		primary: {
			main: LIGHT_BLUE,
			light: LIGHT_GREY,
			dark: LIGHT_BLUE_SECONDARY,
			contrastText: WHITE,
		},
		// secondary: {
		// 	main: "#fb9678",
		// 	light: "#fcf1ed",
		// 	dark: "#e67e5f",
		// 	contrastText: "#ffffff",
		// },
		// success: {
		// 	main: "#00c292",
		// 	light: "#ebfaf2",
		// 	dark: "#00964b",
		// 	contrastText: "#ffffff",
		// },
		// info: {
		// 	main: "#0bb2fb",
		// 	light: "#a7e3f4",
		// 	dark: "#0bb2fb",
		// 	contrastText: "#ffffff",
		// },
		// error: {
		// 	main: "#e46a76",
		// 	light: "#fdf3f5",
		// 	dark: "#e45a68",
		// 	contrastText: "#ffffff",
		// },
		// warning: {
		// 	main: "#fec90f",
		// 	light: "#fff4e5",
		// 	dark: "#dcb014",
		// 	contrastText: "#ffffff",
		// },
	},
});

export default function ThemeContextProvider({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

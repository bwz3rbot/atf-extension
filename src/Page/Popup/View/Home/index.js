import { Box, Divider } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
import Link from "@/Component/Link";
import { version } from "../../../../../manifest.json";
export default function HomeView() {
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<img
					style={{
						marginBottom: "10px",
						marginRight: "10px",
					}}
					src="./assets/dropper.svg"
					alt="ATF-Extended"
				/>
				<Heading text={`ATF Extended v${version}`} />
			</Box>
			<Subheading>
				By{" "}
				<Link
					url="https://alltheflavors.com/mixers/Frink"
					text="Frink"
				/>
			</Subheading>
			<Divider />
			<Body>
				A chrome extension to extend the functionality of the ATF website.
			</Body>
			<Divider />
			<Body>
				Send a message in ATF chat if you have any feature suggestions
				or issues to report.
			</Body>

			<Divider />
			<Body>
				This is an open-source project. To contribute, visit the{" "}
				<Link
					url="https://github.com/bwz3rbot/atf-extension"
					text="GitHub repository"
				/>
			</Body>
		</Box>
	);
}

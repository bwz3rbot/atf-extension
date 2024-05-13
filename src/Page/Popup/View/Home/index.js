import { Typography, Box } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
import LinkButton from "@Component/LinkButton";
export default function HomeView() {
	return (
		<Box>
			<Heading text="ATF-Extended" />
			<Subheading>
				By{" "}
				<LinkButton
					url="https://alltheflavors.com/mixers/Frink"
					text="Frink"
				/>
			</Subheading>
			<hr />
			<Body>
				This is a chrome extension that extends the functionality of the
				ATF website.
			</Body>
			<br />
			<br />
			<hr />
			<Body>
				Send me a message in ATF if you have any feature suggestions or
				issues to report.
			</Body>

			<hr />
			<Body>
				This is an open-source project. To contribute, visit the{" "}
				<LinkButton
					url="https://github.com/bwz3rbot/atf-extension"
					text="GitHub repository"
				/>
			</Body>
		</Box>
	);
}

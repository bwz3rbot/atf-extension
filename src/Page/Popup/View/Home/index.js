import { Typography, Box, Divider } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
import Link from "@/Component/Link";
export default function HomeView() {
	return (
		<Box>
			<Heading text="ATF-Extended" />
			<Subheading>
				By{" "}
				<Link
					url="https://alltheflavors.com/mixers/Frink"
					text="Frink"
				/>
			</Subheading>
			<Divider />
			<Body>
				This is a chrome extension that extends the functionality of the
				ATF website.
			</Body>
			<Divider />
			<Body>
				Send me a message in ATF if you have any feature suggestions or
				issues to report.
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

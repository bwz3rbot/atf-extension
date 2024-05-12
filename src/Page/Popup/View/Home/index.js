import { Typography, Box } from "@mui/material";
import Heading from "@Component/Heading";
import Subheading from "@Component/Subheading";
import Body from "@Component/Body";
export default function HomeView() {
	return (
		<Box>
			<Heading text="ATF-Extended" />
			<Subheading>
				By{" "}
				<button
					style={{
						// make it like an anchor tag
						background: "none",
						border: "none",
						color: "blue",
						cursor: "pointer",
					}}
					onClick={() => {
						// open the link in the current tab
						chrome.tabs.create({
							url: "https://alltheflavors.com/mixers/Frink",
						});
					}}
				>
					Frink
				</button>
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
		</Box>
	);
}

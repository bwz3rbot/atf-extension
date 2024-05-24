import Subheading from "@/Component/Subheading";
import { Box, Stack, Divider, Card, CardHeader } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Link from "@/Component/Link";
import { Avatar } from "@mui/material";
import DeveloperMenu from "./DeveloperMenu";

const developers = [
	{
		name: "SeniorFullStack",
		title: "Lead Developer",
		github: "https://github.com/bwz3rbot",
		mixer: "https://alltheflavors.com/mixers/Frink",
		link: {
			title: "Upwork",
			url: "https://www.upwork.com/fl/~0195dcec9947eb2c12",
		},
		avatar: "./assets/developers/seniorfullstack/avatar.png",
	},
];
export default function CreditsView() {
	return (
		<Box
			sx={{
				padding: "10px",
			}}
		>
			<Subheading
				text={
					"This is an open source project. Thanks to all who have participated."
				}
			/>

			<Divider />
			<Stack spacing={2}>
				{developers.map(developer => {
					return (
						<Card>
							<CardHeader
								avatar={
									<Avatar
										src={developer.avatar}
										sx={{
											width: "50px",
											height: "50px",
										}}
									/>
								}
								title={developer.name}
								subheader={developer.title}
								action={<DeveloperMenu developer={developer} />}
							/>
						</Card>
					);
				})}
			</Stack>
		</Box>
	);
}

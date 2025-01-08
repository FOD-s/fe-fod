import {
	AudioWaveform,
	CalendarCheck2,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	School,
	Store,
	UserRound
} from "lucide-react";

export const DATA_NAV = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Schools",
			url: "#",
			icon: School,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/schools",
				},
			],
		},
		{
			title: "Class",
			url: "#",
			icon: Store,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/class",
				},
			],
		},
		{
			title: "Schedules",
			url: "#",
			icon: CalendarCheck2,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/schedules",
				},
			],
		},
	],
	navManagement: [
		{
			title: "Users",
			icon: UserRound,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/users",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

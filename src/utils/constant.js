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
	UserRound,
	ShoppingCart,
	Users,
	Bed,
	ChartPie
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
			title: "Orders",
			url: "#",
			icon: ShoppingCart,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/orders",
				},
			],
		},
		{
			title: "Products",
			url: "#",
			icon: Bed,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/products",
				},
			],
		},
		{
			title: "Customers",
			url: "#",
			icon: Users,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/customers",
				},
			],
		},
		{
			title:"Analytics",
			url: "#",
			icon: ChartPie,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/analytics",
				},
			]
		}
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

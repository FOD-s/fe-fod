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
	ChartPie,
} from "lucide-react";

export const OPTIONS_TRUNDLE_BED = [
	{ value: "SANDARAN", label: "SANDARAN" },
	{ value: "NON SANDARAN", label: "NON SANDARAN" },
];

export const OPTIONS_TYPE_BED = [
	{ value: "BASIC", label: "BASIC" },
	{ value: "KOLAM", label: "KOLAM" },
];

export const OPTIONS_DRAWER_POSITION = [
	{ label: "Kiri", value: "kiri" },
	{ label: "Kanan", value: "kanan" },
	{ label: "Samping", value: "samping" },
	{ label: "Bawah", value: "bawah" },
	{ label: "Kiri Kanan", value: "kiri kanan" },
	{ label: "Kiri Bawah", value: "kiri bawah" },
	{ label: "Kanan Bawah", value: "kanan bawah" },
];

export const OPTIONS_ROLE = [
	{ label: "Admin", value: "1" },
	{ label: "Sales", value: "2" },
];

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
			title: "Analytics",
			url: "#",
			icon: ChartPie,
			isActive: true,
			items: [
				{
					title: "List",
					url: "/analytics",
				},
			],
		},
	],
	navSeller: [
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

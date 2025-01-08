import * as React from "react";

import { NavMain } from "@/components/organisms/nav-main";
import { NavUser } from "@/components/organisms/nav-user";
import { TeamSwitcher } from "@/components/organisms/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import { DATA_NAV } from "@/utils/constant";
import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// This is sample data.
const data = DATA_NAV;
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const navigate = useNavigate();
	const profile = useSelector(DATA_USER);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavLink to="/">
					{({ isActive }) => (
						<SidebarGroup>
							<SidebarMenuButton
								tooltip={"dashboard"}
								className={`transition-all rounded ${
									isActive ? "shadow-neumorphism" : "shadow-neumorphism-inner"
								} hover:shadow-neumorphism-hover`}
							>
								<LayoutDashboard />
								<span>Dashboard</span>
							</SidebarMenuButton>
						</SidebarGroup>
					)}
				</NavLink>
				<NavMain items={data.navMain} label="Settings" />
				<NavMain items={data.navManagement} label="Management" />
			</SidebarContent>
			<SidebarFooter className="px-3">
				<NavUser user={profile} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

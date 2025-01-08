"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

export function NavMain({
	items,
	label,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{label}</SidebarGroupLabel>
			<SidebarMenu className="gap-6">
				{items.map((item) => (
					<Collapsible key={item.title} asChild className="group/collapsible">
						<SidebarMenuItem className="transition-all rounded shadow-neumorphism-inner hover:shadow-neumorphism-hover hover:bg-bg-neumorphism">
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent className="pb-3">
								<SidebarMenuSub className="gap-3">
									{item.items?.map((subItem) => (
										<NavLink to={subItem.url} key={subItem.title}>
											{({ isActive }) => (
												<SidebarMenuSubItem
													key={subItem.title}
													className={`p-2 transition-all rounded  hover:shadow-neumorphism-hover ${
														isActive 
															? "shadow-neumorphism"
															: "shadow-neumorphism-inner"
													}
													`}
												>
													<SidebarMenuSubButton asChild>
														<span>{subItem.title}</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											)}
										</NavLink>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

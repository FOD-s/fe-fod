"use client";

import {
	BadgeCheck,
	Bell,
	EllipsisVertical,
	LogOut,
	User
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { updateToken } from "@/features/auth/loginSlice";
import useAuthService from "@/services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function NavUser({
	user,
}: {
	user: {
		Username: string;
		Name: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();
	const { logoutAdmin } = useAuthService();
	const dispatch = useDispatch();
	const toast = useToast();

	const logout = async () => {
		try {
			const res = await logoutAdmin();
			if (res?.status !== 200) {
				return toast({
					vaiant:"destructive",
					description: "Failed to logout",
				});
			}
			navigate("/login");
			return dispatch(updateToken(""));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem className="transition-all rounded shadow-neumorphism hover:shadow-neumorphism-hover hover:bg-bg-neumorphism">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-bg-neumorphism data-[state=open]:text-sidebar-accent-foreground data-[state=open]:shadow-neumorphism-inner hover:bg-bg-neumorphism hover:shadow-neumorphism-hover"
						>
							<Avatar className="w-8 h-8 rounded-lg">
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback className="rounded-lg">
									<User />
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-sm leading-tight text-left">
								<span className="font-semibold truncate">{user?.name}</span>
								{/* <span className="text-xs truncate">{profile.email}</span> */}
							</div>
							<EllipsisVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-bg-neumorphism shadow-neumorphism"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="w-8 h-8 rounded-lg">
									<AvatarImage src={user?.avatar} alt={user?.name} />
									<AvatarFallback className="rounded-lg">
										<User />
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-sm leading-tight text-left">
									<span className="font-semibold truncate">{user?.name}</span>
									{/* <span className="text-xs truncate">{profile.email}</span> */}
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
						{/* <DropdownMenuSeparator /> */}
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							{/* <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem> */}
							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => logout()}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

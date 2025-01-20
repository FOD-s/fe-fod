import { AppSidebar } from "@/components/organisms/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout() {
	// mengambil nilai dari store
	const isLogin = useSelector((state) => state.user.isLogin);

	useEffect(() => {
		if (!isLogin) {
			// navigate("/login");
		} else {
			// navigate("/");
		}
	}, [isLogin]);

	return (
		<div>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-bg-neumorphism">
						<div className="flex items-center gap-2 px-4 bg-bg-neumorphism">
							<SidebarTrigger className="-ml-1 hover:bg-bg-neumorphism shadow-neumorphism hover:shadow-neumorphism-hover" />
							{/* <Separator orientation="vertical" className="h-4 mr-2" />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href="#">s
											Building Your Application
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" />
									<BreadcrumbItem>
										<BreadcrumbPage>Data Fetching</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb> */}
						</div>
					</header>
					<div className="flex flex-col flex-1 gap-4 p-6 pt-3 rounded-tl-xl bg-bg-neumorphism shadow-neumorphism-inner overflow-auto">
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}

export default Layout;

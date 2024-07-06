"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { ModeToggle } from "./themeswith"
import { Button } from "./ui/button"
import { Home } from "lucide-react"
import { Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"



export default function NavBar() {
	const location = usePathname()

	return (
		<NavigationMenu className="min-w-full flex justify-between">

			{/* LEFT MENU */}
			<NavigationMenuList>

				<NavigationMenuItem>
					<Button variant="ghost" size="icon" asChild>
						<Link href="/"><Home /></Link>
					</Button>
				</NavigationMenuItem>


				{/* <NavigationMenuItem>
					<Button asChild
						variant={location === "/projects" ? "secondary" : "ghost"}
					>
						<Link href="/projects">Projects</Link>
					</Button>
				</NavigationMenuItem> */}


				<NavigationMenuItem>
					<Button asChild
						variant={location === "/backlog" ? "secondary" : "ghost"}
					>
						<Link href="/backlog">Backlog</Link>
					</Button>
				</NavigationMenuItem>


				<NavigationMenuItem>
					<Button asChild
						variant={location === "/sprint" ? "secondary" : "ghost"}
					>
						<Link href="/sprint">Sprint</Link>
					</Button>
				</NavigationMenuItem>


				<NavigationMenuItem>
					<Button asChild
						variant={location === "/dashboard" ? "secondary" : "ghost"}
					>
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				</NavigationMenuItem>

			</NavigationMenuList>


			{/* RIGHT MENU */}
			<NavigationMenuList>

				<NavigationMenuItem>
					<ModeToggle />
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon">
								<Settings />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Settings</SheetTitle>
								<SheetDescription>
									Wow! There's really a lot of settings here...
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</NavigationMenuItem>

			</NavigationMenuList>

		</NavigationMenu >
	)
}
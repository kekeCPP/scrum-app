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


				<NavigationMenuItem>
					<Button asChild
						variant={location === "/projects" ? "secondary" : "ghost"}
					>
						<Link href="/projects">Projects</Link>
					</Button>
				</NavigationMenuItem>


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
					<Button variant="outline" size="icon">
						<Settings />
					</Button>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<ModeToggle />
				</NavigationMenuItem>

			</NavigationMenuList>

		</NavigationMenu >
	)
}
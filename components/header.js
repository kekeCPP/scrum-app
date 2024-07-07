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
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

const activeProjects = [
	{
		value: "project a",
		label: "project a"
	},
	{
		value: "project b",
		label: "project b"
	}
]

const completedProjects = [
	{
		value: "project c",
		label: "project c"
	},
	{
		value: "project d",
		label: "project d"
	}
]

function ComboboxDemo() {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? activeProjects.concat(completedProjects).find((project) => project.value === value)?.label
						: "Select project..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search projects..." />
					<CommandEmpty>No projects found.</CommandEmpty>
					<CommandList>
						<CommandGroup>
							<span className="font-semibold text-sm pl-2">Active Projects</span>
							{activeProjects.map((project) => (
								<CommandItem
									key={project.value}
									value={project.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === project.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{project.label}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup>
							<span className="font-semibold text-sm pl-2">Completed Projects</span>
							{completedProjects.map((project) => (
								<CommandItem
									key={project.value}
									value={project.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === project.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{project.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover >
	)
}


export default function NavBar() {
	const location = usePathname()

	return (
		<NavigationMenu className="min-w-full flex justify-between">

			{/* LEFT MENU */}
			<NavigationMenuList>

				<NavigationMenuItem>
					<Button variant="ghost" size="icon" asChild>
						<Link href="/projects"><Home /></Link>
					</Button>
				</NavigationMenuItem>

				<span className="text-xl">Backlog - AI Utilization Environment</span>

				{/* <NavigationMenuItem>
					<ComboboxDemo />
				</NavigationMenuItem> */}

				{/* <NavigationMenuItem>
					<Button asChild
						variant={location === "/backlog" ? "secondary" : "ghost"}
					>
						<Link href="/backlog">My Projects</Link>
					</Button>
					<Link href="/projects">My Projects</Link>
				</NavigationMenuItem> */}


				{/* <NavigationMenuItem>
					<Button asChild
						variant={location === "/projects" ? "secondary" : "ghost"}
					>
						<Link href="/projects">Projects</Link>
					</Button>
				</NavigationMenuItem> */}


				{/* <NavigationMenuItem>
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
				</NavigationMenuItem> */}

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
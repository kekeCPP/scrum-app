import Link from "next/link"
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	Users,
	Undo2,
	Layers,
	Spade,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "./ui/separator"
import { Button } from "@/components/ui/button"


export default function SideBar() {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-4 gap-4">
						<span className="font-semibold">AI Utilization Environment</span>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-1">
							<Link
								href="/sprint"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Layers className="h-4 w-4" />
								Sprint
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									6
								</Badge>
							</Link>
							<Link
								href="/backlog"
								className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
							>
								<Package className="h-4 w-4" />
								Backlog
							</Link>
							<Link
								href="/team"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Users className="h-4 w-4" />
								Team
							</Link>
							<Link
								href="/dashboard"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<LineChart className="h-4 w-4" />
								Dashboard
							</Link>
							<Link
								href="/poker"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Spade className="h-4 w-4" />
								Planning Poker
							</Link>
							<Separator className="mt-4 mb-4" />
							<Link
								href="/"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Undo2 className="h-4 w-4" />
								My Projects
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}
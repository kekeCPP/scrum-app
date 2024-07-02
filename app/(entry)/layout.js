import NavBar from "@/components/header";

export default function RootLayout({ children }) {
	return (
		<div>
			<header className="border-b p-2">
				<NavBar />
			</header>

			<div className="p-2">
				{children}
			</div>
		</div>
	);
}

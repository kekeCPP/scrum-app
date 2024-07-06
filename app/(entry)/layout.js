"use client";
import NavBar from "@/components/header";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
	const router = useRouter()
	const cookies = useCookies()
	const db_url = "http://127.0.0.1:8090";
	const getSessionEndpoint = db_url + `/api/collections/sessions/records?filter=(access_token='${cookies.get("access_token")}')`

	fetch(getSessionEndpoint, {
		method: "GET",
	}).then(response => {
		if (!response.ok) {
			throw new Error(`Resonse status: ${response.status}`)
		}
		return response.json()
	}).then(data => {
		// Redirect user to login page if no jwt cookie was found
		if (data.totalItems != 1) { router.push("/login") }
	}).catch(error => {
		console.log(error.message)
		router.push("/login")
	})

	return (
		<div>
			<header className="border-b p-2">
				<NavBar />
			</header>

			<div className="pt-2 pr-4 pl-4 pb-2">
				{children}
			</div>
		</div>
	);
}

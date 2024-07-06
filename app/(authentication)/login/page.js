"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/themeswith"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"
import { useCookies } from "next-client-cookies";

const LoginSchema = z.object({
	identity: z.string().email(),
	password: z.string()
})

export default function LoginForm() {
	const [loginButtonLoading, setLoginButtonLoading] = useState(false)
	const [loggedIn, setLoggedIn] = useState(false)
	const router = useRouter()
	const { toast } = useToast()
	const cookies = useCookies()

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			identity: "",
			password: "",
		}
	})

	async function setAccessToken(userId, newAccessToken) {
		const db_url = "http://127.0.0.1:8090";
		const getSessionEndpoint = db_url + `/api/collections/sessions/records?filter=(user_id='${userId}')`

		fetch(getSessionEndpoint, {
			method: "GET"
		}).then(response => {
			if (!response.ok) { throw new Error(`Resonse status: ${response.status}`) }
			return response.json()
		}).then(data => {
			let items = data.items

			// Update access_token if one already exists
			if (items.length === 1) {
				const updateSessionEndpoint = db_url + `/api/collections/sessions/records/${items[0].id}`
				const updateData = {
					access_token: newAccessToken,
					user_id: items[0].user_id
				}

				fetch(updateSessionEndpoint, {
					method: "PATCH",
					body: JSON.stringify(updateData),
					headers: {
						"Content-type": "application/json"
					}
				}).then(response => {
					if (!response.ok) { throw new Error(`Resonse status: ${response.status}`) }
					return response.json()
				}).catch(error => { console.log(error.message) })
			}

			// Create new session entry if there was none already
			else {
				const sessions_entry = {
					"access_token": newAccessToken,
					"user_id": userId
				}

				fetch(db_url + "/api/collections/sessions/records", {
					method: "POST",
					body: JSON.stringify(sessions_entry),
					headers: {
						"Content-type": "application/json"
					}
				}).then(response => {
					if (!response.ok) {
						throw new Error(`Resonse status: ${response.status}`)
					}
				}).catch(error => {
					console.log(error.message)
				})
			}
		}).catch(error => { console.log(error.message) })
	}

	async function onSubmit(data) {
		setLoginButtonLoading(true)
		const db_url = "http://127.0.0.1:8090/api/";
		const endpoint = db_url + "collections/users/auth-with-password"

		fetch(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json"
			}
		}).then(response => {
			if (!response.ok) {
				setLoginButtonLoading(false)
				toast({
					variant: "destructive",
					title: "Login Failed!",
					description: "Invalid email or password"
				})
				throw new Error(`Resonse status: ${response.status}`)
			}
			return response.json()
		}).then(data => {
			// SUCCESSFULL LOGIN
			setLoginButtonLoading(false)
			setLoggedIn(true)

			// SET JWT ACCESS TOKEN
			const access_token = data.token
			const user_id = data.record.id
			cookies.set("access_token", data.token)

			setAccessToken(user_id, access_token)

			// REDIRECT TO HOME PAGE
			router.push("/")
		}).catch(error => {
			console.log(error.message)
		})
	}

	return (
		<div className="p-4">
			<div className="flex justify-end">
				<ModeToggle />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card className="mx-auto max-w-sm">
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>
								Enter your email and password
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="identity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<div className="flex items-center">
												<FormLabel>Password</FormLabel>
												<Link href="#" className="ml-auto inline-block text-sm underline">
													Forgot your password?
												</Link>
											</div>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={loginButtonLoading}>
									{loginButtonLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
									{/* Check authentication, redirect to '/' if successful. */}
									Login
								</Button>
								{/* <Button variant="outline" className="w-full">
							Login with Google
						</Button> */}
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/signup" className="underline">
									Sign up
								</Link>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	)
}

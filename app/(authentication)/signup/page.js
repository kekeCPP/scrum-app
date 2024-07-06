"use client";
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Loader2, CircleCheck } from "lucide-react";
import { useState } from "react";

const SignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, { message: "Password must be at least 8 characters." }),
	passwordConfirm: z.string().min(8, { message: "Password must be at least 8 characters." })
}).superRefine(({ passwordConfirm, password }, ctx) => {
	if (passwordConfirm !== password) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords did not match",
			path: ["passwordConfirm"]
		})
	}
});

export default function SignUpForm() {
	const [signUpButtonLoading, setSignUpButtonLoading] = useState(false)
	const [accountCreated, setAccountCreated] = useState(false)

	const form = useForm({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: ""
		}
	})

	async function onSubmit(data) {
		setSignUpButtonLoading(true)
		const db_url = "http://127.0.0.1:8090/api/";
		const endpoint = db_url + "collections/users/records"

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json"
				}
			});
			if (!response.ok) {
				setSignUpButtonLoading(false)
				throw new Error(`Resonse status: ${response.status}`);
			} else {
				setSignUpButtonLoading(false)
				setAccountCreated(true)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className="p-4">
			<div className="flex justify-end">
				<ModeToggle />
			</div>

			{accountCreated ?
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Success!</CardTitle>
						<CardDescription className="text-center">
							Your account was created successfully
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center mt-4">
							<CircleCheck color="#00aa00" className="size-40" />
						</div>
					</CardContent>
					<CardFooter className="flex justify-center">
						<div>
							<Link href="/login" className="underline">login</Link>
							{" "}to my new account
						</div>
					</CardFooter>
				</Card>
				:
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Card className="mx-auto max-w-sm">
							<CardHeader>
								<CardTitle className="text-2xl">Create Account</CardTitle>
								<CardDescription>
									Enter email and password to create your account
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input placeholder="name@example.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Password</FormLabel>
													<FormControl>
														<Input type="password" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="passwordConfirm"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Confirm Password</FormLabel>
													<FormControl>
														<Input type="password" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button type="submit" className="w-full" disabled={signUpButtonLoading}>
										{signUpButtonLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
										Sign Up
									</Button>
									{/* <Button variant="outline" className="w-full">
										Login with Google
									</Button> */}
								</div>
								<div className="mt-4 text-center text-sm">
									Already have an account?{" "}
									<Link href="/login" className="underline">
										Login
									</Link>
								</div>
							</CardContent>
						</Card>
					</form>
				</Form>
			}
		</div >
	)
}

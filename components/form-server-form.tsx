"use client";

import { handleSignup } from "@/actions/auth";
import { FormControl, FormField, FormItem, FormMessage, FormServer } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email().min(1),
	firstName: z.string().min(1, "First Name is required"),
	lastName: z.string().min(1, "Last Name is required"),
	birthday: z.string().transform(Date),
	password: z.string().min(8, "Minimum 8 characters"),
	confirmPassword: z.string().min(8, "Minimum 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export type SignupFormFormSchema = z.infer<typeof formSchema>

export default function FormServerForm() {
	
	const form = useForm<SignupFormFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: 'email@example.com',
			firstName: 'Form',
			lastName: 'Action',
			birthday: '2000-01-01',
			password: 'P@ssw0rd123',
			confirmPassword: 'P@ssw0rd123',
		},
	})
	
	return (
		<div className="flex flex-col gap-7">
			<h3 className="text-4xl">Form Server Component</h3>
			<FormServer
				{...form}
				className="space-y-4"
				action={handleSignup}
				schema={formSchema}
			>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Email" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstName"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input placeholder="First Name" value={field.value} onChange={field.onChange}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Last Name" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="birthday"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input
									type="date"
									placeholder="Birthday"
									{...field}
								/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Password" {...field} type="password"/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Confirm Password" {...field} type="password"/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<SubmitButton className="w-full">Submit</SubmitButton>
			</FormServer>
		</div>
	)
} 
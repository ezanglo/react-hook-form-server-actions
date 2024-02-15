"use client";

import { handleSignup } from "@/actions/auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormAction } from "@/hooks/useFormActions";
import { zodResolver } from "@hookform/resolvers/zod";
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

export type UseFormActionFormSchema = z.infer<typeof formSchema>

export default function UseFormActionForm() {
	
	const form = useFormAction<UseFormActionFormSchema>({
		schema: formSchema,
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: 'email@example.com',
		},
	})
	
	const handleSubmit = async (formData: UseFormActionFormSchema) => {
		await handleSignup(formData)
	}
	
	return (
		<div className="flex flex-col gap-7">
			<h3 className="text-4xl">useFormAction Hook</h3>
			<Form {...form}>
				<form
					className="space-y-4"
					action={() => form.handleAction(handleSubmit)}
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
									<Input placeholder="Password" {...field} type="text"/>
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
									<Input placeholder="Confirm Password" {...field} type="text"/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<SubmitButton className="w-full">Submit</SubmitButton>
				</form>
			</Form>
		</div>
	)
} 
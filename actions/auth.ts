'use server'


import { SignupFormFormSchema } from "@/components/form-server-form";

export async function handleSignup(formData: SignupFormFormSchema) {
	console.log('server side action', formData);
}

export async function handleSignupTest(formData?: FormData) {
	console.log('server side action', formData);
}

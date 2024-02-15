'use server'

export async function handleFormAction(formData: FormData) {
	console.log('server side action', formData);
}
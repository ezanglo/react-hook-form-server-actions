import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldValues, Path, SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";


type UseFormActionProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = UseFormProps<TFieldValues, TContext> & {
	schema: z.Schema<any, any>
}

export function useFormAction<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues = TFieldValues>({
	schema,
	...props
}: UseFormActionProps<TFieldValues, TContext>) {
	const form = useForm({
		...props,
		resolver: zodResolver(schema)
	})
	// useEffect(() => {
	// 	const subscription = form.watch((value, {name}) => {
	// 		if(name){
	// 			const validatedFields = schema.safeParse(form.getValues());
	// 			if (!validatedFields.success) {
	// 				const error = validatedFields.error.flatten().fieldErrors[name]
	// 				console.log('error', error?.at(0) ?? "")
	// 				console.log('form.formState.isValid', form.formState.isValid)
	// 				form.setError(name, {message: error?.at(0) ?? ""});
	// 			}
	// 		}
	// 	})
	// 	return () => subscription.unsubscribe()
	// }, [form.watch, schema]);

	// const handleAction = async (onAction: SubmitHandler<TTransformedValues>) => {
	// 	const validatedFields = schema.safeParse(form.getValues());
	// 	if (!validatedFields.success) {
	// 		const errors = validatedFields.error.flatten().fieldErrors
	// 		console.log(errors)
	// 		handleFormErrors(errors as any, (key, message) => {
	// 			form.setError(key as Path<TFieldValues>, {message});
	// 		});
	// 		return;
	// 	}
	// 	form.clearErrors();
	// 	onAction(validatedFields.data);
	// };
	
	const handleAction = async (onAction: SubmitHandler<TFieldValues>) => {
		const valid = await form.trigger();
		if (valid) {
			return onAction(schema.parse(form.getValues()));
		}
	};
	
	const submitAction = (onAction: (formData: TFieldValues) => void) => {
		if (form.formState.isValid) {
			return {action: () => onAction(form.getValues())};
		}
		return { onSubmit: form.handleSubmit(() => {}) };
	};
	
	return {
		...form,
		handleAction,
		submitAction
	}
}
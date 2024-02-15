import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ValidationError<T> = {
  [K in keyof T]: string[]
}

export function handleFormErrors<T>(
  errors: ValidationError<T>,
  callback: (key: keyof T, message: string) => void
) {
  Object.keys(errors).forEach(prop => {
    const key = prop as keyof T
    const errorMessages = errors[key] as string[];
    errorMessages.forEach(message => callback(key, message))
  })
}
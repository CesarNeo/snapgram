import * as z from 'zod'

export const SignUpValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' }),
  username: z
    .string()
    .min(2, { message: 'username must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})

export const SignInValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})

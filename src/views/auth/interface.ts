import { z } from "zod";

// STUB: create type for login component
const loginSchema = z.object({
	toggleView: z.function(),
	handleTokenUpdate: z.function().args(z.union([z.string(), z.boolean()])),
});
export type ILogin = z.infer<typeof loginSchema>;

// STUB: create type for register component
const registerSchema = loginSchema.pick({
	toggleView: true,
});
export type IRegister = z.infer<typeof registerSchema>;

// STUB: create type for register formData
const registerFormData = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string().email(),
	password: z.string(),
});
export type IRegisterFormData = z.infer<typeof registerFormData>;

// STUB: create type for login formData
const loginFormData = registerFormData.pick({
	email: true,
	password: true,
});
export type ILoginFormData = z.infer<typeof loginFormData>;

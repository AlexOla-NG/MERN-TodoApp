import { z } from "zod";

// STUB: create type for login formData
const loginFormData = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type ILoginFormData = z.infer<typeof loginFormData>;

// STUB: create type for Auth components (login & register)
const loginSchema = z
	.object({
		toggleView: z.function(),
		handleTokenUpdate: z
			.function()
			.args(z.union([z.string(), z.boolean()])),
		token: z.union([z.string(), z.boolean()]),
	})
	.partial();

export type ILogin = z.infer<typeof loginSchema>;

// STUB: create type for formData
const registerFormData = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export type IRegisterFormData = z.infer<typeof registerFormData>;

// STUB: create type for Auth components (login & register)
const registerSchema = z
	.object({
		toggleView: z.function(),
		handleTokenUpdate: z
			.function()
			.args(z.union([z.string(), z.boolean()])),
		token: z.union([z.string(), z.boolean()]),
	})
	.partial();

export type IRegister = z.infer<typeof registerSchema>;

// STUB: create type for function to update token state, & hold token state itself
const TokenSchema = loginSchema
	.pick({ handleTokenUpdate: true, token: true })
	.partial();

export type TokenSchema = z.infer<typeof TokenSchema>;

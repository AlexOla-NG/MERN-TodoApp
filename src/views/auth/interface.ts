import { z } from "zod";

// STUB: create type for Auth components (login & register)
const schema = z
	.object({
		defaultFormData: z.object({
			email: z.string().email().optional(),
			password: z.string().optional(),
		}),
		toggleView: z.function(),
		handleTokenUpdate: z
			.function()
			.args(z.union([z.string(), z.boolean()])),
		token: z.union([z.string(), z.boolean()]),
	})
	.partial();

export type IAuth = z.infer<typeof schema>;

// STUB: creat type for function to update token state, & hold token state itself
const TokenSchema = schema
	.pick({ handleTokenUpdate: true, token: true })
	.partial();

export type TokenSchema = z.infer<typeof TokenSchema>;

// STUB: create type for formData
const formData = z.object({
	email: z.string().email().optional(),
	password: z.string().optional(),
});

export type IFormData = z.infer<typeof formData>;

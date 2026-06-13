import {z} from 'zod';

const isServer = typeof window === 'undefined';

const commonValidation = () => z.string().trim().min(1);

const stringToNumber = (value: string, ctx: z.RefinementCtx) => {
	const transformed = parseInt(value, 10);

	if (Number.isNaN(transformed)) {
		ctx.addIssue({
			code: 'custom',
			message: 'Not a number.',
		});

		return z.NEVER;
	}

	return transformed;
};

const serverSchema = z.object({
	SHOPIFY_STORE_DOMAIN: commonValidation(),
	SHOPIFY_STOREFRONT_ACCESS_TOKEN: commonValidation(),
	SMTP_HOST: commonValidation(),
	SMTP_PORT: commonValidation().transform(stringToNumber),
	SMTP_USER: commonValidation().email(),
	SMTP_PASSWORD: commonValidation(),
	CONTACT_EMAIL: commonValidation().email(),
	JUDGEME_PRIVATE_API_TOKEN: commonValidation(),
	REVALIDATE_SECRET: commonValidation(),
});

const parseEnv = <T>(
	schema: z.ZodSchema<T>,
	values: Record<string, unknown>,
) => {
	const result = schema.safeParse(values);
	if (!result.success) {
		console.error('Invalid environment variables:');
		console.error(z.flattenError(result.error).fieldErrors);
		throw new Error('Invalid environment variables');
	}
	return result.data;
};

const serverEnv = isServer
	? parseEnv(serverSchema, {
			SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
			SHOPIFY_STOREFRONT_ACCESS_TOKEN:
				process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
			SMTP_HOST: process.env.SMTP_HOST,
			SMTP_PORT: process.env.SMTP_PORT,
			SMTP_USER: process.env.SMTP_USER,
			SMTP_PASSWORD: process.env.SMTP_PASSWORD,
			CONTACT_EMAIL: process.env.CONTACT_EMAIL,
			JUDGEME_PRIVATE_API_TOKEN: process.env.JUDGEME_PRIVATE_API_TOKEN,
			REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
		})
	: ({} as z.infer<typeof serverSchema>);

const clientEnv = {};

export const env = {...serverEnv, ...clientEnv};

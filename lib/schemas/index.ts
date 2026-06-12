import z from 'zod';

export const contactSchema = z.object({
	email: z.string().min(1, 'email.required').email('email.invalid'),
	name: z.string().min(1, 'name.required').max(100, 'name.tooLong'),
	message: z
		.string()
		.min(1, 'message.required')
		.min(10, 'message.tooShort')
		.max(1000, 'message.tooLong'),
	privacy: z.literal('on', 'privacy.mustAgree'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormState = {
	success?: boolean;
	error?: string;
	errors?: z.core.$ZodErrorTree<ContactFormData>['properties'];
	values?: Partial<ContactFormData>;
} | null;

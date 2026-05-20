import z from 'zod';

export const contactSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	name: z.string().min(1, 'Name is required').max(100),
	message: z
		.string()
		.min(1, 'Message is required')
		.min(10, 'Message is too short')
		.max(1000),
	privacy: z.literal('on', 'You must agree to the privacy policy'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormState = {
	success?: boolean;
	error?: string;
	errors?: z.core.$ZodErrorTree<ContactFormData>['properties'];
	values?: Partial<ContactFormData>;
} | null;

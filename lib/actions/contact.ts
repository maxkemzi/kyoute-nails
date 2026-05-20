'use server';

import {ContactFormState, contactSchema} from '@/lib/schemas/contact';
import z from 'zod';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export async function sendContactEmail(
	prevState: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> {
	if (!formData.has('privacy')) {
		formData.set('privacy', 'off');
	}

	const raw = Object.fromEntries(formData);
	const result = contactSchema.safeParse(raw);

	if (!result.success) {
		return {
			errors: z.treeifyError(result.error).properties,
			values: raw,
		};
	}

	const {email, name, message} = result.data;

	try {
		await transporter.sendMail({
			from: `"${name}" <${process.env.SMTP_USER}>`,
			to: process.env.CONTACT_EMAIL,
			replyTo: email,
			subject: `New message from ${name}`,
			text: message,
			html: `<p>${message}</p>`,
		});
		return {success: true};
	} catch {
		return {
			error: 'Failed to send email. Please try again.',
			values: result.data,
		};
	}
}

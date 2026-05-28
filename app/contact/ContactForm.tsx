'use client';

import {CheckboxField, FormField} from '@/components/form';
import {Button} from '@/components/ui';
import {sendContactEmail} from '@/lib/actions/contact';
import {contactSchema} from '@/lib/schemas/contact';
import {toast} from '@/lib/toast';
import {useActionState, useEffect, useState} from 'react';

const ContactForm = () => {
	const [formState, action, isPending] = useActionState(
		sendContactEmail,
		null,
	);
	const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (formState?.error) {
			toast.error('Failed to send email. Please try again');
		}
		if (formState?.success) {
			toast.success('Message sent successfully');
		}
	}, [formState?.error, formState?.success]);

	const validateField = (name: string, value: string) => {
		const result =
			contactSchema.shape[
				name as keyof typeof contactSchema.shape
			].safeParse(value);
		setClientErrors(prev => ({
			...prev,
			[name]: result.success ? '' : result.error.issues[0].message,
		}));
	};

	const formAction = async (formData: FormData) => {
		setClientErrors({});
		return action(formData);
	};

	const errors = {
		email: clientErrors?.email ?? formState?.errors?.email?.errors[0] ?? '',
		name: clientErrors?.name ?? formState?.errors?.name?.errors[0] ?? '',
		message:
			clientErrors?.message ?? formState?.errors?.message?.errors[0] ?? '',
		privacy:
			clientErrors?.privacy ?? formState?.errors?.privacy?.errors[0] ?? '',
	};

	return (
		<form className="flex flex-col" action={formAction}>
			<div className="flex flex-col gap-6 mb-7">
				<FormField
					label="Email"
					error={errors.email}
					name="email"
					defaultValue={formState?.values?.email}
					onBlur={e => validateField('email', e.target.value)}
					placeholder="Your email address"
				/>

				<FormField
					label="Name"
					error={errors.name}
					name="name"
					defaultValue={formState?.values?.name}
					onBlur={e => validateField('name', e.target.value)}
					placeholder="Your name"
				/>

				<FormField
					label="Message"
					error={errors.message}
					name="message"
					defaultValue={formState?.values?.message}
					onBlur={e => validateField('message', e.target.value)}
					placeholder="Your message"
				/>
			</div>

			<CheckboxField
				wrapperClassName="mb-7"
				label="I agree that my data will be processed in accordance with the privacy policy."
				error={errors.privacy}
				name="privacy"
				defaultChecked={formState?.values?.privacy === 'on'}
				onChange={e =>
					validateField('privacy', e.target.checked ? 'on' : 'off')
				}
			/>

			<Button
				className="max-w-51.25 w-full self-center"
				isSubmit
				isDisabled={isPending}
			>
				Send
			</Button>
		</form>
	);
};

export default ContactForm;

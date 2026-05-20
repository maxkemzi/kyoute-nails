'use client';

import {Button, Typography} from '@/components/ui';
import {sendContactEmail} from '@/lib/actions/contact';
import {contactSchema} from '@/lib/schemas/contact';
import {useActionState, useState} from 'react';

const ContactForm = () => {
	const [formState, action, isPending] = useActionState(
		sendContactEmail,
		null,
	);
	const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

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
			{formState?.success ? (
				<Typography
					className="mb-4 text-center"
					weight="medium"
					color="success"
				>
					Message sent successfully.
				</Typography>
			) : null}
			{formState?.error ? (
				<Typography
					className="mb-4 text-center"
					weight="medium"
					color="danger"
				>
					Failed to send email. Please try again.
				</Typography>
			) : null}
			<div className="flex flex-col gap-6 mb-7">
				<label className="flex flex-col gap-2">
					<Typography as="span" textTransform="uppercase">
						Email
					</Typography>
					<input
						className="shadow-sm p-4 rounded-2xl"
						name="email"
						defaultValue={formState?.values?.email}
						onBlur={e => validateField('email', e.target.value)}
						placeholder="Your email address"
					/>
					{errors?.email && (
						<Typography color="danger" size="sm" as="span">
							{errors.email}
						</Typography>
					)}
				</label>

				<label className="flex flex-col gap-2">
					<Typography as="span" textTransform="uppercase">
						Name
					</Typography>
					<input
						className="shadow-sm p-4 rounded-2xl"
						name="name"
						defaultValue={formState?.values?.name}
						onBlur={e => validateField('name', e.target.value)}
						placeholder="Your email address"
					/>
					{errors?.name && (
						<Typography color="danger" size="sm" as="span">
							{errors.name}
						</Typography>
					)}
				</label>

				<label className="flex flex-col gap-2">
					<Typography as="span" textTransform="uppercase">
						Message
					</Typography>
					<input
						className="shadow-sm p-4 rounded-2xl"
						name="message"
						defaultValue={formState?.values?.message}
						onBlur={e => validateField('message', e.target.value)}
						placeholder="Your email address"
					/>
					{errors?.message && (
						<Typography color="danger" size="sm" as="span">
							{errors.message}
						</Typography>
					)}
				</label>
			</div>
			<label className="mb-7 flex flex-col gap-2 cursor-pointer group">
				<div className="flex gap-2 items-start">
					<input
						className="peer absolute opacity-0 w-0 h-0"
						name="privacy"
						defaultChecked={formState?.values?.privacy === 'on'}
						onChange={e =>
							validateField('privacy', e.target.checked ? 'on' : 'off')
						}
						type="checkbox"
					/>
					<span
						className="
								mt-0.5 w-4.5 h-4.5 shrink-0
								shadow-sm rounded
								flex items-center justify-center
								transition-colors duration-150
								peer-checked:bg-primary
								peer-focus-visible:outline 
								peer-disabled:bg-disabled
								peer-checked:after:opacity-100
								after:opacity-0
								after:content-['']
								after:transition-opacity after:duration-150
								after:w-3.5 after:h-3.5
								after:bg-primary-foreground
								after:[mask:url('/check.svg')_no-repeat_center]
								after:[-webkit-mask:url('/check.svg')_no-repeat_center]
								after:mask-contain
								after:[-webkit-mask-size:contain]
							"
					/>
					<Typography className="span">
						I agree that my data will be processed in accordance with the
						privacy policy.
					</Typography>
				</div>

				{errors?.privacy && (
					<Typography color="danger" size="sm" as="span">
						{errors.privacy}
					</Typography>
				)}
			</label>

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

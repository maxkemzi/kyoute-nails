'use client';

import {CheckboxField, FormField} from '@/components/form';
import {Button} from '@/components/ui';
import {sendContactEmail} from '@/lib/actions';
import {ContactFormData, contactSchema} from '@/lib/schemas';
import {toast} from '@/lib/toast';
import {useTranslations} from 'next-intl';
import {useActionState, useEffect, useState} from 'react';

const ContactForm = () => {
	const t = useTranslations('Contact.form');
	const [formState, action, isPending] = useActionState(
		sendContactEmail,
		null,
	);
	const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (formState?.error) {
			toast.error(t('error'));
		}
		if (formState?.success) {
			toast.success(t('success'));
		}
	}, [formState?.error, formState?.success, t]);

	const validateField = (name: keyof ContactFormData, value: string) => {
		const result = contactSchema.shape[name].safeParse(value);
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

	const translatedErrors = {
		email: errors.email ? t(`fields.${errors.email}`) : undefined,
		name: errors.name ? t(`fields.${errors.name}`) : undefined,
		message: errors.message ? t(`fields.${errors.message}`) : undefined,
		privacy: errors.privacy ? t(`fields.${errors.privacy}`) : undefined,
	};

	return (
		<form className="flex flex-col" action={formAction}>
			<div className="flex flex-col gap-6 mb-7">
				<FormField
					label={t('fields.email.label')}
					error={translatedErrors.email}
					name="email"
					defaultValue={formState?.values?.email}
					onBlur={e => validateField('email', e.target.value)}
					placeholder={t('fields.email.placeholder')}
				/>

				<FormField
					label={t('fields.name.label')}
					error={translatedErrors.name}
					name="name"
					defaultValue={formState?.values?.name}
					onBlur={e => validateField('name', e.target.value)}
					placeholder={t('fields.name.placeholder')}
				/>

				<FormField
					label={t('fields.message.label')}
					error={translatedErrors.message}
					name="message"
					defaultValue={formState?.values?.message}
					onBlur={e => validateField('message', e.target.value)}
					placeholder={t('fields.message.placeholder')}
				/>
			</div>

			<CheckboxField
				wrapperClassName="mb-7"
				label={t('fields.privacy.label')}
				checkboxLabel={t('fields.privacy.checkboxLabel')}
				error={translatedErrors.privacy}
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
				{t('send')}
			</Button>
		</form>
	);
};

export default ContactForm;

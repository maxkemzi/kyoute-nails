'use client';

import {Section, Typography} from '@/components/ui';
import ContactForm from './ContactForm';

const Contact = () => {
	return (
		<Section>
			<div>
				<div className="max-w-143.75 w-full mx-auto">
					<Typography className="mb-4 text-center" variant="h2">
						Contact
					</Typography>
					<Typography
						className="mb-9 text-center"
						size="2xl"
						weight="medium"
					>
						You can contact me via the form below or write me a DM on{' '}
						<a
							className="pb-0.5 border-b italic"
							href="https://www.instagram.com/kyoute_nailsriga"
							target="_blank"
							rel="noreferrer noopenner"
						>
							My Instagram
						</a>
						.
					</Typography>
					<ContactForm />
				</div>
			</div>
		</Section>
	);
};

export default Contact;

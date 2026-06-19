/**
 * @jest-environment jsdom
 */

import {screen, fireEvent, waitFor} from '@testing-library/react';
import {render} from '@/test.utils';
import ContactForm from '../ContactForm';
import userEvent from '@testing-library/user-event';

// Mock server action
jest.mock('@/lib/actions', () => ({
	sendContactEmail: jest.fn(),
}));

// Mock toast
jest.mock('@/lib/toast', () => ({
	toast: {
		error: jest.fn(),
		success: jest.fn(),
	},
}));

import {sendContactEmail} from '@/lib/actions';
import {toast} from '@/lib/toast';

const mockedAction = sendContactEmail as jest.Mock;

describe('ContactForm', () => {
	// --- rendering ---

	it('renders all fields', () => {
		render(<ContactForm />);
		expect(
			screen.getByPlaceholderText('Your email address'),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Your message')).toBeInTheDocument();
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
		expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument();
	});

	// --- blur validation ---

	it('shows email error on blur with empty value', async () => {
		render(<ContactForm />);
		const emailInput = screen.getByPlaceholderText('Your email address');
		fireEvent.blur(emailInput, {target: {value: ''}});
		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeInTheDocument();
		});
	});

	it('shows email error on blur with invalid email', async () => {
		render(<ContactForm />);
		const emailInput = screen.getByPlaceholderText('Your email address');
		fireEvent.blur(emailInput, {target: {value: 'notanemail'}});
		await waitFor(() => {
			expect(screen.getByText('Invalid email address')).toBeInTheDocument();
		});
	});

	it('clears email error when valid email is entered', async () => {
		render(<ContactForm />);
		const emailInput = screen.getByPlaceholderText('Your email address');
		fireEvent.blur(emailInput, {target: {value: 'notanemail'}});
		await waitFor(() => {
			expect(screen.getByText('Invalid email address')).toBeInTheDocument();
		});
		fireEvent.blur(emailInput, {target: {value: 'valid@email.com'}});
		await waitFor(() => {
			expect(
				screen.queryByText('Invalid email address'),
			).not.toBeInTheDocument();
		});
	});

	it('shows name error on blur with empty value', async () => {
		render(<ContactForm />);
		const nameInput = screen.getByPlaceholderText('Your name');
		fireEvent.blur(nameInput, {target: {value: ''}});
		await waitFor(() => {
			expect(screen.getByText('Name is required')).toBeInTheDocument();
		});
	});

	it('shows name error on blur with long name', async () => {
		render(<ContactForm />);
		const nameInput = screen.getByPlaceholderText('Your name');
		fireEvent.blur(nameInput, {target: {value: 'a'.repeat(101)}});
		await waitFor(() => {
			expect(
				screen.getByText('Name is too long (maximum 100 characters)'),
			).toBeInTheDocument();
		});
	});

	it('shows message error on blur with short message', async () => {
		render(<ContactForm />);
		const messageInput = screen.getByPlaceholderText('Your message');
		fireEvent.blur(messageInput, {target: {value: 'short'}});
		await waitFor(() => {
			expect(
				screen.getByText('Message is too short (minimum 10 characters)'),
			).toBeInTheDocument();
		});
	});

	it('shows message error on blur with long message', async () => {
		render(<ContactForm />);
		const messageInput = screen.getByPlaceholderText('Your message');
		fireEvent.blur(messageInput, {target: {value: 'a'.repeat(1001)}});
		await waitFor(() => {
			expect(
				screen.getByText('Message is too long (maximum 1000 characters)'),
			).toBeInTheDocument();
		});
	});

	it('shows privacy error when checkbox is unchecked', async () => {
		const user = userEvent.setup();
		render(<ContactForm />);
		const checkbox = screen.getByRole('checkbox');

		// First check it, then uncheck to trigger onChange with checked: false
		await user.click(checkbox); // check
		await user.click(checkbox); // uncheck

		await waitFor(() => {
			expect(
				screen.getByText('You must agree to the privacy policy'),
			).toBeInTheDocument();
		});
	});

	it('clears privacy error when checkbox is checked', async () => {
		const user = userEvent.setup();
		render(<ContactForm />);
		const checkbox = screen.getByRole('checkbox');

		await user.click(checkbox); // check
		await user.click(checkbox); // uncheck → shows error
		await waitFor(() => {
			expect(
				screen.getByText('You must agree to the privacy policy'),
			).toBeInTheDocument();
		});

		await user.click(checkbox); // check again → clears error
		await waitFor(() => {
			expect(
				screen.queryByText('You must agree to the privacy policy'),
			).not.toBeInTheDocument();
		});
	});

	// --- submit ---

	it('clears client errors on submit', async () => {
		mockedAction.mockResolvedValue(null);
		render(<ContactForm />);

		const emailInput = screen.getByPlaceholderText('Your email address');
		fireEvent.blur(emailInput, {target: {value: 'invalid'}});
		await waitFor(() => {
			expect(screen.getByText('Invalid email address')).toBeInTheDocument();
		});

		fireEvent.submit(
			screen.getByRole('button', {name: /send/i}).closest('form')!,
		);
		await waitFor(() => {
			expect(
				screen.queryByText('Invalid email address'),
			).not.toBeInTheDocument();
		});
	});

	it('shows success toast on successful submission', async () => {
		mockedAction.mockResolvedValue({success: true});
		render(<ContactForm />);
		fireEvent.submit(
			screen.getByRole('button', {name: /send/i}).closest('form')!,
		);
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith(
				'Message sent successfully',
			);
		});
	});

	it('shows error toast on failed submission', async () => {
		mockedAction.mockResolvedValue({error: 'Failed to send email'});
		render(<ContactForm />);
		fireEvent.submit(
			screen.getByRole('button', {name: /send/i}).closest('form')!,
		);
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Failed to send message. Please try again',
			);
		});
	});

	it('shows server validation errors', async () => {
		mockedAction.mockResolvedValue({
			errors: {
				email: {errors: ['email.invalid']},
			},
			values: {
				email: 'bad',
				name: 'John',
				message: 'Hello world',
				privacy: 'on',
			},
		});
		render(<ContactForm />);
		fireEvent.submit(
			screen.getByRole('button', {name: /send/i}).closest('form')!,
		);
		await waitFor(() => {
			expect(screen.getByText('Invalid email address')).toBeInTheDocument();
		});
	});
});

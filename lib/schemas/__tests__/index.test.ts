import {contactSchema} from '../';

const validData = {
	email: 'test@example.com',
	name: 'John Doe',
	message: 'This is a valid message',
	privacy: 'on' as const,
};

describe('contactSchema', () => {
	// --- valid ---

	it('passes with valid data', () => {
		expect(contactSchema.safeParse(validData).success).toBe(true);
	});

	// --- email ---

	it('fails when email is empty', () => {
		const result = contactSchema.safeParse({...validData, email: ''});
		expect(result.success).toBe(false);
	});

	it('fails when email is invalid', () => {
		const result = contactSchema.safeParse({
			...validData,
			email: 'notanemail',
		});
		expect(result.success).toBe(false);
	});

	it('passes with valid email', () => {
		const result = contactSchema.safeParse({
			...validData,
			email: 'valid@email.com',
		});
		expect(result.success).toBe(true);
	});

	// --- name ---

	it('fails when name is empty', () => {
		const result = contactSchema.safeParse({...validData, name: ''});
		expect(result.success).toBe(false);
	});

	it('fails when name exceeds 100 characters', () => {
		const result = contactSchema.safeParse({
			...validData,
			name: 'a'.repeat(101),
		});
		expect(result.success).toBe(false);
	});

	it('passes with name at max length', () => {
		const result = contactSchema.safeParse({
			...validData,
			name: 'a'.repeat(100),
		});
		expect(result.success).toBe(true);
	});

	// --- message ---

	it('fails when message is empty', () => {
		const result = contactSchema.safeParse({...validData, message: ''});
		expect(result.success).toBe(false);
	});

	it('fails when message is too short', () => {
		const result = contactSchema.safeParse({...validData, message: 'short'});
		expect(result.success).toBe(false);
	});

	it('passes when message is exactly 10 characters', () => {
		const result = contactSchema.safeParse({
			...validData,
			message: 'a'.repeat(10),
		});
		expect(result.success).toBe(true);
	});

	it('fails when message exceeds 1000 characters', () => {
		const result = contactSchema.safeParse({
			...validData,
			message: 'a'.repeat(1001),
		});
		expect(result.success).toBe(false);
	});

	it('passes with message at max length', () => {
		const result = contactSchema.safeParse({
			...validData,
			message: 'a'.repeat(1000),
		});
		expect(result.success).toBe(true);
	});

	// --- privacy ---

	it('fails when privacy is not checked', () => {
		const result = contactSchema.safeParse({...validData, privacy: 'off'});
		expect(result.success).toBe(false);
	});

	it('fails when privacy is missing', () => {
		const {privacy, ...rest} = validData;
		const result = contactSchema.safeParse(rest);
		expect(result.success).toBe(false);
	});

	it('passes when privacy is on', () => {
		const result = contactSchema.safeParse({...validData, privacy: 'on'});
		expect(result.success).toBe(true);
	});
});

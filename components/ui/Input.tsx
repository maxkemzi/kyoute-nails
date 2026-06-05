import {InputHTMLAttributes} from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			className="bg-background border border-border px-4 py-3 rounded-xl placeholder:text-background-foreground/50"
			{...props}
		/>
	);
};

export default Input;

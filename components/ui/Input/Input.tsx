import {InputHTMLAttributes} from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return <input className="border border-border p-4 rounded-2xl" {...props} />;
};

export default Input;

import {InputHTMLAttributes} from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return <input className="shadow-sm p-4 rounded-2xl" {...props} />;
};

export default Input;

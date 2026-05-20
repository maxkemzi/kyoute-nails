import {InputHTMLAttributes} from 'react';

const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<span className="relative flex items-center">
			<input
				className="peer absolute opacity-0 w-0 h-0"
				type="checkbox"
				{...props}
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
		</span>
	);
};

export default Checkbox;

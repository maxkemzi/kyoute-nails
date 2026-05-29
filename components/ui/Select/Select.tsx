'use client';

import {SelectHTMLAttributes} from 'react';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	options: {label: string; value: string}[];
}

const Select = ({className, options, ...rest}: Props) => {
	return (
		<div className="relative">
			<select
				className={twMerge(
					'w-full appearance-none pl-4 py-3 pr-11 border border-border rounded-xl bg-background cursor-pointer',
					className,
				)}
				{...rest}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown
				color="var(--color-background-foreground)"
				size={18}
				className="absolute right-4 top-1/2 -translate-y-1/2"
			/>
		</div>
	);
};

export default Select;

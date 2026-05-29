import {Select, Typography} from '@/components/ui';
import {SelectHTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	id: string;
	label: string;
	error?: string;
	wrapperClassName?: string;
	options: {label: string; value: string}[];
}

const SelectField = ({
	id,
	label,
	error,
	wrapperClassName,
	options,
	...selectProps
}: Props) => {
	return (
		<div className={twMerge('w-85 flex flex-col gap-2', wrapperClassName)}>
			<label htmlFor={id}>
				<Typography as="span" textTransform="uppercase">
					{label}
				</Typography>
			</label>
			<Select id={id} options={options} {...selectProps} />
			{error ? (
				<Typography color="danger" size="sm" as="span">
					{error}
				</Typography>
			) : null}
		</div>
	);
};

export default SelectField;

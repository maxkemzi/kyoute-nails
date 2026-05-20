import {InputHTMLAttributes} from 'react';
import {Checkbox, Typography} from '../../ui';
import {twMerge} from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	wrapperClassName?: string;
}

const CheckboxField = ({
	label,
	error,
	wrapperClassName,
	...inputProps
}: Props) => {
	return (
		<label
			className={twMerge(
				'flex flex-col gap-2 cursor-pointer',
				wrapperClassName,
			)}
		>
			<div className="flex gap-2 items-start">
				<Checkbox {...inputProps} />
				<Typography as="span">{label}</Typography>
			</div>
			{error ? (
				<Typography color="danger" size="sm" as="span">
					{error}
				</Typography>
			) : null}
		</label>
	);
};

export default CheckboxField;

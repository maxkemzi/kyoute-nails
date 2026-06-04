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
			<div className="flex flex-col gap-2">
				<Typography as="span" variant="body2" textTransform="uppercase">
					{label}
				</Typography>
				<div className="flex gap-2 items-center">
					<Checkbox {...inputProps} />
					<Typography as="span">Yes</Typography>
				</div>
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

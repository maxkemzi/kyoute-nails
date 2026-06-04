import {InputHTMLAttributes} from 'react';
import {Input, Typography} from '../../ui';
import {twMerge} from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	wrapperClassName?: string;
}

const FormField = ({label, error, wrapperClassName, ...inputProps}: Props) => {
	return (
		<label className={twMerge('flex flex-col gap-2', wrapperClassName)}>
			<Typography as="span" variant="body2" textTransform="uppercase">
				{label}
			</Typography>
			<Input {...inputProps} />
			{error ? (
				<Typography color="danger" size="sm" as="span">
					{error}
				</Typography>
			) : null}
		</label>
	);
};

export default FormField;

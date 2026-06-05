import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Option {
	label: string;
	value: string;
}

interface Props {
	id: string;
	label: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
	wrapperClassName?: string;
	name?: string;
}

const SelectField = ({
	id,
	label,
	options,
	value,
	onChange,
	className,
	wrapperClassName,
	name,
}: Props) => {
	return (
		<div className={twMerge('flex flex-col gap-2', wrapperClassName)}>
			{name ? <input type="hidden" name={name} value={value} /> : null}
			<Typography
				as="label"
				htmlFor={id}
				variant="body2"
				textTransform="uppercase"
			>
				{label}
			</Typography>
			<Dropdown
				className={className}
				trigger={
					<button
						id={id}
						className="flex justify-between items-center gap-1.5 w-full px-4 py-3 border border-border rounded-xl bg-background"
					>
						<Typography as="span" textTransform="capitalize">
							{value}
						</Typography>
						<ChevronDown size={16} />
					</button>
				}
				value={value}
			>
				{options.map(o => (
					<DropdownItem
						key={o.value}
						buttonClassName="px-4"
						onSelect={onChange}
						value={o.value}
					>
						{o.label}
					</DropdownItem>
				))}
			</Dropdown>
		</div>
	);
};

export default SelectField;

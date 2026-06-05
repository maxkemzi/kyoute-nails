import {ReactNode} from 'react';
import Typography from '../Typography/Typography';
import {useDropdownContext} from './dropdownContext';
import {twMerge} from 'tailwind-merge';

interface Props {
	typographyClassName?: string;
	buttonClassName?: string;
	children?: ReactNode;
	onSelect?: (value: string) => void;
	value: string;
}

const DropdownItem = ({
	typographyClassName,
	buttonClassName,
	children,
	onSelect,
	value,
}: Props) => {
	const {value: selectedValue, onClose} = useDropdownContext();
	const isSelected = value === selectedValue;

	const handleSelect = () => {
		onSelect?.(value);
		onClose?.();
	};

	return (
		<li role="menuitem">
			<button
				className={twMerge(
					'w-full text-left px-3 py-1.5 hover:text-primary',
					isSelected && 'text-primary',
					buttonClassName,
				)}
				onClick={handleSelect}
				disabled={isSelected}
				aria-disabled={isSelected}
				aria-current={isSelected ? 'true' : undefined}
				tabIndex={isSelected ? -1 : 0}
			>
				<Typography
					className={typographyClassName}
					textTransform="capitalize"
					color="inherit"
					noWrap
				>
					{children}
				</Typography>
			</button>
		</li>
	);
};

export default DropdownItem;

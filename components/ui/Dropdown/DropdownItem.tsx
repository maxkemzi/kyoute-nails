import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	typographyClassName?: string;
	children?: ReactNode;
	onSelect?: () => void;
	isDisabled?: boolean;
}

const DropdownItem = ({
	typographyClassName,
	children,
	onSelect,
	isDisabled,
}: Props) => {
	return (
		<li>
			<button
				className="w-full text-left px-2 py-1 hover:text-primary"
				onClick={onSelect}
				disabled={isDisabled}
			>
				<Typography
					className={typographyClassName}
					variant="body2"
					textTransform="capitalize"
					color="inherit"
				>
					{children}
				</Typography>
			</button>
		</li>
	);
};

export default DropdownItem;

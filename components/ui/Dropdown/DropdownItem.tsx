import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
	onSelect?: () => void;
	isDisabled?: boolean;
}

const DropdownItem = ({children, onSelect, isDisabled}: Props) => {
	return (
		<li>
			<button
				className="px-2 py-1 hover:text-primary"
				onClick={onSelect}
				disabled={isDisabled}
			>
				<Typography
					variant="body2"
					textTransform="uppercase"
					color="inherit"
				>
					{children}
				</Typography>
			</button>
		</li>
	);
};

export default DropdownItem;

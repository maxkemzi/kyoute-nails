import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
}

const DropdownItem = ({children}: Props) => {
	return (
		<li>
			<button className="px-2 py-1 hover:text-primary">
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

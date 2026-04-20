import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
}

const Button = (props: Props) => {
	const {children} = props;

	return (
		<button
			className="bg-background shadow-sm py-3.5 px-7 transition-colors rounded-xl duration-300 hover:bg-primary hover:text-primary-foreground"
			type="button"
		>
			<Typography
				className="transition-colors duration-300"
				as="span"
				weight="semibold"
				textTransform="uppercase"
				color="inherit"
			>
				{children}
			</Typography>
		</button>
	);
};

export default Button;

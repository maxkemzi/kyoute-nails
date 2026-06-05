import {Typography} from '@/components/ui';
import Link, {LinkProps} from 'next/link';
import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
}

const NavLink = ({children, href}: Props) => {
	return (
		<Link href={href}>
			<Typography color="inherit" textTransform="uppercase" as="span">
				{children}
			</Typography>
		</Link>
	);
};

export default NavLink;

import {NavigationLink} from '@/components';
import {Typography} from '@/components/ui';
import {LinkProps} from 'next/link';
import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
}

const NavLink = ({children, href}: Props) => {
	return (
		<NavigationLink href={href}>
			<Typography color="inherit" textTransform="uppercase" as="span">
				{children}
			</Typography>
		</NavigationLink>
	);
};

export default NavLink;

'use client';

import {NavigationLink} from '@/components';
import {Typography} from '@/components/ui';
import {LinkProps} from 'next/link';
import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
	onClick?: () => void;
}

const NavLink = ({children, href, onClick}: Props) => {
	return (
		<NavigationLink
			className="relative inline-block py-4 hover:text-primary hover:after:w-full hover:after:opacity-100 after:content-[''] after:absolute after:transition-all after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-primary after:opacity-0 max-md:py-1.5"
			activeClassName="text-primary after:w-full after:opacity-100"
			href={href}
			onClick={onClick}
		>
			<Typography
				className="transition-colors"
				color="inherit"
				textTransform="uppercase"
				as="span"
			>
				{children}
			</Typography>
		</NavigationLink>
	);
};

export default NavLink;

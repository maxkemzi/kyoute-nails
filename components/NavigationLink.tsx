'use client';

import {Link} from '@/app/i18n/navigation';
import {useSelectedLayoutSegment} from 'next/navigation';
import {ComponentProps} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props extends ComponentProps<typeof Link> {
	activeClassName?: string;
}

const NavigationLink = ({href, className, activeClassName, ...rest}: Props) => {
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
	const isActive = pathname === href;

	return (
		<Link
			className={twMerge(className, isActive && activeClassName)}
			aria-current={isActive ? 'page' : undefined}
			href={href}
			{...rest}
		/>
	);
};

export default NavigationLink;

import {getTranslations} from 'next-intl/server';
import NavigationLink from './NavigationLink';
import {Logo, ResponsiveIcon} from './ui';
import {ComponentProps} from 'react';

interface Props {
	className?: string;
	logoColor?: ComponentProps<typeof Logo>['color'];
}

const LogoLink = async ({className, logoColor}: Props) => {
	const t = await getTranslations('LogoLink');

	return (
		<NavigationLink
			className={className}
			href="/"
			aria-label={t('goToHomePage')}
		>
			<ResponsiveIcon
				icon={Logo}
				color={logoColor}
				size={286}
				mdSize={200}
				xsSize={150}
			/>
		</NavigationLink>
	);
};

export default LogoLink;

import {ComponentProps, ComponentType} from 'react';
import {twMerge} from 'tailwind-merge';

interface BaseIconProps {
	className?: string;
	size?: number;
}

type Props<T extends ComponentType<BaseIconProps>> = {
	icon: T;
	mdSize?: number;
	smSize?: number;
	xsSize?: number;
} & ComponentProps<T>;

const ResponsiveIcon = <T extends ComponentType<BaseIconProps>>({
	className,
	icon,
	size,
	mdSize,
	smSize,
	xsSize,
	...rest
}: Props<T>) => {
	const effectiveMd = mdSize ?? size;
	const effectiveSm = smSize ?? effectiveMd;
	const effectiveXs = xsSize ?? effectiveSm;

	const Icon = icon as ComponentType<BaseIconProps>;

	return (
		<>
			<Icon
				{...rest}
				className={twMerge('max-md:hidden', className)}
				size={size}
			/>
			<Icon
				{...rest}
				className={twMerge('hidden max-md:block max-sm:hidden', className)}
				size={effectiveMd}
			/>
			<Icon
				{...rest}
				className={twMerge('hidden max-sm:block max-xs:hidden', className)}
				size={effectiveSm}
			/>
			<Icon
				{...rest}
				className={twMerge('hidden max-xs:block', className)}
				size={effectiveXs}
			/>
		</>
	);
};

export default ResponsiveIcon;

import {ComponentPropsWithoutRef, ElementType} from 'react';
import {twMerge} from 'tailwind-merge';
import {
	ALIGN_TO_CLASS_NAME_MAP,
	COLOR_TO_CLASS_NAME_MAP,
	LETTER_SPACING_TO_CLASS_NAME_MAP,
	SIZE_TO_CLASS_NAME_MAP,
	TEXT_TRANSFORM_TO_CLASS_NAME_MAP,
	VARIANT_TO_ELEMENT_MAP,
	VARIANT_TO_STYLES_MAP,
	WEIGHT_TO_CLASS_NAME_MAP,
} from './constants';
import {
	Align,
	Color,
	LetterSpacing,
	Size,
	TextTransform,
	Variant,
	Weight,
} from './types';

interface CustomProps<T extends ElementType = 'p'> {
	as?: T;
	variant?: Variant;
	size?: Size;
	weight?: Weight;
	color?: Color;
	letterSpacing?: LetterSpacing;
	textTransform?: TextTransform;
	align?: Align;
	truncate?: boolean;
	noWrap?: boolean;
	italic?: boolean;
}

type Props<T extends ElementType = 'p'> = CustomProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof CustomProps<T>>;

const Typography = <T extends ElementType = 'p'>({
	className,
	as,
	variant = 'body1',
	align,
	truncate,
	noWrap,
	italic,
	children,
	size: sizeProp,
	weight: weightProp,
	color: colorProp,
	letterSpacing: letterSpacingProp,
	textTransform: textTransformProp,
	...rest
}: Props<T>) => {
	const Element = as ?? VARIANT_TO_ELEMENT_MAP[variant];
	const variantStyles = VARIANT_TO_STYLES_MAP[variant];

	const size = sizeProp ?? variantStyles.size;
	const weight = weightProp ?? variantStyles.weight;
	const color = colorProp ?? variantStyles.color;
	const letterSpacing = letterSpacingProp ?? variantStyles.letterSpacing;
	const textTransform = textTransformProp ?? variantStyles.textTransform;

	return (
		<Element
			className={twMerge(
				size && SIZE_TO_CLASS_NAME_MAP[size],
				weight && WEIGHT_TO_CLASS_NAME_MAP[weight],
				color && COLOR_TO_CLASS_NAME_MAP[color],
				letterSpacing && LETTER_SPACING_TO_CLASS_NAME_MAP[letterSpacing],
				textTransform && TEXT_TRANSFORM_TO_CLASS_NAME_MAP[textTransform],
				align && ALIGN_TO_CLASS_NAME_MAP[align],
				truncate && 'truncate',
				noWrap && 'text-nowrap',
				italic && 'italic',
				className,
			)}
			{...rest}
		>
			{children}
		</Element>
	);
};

export type {Props as TypographyProps};
export default Typography;

import {ElementType, ReactNode} from 'react';
import {
	Size,
	Variant,
	Weight,
	Color,
	LetterSpacing,
	TextTransform,
	Align,
} from './types';
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
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
	as?: ElementType;
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
	children?: ReactNode;
}

const Typography = (props: Props) => {
	const {
		className,
		as,
		variant = 'body1',
		align,
		truncate,
		noWrap,
		italic,
		children,
	} = props;

	const Element = as ?? VARIANT_TO_ELEMENT_MAP[variant];

	const variantStyles = VARIANT_TO_STYLES_MAP[variant];

	let {size, weight, color, letterSpacing, textTransform} = props;
	size = size ?? variantStyles.size;
	weight = weight ?? variantStyles.weight;
	color = color ?? variantStyles.color;
	letterSpacing = letterSpacing ?? variantStyles.letterSpacing;
	textTransform = textTransform ?? variantStyles.textTransform;

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
		>
			{children}
		</Element>
	);
};

export type {Props as TypographyProps};
export default Typography;

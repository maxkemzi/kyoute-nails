import {ElementType} from 'react';
import {
	Align,
	Color,
	LetterSpacing,
	Size,
	TextTransform,
	Variant,
	Weight,
} from './types';

const VARIANT_TO_ELEMENT_MAP: Record<Variant, ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	body1: 'p',
	body2: 'p',
	body3: 'p',
	inherit: 'span',
} as const;

const VARIANT_TO_STYLES_MAP: Record<
	Variant,
	Partial<{
		size: Size;
		weight: Weight;
		color: Color;
		letterSpacing: LetterSpacing;
		textTransform: TextTransform;
	}>
> = {
	h1: {
		size: '7xl',
		weight: 'bold',
		color: 'backgroundForeground',
		textTransform: 'capitalize',
	},
	h2: {
		size: '6xl',
		weight: 'bold',
		color: 'backgroundForeground',
		textTransform: 'capitalize',
	},
	h3: {
		size: '5xl',
		weight: 'semibold',
		color: 'backgroundForeground',
		textTransform: 'capitalize',
	},
	h4: {
		size: '2xl',
		weight: 'semibold',
		color: 'backgroundForeground',
		textTransform: 'capitalize',
	},
	body1: {
		size: 'base',
		weight: 'normal',
		color: 'backgroundForeground',
	},
	body2: {
		size: 'sm',
		weight: 'normal',
		color: 'backgroundForeground',
	},
	body3: {
		size: 'xs',
		weight: 'normal',
		color: 'backgroundForeground',
	},
	inherit: {
		size: 'inherit',
		weight: 'inherit',
		color: 'inherit',
		letterSpacing: 'inherit',
		textTransform: 'inherit',
	},
} as const;

const SIZE_TO_CLASS_NAME_MAP: Record<Size, string> = {
	'7xl': 'text-7xl max-lg:text-5xl max-md:text-4xl max-xs:text-3xl',
	'6xl': 'text-6xl max-lg:text-5xl max-md:text-4xl max-xs:text-3xl',
	'5xl': 'text-5xl max-lg:text-4xl max-md:text-3xl max-xs:text-2xl',
	'2xl': 'text-2xl max-lg:text-xl max-md:text-lg max-xs:text-base',
	base: 'text-base max-xs:text-sm',
	sm: 'text-sm max-xs:text-xs',
	xs: 'text-xs',
	inherit: '[font-size:inherit]',
} as const;

const WEIGHT_TO_CLASS_NAME_MAP: Record<Weight, string> = {
	bold: 'font-bold',
	semibold: 'font-semibold',
	medium: 'font-medium',
	normal: 'font-normal',
	inherit: '[font-weight:inherit]',
} as const;

const COLOR_TO_CLASS_NAME_MAP: Record<Color, string> = {
	primary: 'text-primary',
	primaryForeground: 'text-primary-foreground',

	secondary: 'text-secondary',
	secondaryForeground: 'text-secondary-foreground',

	background: 'text-background',
	backgroundForeground: 'text-background-foreground',

	danger: 'text-danger',
	dangerForeground: 'text-danger-foreground',

	success: 'text-success',
	successForeground: 'text-success-foreground',

	info: 'text-info',
	infoForeground: 'text-info-foreground',

	warning: 'text-warning',
	warningForeground: 'text-warning-foreground',

	inherit: '[color:inherit]',
} as const;

const LETTER_SPACING_TO_CLASS_NAME_MAP: Record<LetterSpacing, string> = {
	widest: 'tracking-widest',
	wider: 'tracking-wider',
	wide: 'tracking-wide',
	normal: 'tracking-normal',
	inherit: '[letter-spacing:inherit]',
} as const;

const TEXT_TRANSFORM_TO_CLASS_NAME_MAP: Record<TextTransform, string> = {
	uppercase: 'uppercase',
	capitalize: 'capitalize',
	lowercase: 'lowercase',
	none: 'normal-case',
	inherit: '[text-transform:inherit]',
} as const;

const ALIGN_TO_CLASS_NAME_MAP: Record<Align, string> = {
	right: 'text-right',
	center: 'text-center',
	left: 'text-left',
	inherit: '[text-align:inherit]',
} as const;

export {
	VARIANT_TO_ELEMENT_MAP,
	VARIANT_TO_STYLES_MAP,
	SIZE_TO_CLASS_NAME_MAP,
	WEIGHT_TO_CLASS_NAME_MAP,
	COLOR_TO_CLASS_NAME_MAP,
	LETTER_SPACING_TO_CLASS_NAME_MAP,
	TEXT_TRANSFORM_TO_CLASS_NAME_MAP,
	ALIGN_TO_CLASS_NAME_MAP,
};

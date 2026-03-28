import {Color as ThemeColor} from '../types';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'inherit';

type Size = '7xl' | '6xl' | '5xl' | '2xl' | 'base' | 'sm' | 'inherit';

type Weight = 'bold' | 'semibold' | 'medium' | 'normal' | 'inherit';

type Color = ThemeColor;

type LetterSpacing = 'widest' | 'wider' | 'wide' | 'normal' | 'inherit';

type TextTransform =
	| 'uppercase'
	| 'capitalize'
	| 'lowercase'
	| 'none'
	| 'inherit';

type Align = 'right' | 'center' | 'left' | 'inherit';

export type {Variant, Size, Weight, Color, LetterSpacing, TextTransform, Align};

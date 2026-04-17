import {Color} from '../types';

export const COLOR_TO_FILL_CLASS_NAME_MAP: Record<Color, string> = {
	primary: 'fill-primary',
	primaryForeground: 'fill-primary-foreground',

	secondary: 'fill-secondary',
	secondaryForeground: 'fill-secondary-foreground',

	background: 'fill-background',
	backgroundForeground: 'fill-background-foreground',

	danger: 'fill-danger',
	dangerForeground: 'fill-danger-foreground',

	success: 'fill-success',
	successForeground: 'fill-success-foreground',

	info: 'fill-info',
	infoForeground: 'fill-info-foreground',

	warning: 'fill-warning',
	warningForeground: 'fill-warning-foreground',

	inherit: '[color:inherit]',
} as const;

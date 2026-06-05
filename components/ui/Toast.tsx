import {AlertCircle, CheckCircle, Icon, Info} from 'react-feather';
import {twMerge} from 'tailwind-merge';
import Typography, {TypographyProps} from './Typography/Typography';

interface Props {
	id: string | number;
	title: string;
	variant: 'error' | 'success' | 'info';
}

const VARIANT_TO_ICON_MAP: Record<Props['variant'], Icon> = {
	error: AlertCircle,
	success: CheckCircle,
	info: Info,
};

const VARIANT_TO_ICON_COLOR_MAP: Record<Props['variant'], string> = {
	error: 'var(--color-danger)',
	success: 'var(--color-success)',
	info: 'var(--color-info)',
};

const VARIANT_TO_TITLE_COLOR_MAP: Record<
	Props['variant'],
	TypographyProps['color']
> = {error: 'danger', success: 'success', info: 'info'};

const VARIANT_TO_BG_MAP: Record<Props['variant'], string> = {
	error: 'bg-danger/15',
	success: 'bg-success/15',
	info: 'bg-info/15',
};

const VARIANT_TO_BORDER_COLOR_MAP: Record<Props['variant'], string> = {
	error: 'border-danger/30',
	success: 'border-success/30',
	info: 'border-info/30',
};

const Toast = ({title, variant}: Props) => {
	const Icon = VARIANT_TO_ICON_MAP[variant];

	return (
		<div
			className={twMerge(
				'w-80 overflow-hidden bg-background rounded-xl border',
				VARIANT_TO_BORDER_COLOR_MAP[variant],
			)}
		>
			<div
				className={twMerge(
					'py-3 px-4 flex items-center gap-4',
					VARIANT_TO_BG_MAP[variant],
				)}
			>
				<Icon
					className="shrink-0"
					color={VARIANT_TO_ICON_COLOR_MAP[variant]}
					size={18}
				/>
				<Typography
					color={VARIANT_TO_TITLE_COLOR_MAP[variant]}
					weight="medium"
				>
					{title}
				</Typography>
			</div>
		</div>
	);
};

export default Toast;
export type {Props as ToastProps};

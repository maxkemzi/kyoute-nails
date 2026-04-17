import Image from 'next/image';

interface Props {
	src: string;
}

const NailsImage = ({src}: Props) => {
	return (
		<div className="relative flex-1/3 h-125 rounded-3xl overflow-hidden">
			<Image fill src={src} objectFit="cover" alt="nails" />
		</div>
	);
};

export default NailsImage;

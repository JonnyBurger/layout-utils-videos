import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {measureText} from '@remotion/layout-utils';

const fontFamily = 'GT Planar, Helvetica';
const fontSize = 100;

export const MeasureText = () => {
	const frame = useCurrentFrame();
	const text = 'measureText()'.substring(0, Math.round(frame / 4) + 2);
	const measured = measureText({text, fontFamily, fontSize});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				fontFamily,
				justifyContent: 'center',
				alignItems: 'center',
				fontSize,
			}}
		>
			<div
				style={{
					transform: 'translateY(-30px)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
				}}
			>
				<div
					style={{
						backgroundColor: '#0A83F2',
						fontSize: 20,
						display: 'inline-block',
						lineHeight: 1,
						padding: '12px 20px',
						color: 'white',
						transform: 'translateY(4px)',
					}}
				>
					{Math.ceil(measured.width)}x{measured.height}
				</div>
				<div
					style={{border: '3px solid #0A83F2', whiteSpace: 'pre', padding: 7}}
				>
					{text}
				</div>
			</div>
		</AbsoluteFill>
	);
};

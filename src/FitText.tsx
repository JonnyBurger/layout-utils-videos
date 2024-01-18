import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {fitText} from './fit-text';

const fontFamily = 'GT Planar, Helvetica';
const fontSize = 100;
const width = 800;

export const FitText = () => {
	const frame = useCurrentFrame();
	const text =
		'Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'.substring(
			0,
			Math.round(frame / 4) + 2
		);
	const measured = Math.min(
		90,
		fitText({text, fontFamily, withinWidth: width})
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					fontFamily,
					justifyContent: 'center',
					alignItems: 'center',
					fontSize,
					marginTop: -100,
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
							transform: 'translateY(3px)',
						}}
					>
						{Math.ceil(width)}px
					</div>
					<div
						style={{
							border: '3px solid #0A83F2',
							whiteSpace: 'pre',
							padding: 7,
							fontSize: measured,
						}}
					>
						<div
							style={{
								height: 90,
								display: 'flex',
								alignItems: 'center',
								width,
								paddingTop: 10,
								paddingBottom: 10,
							}}
						>
							{text}
						</div>
					</div>
					<div
						style={{
							fontSize: 30,
							position: 'absolute',
							left: 0,
							top: 300,
							whiteSpace: 'pre',
						}}
					>
						{`
fitText({\n  text: '${text}',\n  fontFamily: '${fontFamily}',\n  withinWidth: ${width}\n})`}
						<span style={{opacity: 0.5, fontVariantNumeric: 'tabular-nums'}}>
							{`
// { fontSize: ${measured.toFixed(3)} }`}
						</span>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

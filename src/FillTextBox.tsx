import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {fillTextBox, measureText} from '@remotion/layout-utils';
import React, {useMemo} from 'react';

const fontFamily = 'GT Planar, Helvetica';
const fontSize = 100;
const lineHeight = 1.2;

const width = 800;

const fullText =
	'Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
const words = fullText.split(' ');

type Word = {
	text: string;
	hidden: boolean;
	index: number;
	start: number;
	exceedsBox: boolean;
	newLine: boolean;
	offsetLeft: number;
	isAfterNewLine: boolean;
};

const delay = 80;

const Layout: React.FC<{
	line: Word[];
	delay: number;
	noBorder: boolean;
}> = ({line, delay, noBorder}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const width = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
		delay,
		durationInFrames: 10,
	});

	return (
		<div
			key={line.map((l) => l.text).join('')}
			style={{
				borderBottom: noBorder ? '' : '4px solid #0A83F2',
				width: interpolate(width, [0, 1], [0, 100]) + '%',
			}}
		>
			{/**
			 * Zero width space to prevent the browser from collapsing
			 */}
			<span>​</span>
			{line.map((word) => {
				return (
					<Sequence key={word.text} layout="none" from={word.start}>
						<WordComp word={word} />
					</Sequence>
				);
			})}
		</div>
	);
};

export const FillTextBox = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const layout = useMemo(() => {
		const lines: Word[][] = [[]];

		const box = fillTextBox({maxBoxWidth: width, maxLines: 4});
		let i = 0;
		let start = delay;
		let offsetLeft = 0;
		for (const word of words) {
			const {exceedsBox, newLine} = box.add({
				text: word + ' ',
				fontFamily,
				fontSize,
			});

			lines[lines.length - 1].push({
				text: word + ' ',
				hidden: newLine || exceedsBox,
				index: i++,
				start,
				exceedsBox,
				newLine,
				offsetLeft,
				isAfterNewLine: false,
			});
			offsetLeft += measureText({text: word + ' ', fontFamily, fontSize}).width;
			start += word.length * 3;
			if (exceedsBox) {
				break;
			}

			if (newLine) {
				offsetLeft = 0;
				start += 30;

				lines.push([
					{
						text: word + ' ',
						hidden: false,
						index: i++,
						start,
						exceedsBox,
						newLine,
						offsetLeft,
						isAfterNewLine: true,
					},
				]);
				offsetLeft += measureText({
					text: word + ' ',
					fontFamily,
					fontSize,
				}).width;

				start += word.length * 3;
			}
		}
		return lines;
	}, []);

	const spr = spring({
		fps,
		frame,
		config: {damping: 200},
	});

	return (
		<AbsoluteFill>
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
						transform: 'translateY(-170px)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
						scale: String(spr),
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
						{Math.ceil(width)}px
					</div>
					<div
						style={{
							border: '4px solid #0A83F2',
							whiteSpace: 'pre',
							width,
							lineHeight,
						}}
					>
						{layout.map((line, i) => {
							return (
								<Layout noBorder={i === 3} delay={i * 10 + 20} line={line} />
							);
						})}
					</div>
				</div>
			</AbsoluteFill>
			<AbsoluteFill style={{}}>
				{layout.flat(1).map((l) => {
					return (
						<Sequence key={l.start} layout="none" from={l.start}>
							<div
								style={{
									left: 140,
									width: 900,
									height: 320,
									bottom: 0,
									position: 'absolute',
									backgroundColor: 'white',
									fontSize: 40,
									fontFamily: 'GT Planar',
								}}
							>
								box.add("{l.text.trim()}")
								<div style={{color: 'rgba(0, 0, 0, 0.5)'}}>
									<span>
										{`// { `}
										<span
											style={{color: l.exceedsBox ? '#0A83F2' : undefined}}
										>{`exceedsBox: ${l.exceedsBox}`}</span>
										,{' '}
										<span
											style={{color: l.newLine ? '#0A83F2' : undefined}}
										>{`newLine: ${l.newLine}`}</span>
										{' }'}
									</span>
								</div>
							</div>
						</Sequence>
					);
				})}
			</AbsoluteFill>
			<AbsoluteFill style={{}}>
				<Sequence layout="none" durationInFrames={delay}>
					<div
						style={{
							left: 140,
							width: 900,
							height: 320,
							bottom: 0,
							position: 'absolute',
							backgroundColor: 'white',
							fontSize: 40,
							fontFamily: 'GT Planar',
							whiteSpace: 'pre',
						}}
					>
						{`const box = fillTextBox({\n  maxBoxWidth: ${width},\n  maxLines: 4\n});`}
					</div>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const WordComp: React.FC<{
	word: Word;
}> = ({word}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const texToDisplay = word.isAfterNewLine
		? word.text
		: word.text.substring(0, Math.round(frame / 2) + 1);

	const hide = word.hidden
		? spring({
				fps,
				frame,
				config: {damping: 200},
				durationInFrames: 20,
				delay: word.text.length * 2 + 10,
		  })
		: 0;

	const translateY = word.exceedsBox
		? 0
		: hide * fontSize * lineHeight + 4 * hide;
	const translateX = word.exceedsBox ? 0 : word.offsetLeft * hide * -1;
	const filter = hide && word.exceedsBox ? `blur(${hide * 40}px)` : 'none';
	const opacity = word.isAfterNewLine
		? spring({
				fps,
				frame,
				config: {damping: 200},
		  })
		: word.exceedsBox
		? 1 - hide
		: 1;

	return (
		<span
			style={{
				color: word.hidden ? 'rgba(0, 0, 0, 0.5)' : 'black',
				whiteSpace: 'pre',
				fontFamily: 'GT Planar',
				display: 'inline-block',
				filter,
				opacity,
				transform: `translateX(${translateX}px) translateY(${translateY}px)`,
			}}
		>
			{texToDisplay}
		</span>
	);
};

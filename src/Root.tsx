import {Composition} from 'remotion';
import {FillTextBox} from './FillTextBox';
import {FitText} from './FitText';
import {MeasureText} from './MeasureText';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MeasureText"
				component={MeasureText}
				durationInFrames={120}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="FillTextBox"
				component={FillTextBox}
				durationInFrames={500}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="FitText"
				component={FitText}
				durationInFrames={500}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};

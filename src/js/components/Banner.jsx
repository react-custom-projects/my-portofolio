import React from 'react';
import Typewriter from './UI/Typewriter';

const Banner = () => (
	<div className=" banner">
		<div className="bg">
			<div className="quote">
				<h1>Hi, my name is Adam!</h1>
				<Typewriter
					sentencesText={[
						'I am a software developer.',
						'I am creative.',
						'I Love design.',
						'I am your next web guy.',
					]}
					typingSpeed={100}
					isInfinite={true}
				/>
			</div>
		</div>
	</div>
);

export default Banner;

import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import CSSAnimationQueuer from '../../Containers/EventContainers/CSSAnimationQueuer';

import { scene1Styles } from '../../../styles/scenes';

import ominousBackground from '../__resources/images/ominous-background.svg';

const Scene1 = React.createClass({
	componentWillMount() {
		document.body.style.overflowY = 'hidden';

		this.backgroundEvents = [
			function (target) {
				target.style.opacity = 1;
			}
		];

		this.monitorSVG = <img className={scene1Styles.monitorSvg} src={require('../__resources/images/monitor.svg')}/>;
		this.monitorSideSVG = <img className={scene1Styles.monitorSideSvg} src={require('../__resources/images/monitor-side.svg')}/>;
		this.uglyGIF = <img className={scene1Styles.uglyGif} src={require('../__resources/images/ugly.gif')}/>;
	},

	render() {
		return (
			<div>
				<DeferredEventExecutor
					moments={[1]}
					events={this.backgroundEvents}
				>
					<div
						style={{
							opacity: 0,
							transition: '1000ms',
							backgroundImage: `url(${ominousBackground})`,
							backgroundSize: 'cover',
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							zIndex: -10
						}}
					>
					</div>
				</DeferredEventExecutor>
				
				<ResponsiveContainer>
					<div className={scene1Styles.monitor}>
						{this.monitorSVG}
						{this.monitorSideSVG}
						{this.monitorSideSVG}
						{this.monitorSideSVG}
						{this.monitorSideSVG}
						{this.monitorSideSVG}
						{this.uglyGIF}
					</div>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default Scene1;
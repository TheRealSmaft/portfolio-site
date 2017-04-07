import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';
import Cube from '../../Containers/3DContainers/Cube';

import CSSAnimationQueuer from '../../Containers/EventContainers/CSSAnimationQueuer';

import { scene1Styles } from '../../../styles/scenes';

import ominousBackground from '../__resources/images/ominous-background.svg';
import uglyGif from '../__resources/images/ugly.gif';

const Scene1 = React.createClass({
	componentWillMount() {
		document.body.style.overflow = 'hidden';
		this.backgroundEvents = [
			function (target) {
				target.style.opacity = 0;
			},

			function (target) {
				target.style.display = 'none';
			}
		];

		this.monitorSide = (
			<div>
				<img 
					className={scene1Styles.monitorSide}
					src={require('../__resources/images/monitorSide.svg')}
				/>
			</div>
		);

		this.monitorFaces = [
			(
				<div>
					<img 
						className={scene1Styles.monitorSvg} 
						src={require('../__resources/images/monitor.svg')}
						style={{
							backgroundImage: `url(${uglyGif})`
						}}
					/>
				</div>
			),
		]

		for(var i = 0; i < 5; i++) {
			this.monitorFaces.push(this.monitorSide);
		}
	},

	render() {
		return (
			<div>
				<DeferredEventExecutor
					moments={[1, 6]}
					events={this.backgroundEvents}
				>
					<div
						style={{
							opacity: 1,
							transition: '3000ms ease-in',
							backgroundColor: 'black',
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							zIndex: 10
						}}
					>
					</div>
				</DeferredEventExecutor>
				
				<div
					className={scene1Styles.ominousBackground}
					style={{backgroundImage: `url(${ominousBackground})`}}
				>
				</div>
				<ResponsiveContainer className={scene1Styles.scene}>
					<Cube
						dimensions={[200, 130, 200]}
						worldSize={window.innerWidth * .10}
						responsive={false}
						faces={this.monitorFaces}
					>
					</Cube>

				</ResponsiveContainer>
			</div>
		)
	}
});

export default Scene1;

// <div className={scene1Styles.monitor}>
// 						<div>
// 							<div>
// 								{this.monitorSVG}
// 								{this.uglyGIF}
// 							</div>
// 							<div className={scene1Styles.monitorLeft}>
// 							</div>
// 						</div>
// 					</div>
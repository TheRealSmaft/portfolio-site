import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';
import CSSAnimationQueuer from '../../Containers/EventContainers/CSSAnimationQueuer';
import Scene1_3DScene from './3DScene';

import { scene1Styles } from '../../../styles/scenes';
import { style3D } from '../../../styles/3DContainer';

import ominousBackground from '../__resources/images/ominous-background.svg';

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

		this.threeDEvents = [
			function (target, animation, reactTarget) {
				var monitor = reactTarget.refs.monitor;
				var monitorTransform = [
					{
						prop: 'rotate',
						val: [0, -455, 0]
					}
				]

				monitor.updateTransform(monitorTransform);

				var boxGroup = reactTarget.refs.boxGroup;
				var boxGroupTransform = [
					{
						prop: 'rotate',
						val: [0, 180, 0]
					},
					{
						prop: 'translate',
						val: [-100, -100, 0]
					}
				]

				boxGroup.updateTransform(boxGroupTransform);
			},

			function (target, animation, reactTarget) {
				var boxGroup = reactTarget.refs.boxGroup;
				var boxGroupTransform = [
					{
						prop: 'rotate',
						val: [0, 270, 180]
					}
				]

				boxGroup.updateTransform(boxGroupTransform);
			}
		];
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
				<ResponsiveContainer>
					<DeferredEventExecutor
						moments={[3, 7]}
						events={this.threeDEvents}
					>
						<Scene1_3DScene />
					</DeferredEventExecutor>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default Scene1;
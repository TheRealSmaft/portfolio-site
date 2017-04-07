import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import CSSAnimationQueuer from '../../Containers/EventContainers/CSSAnimationQueuer';

import { testStyles } from '../../../styles/scenes';

import ominousBackground from '../__resources/images/ominous-background.svg';

const TestScene = React.createClass({
	componentWillMount() {
		document.body.style.overflowY = 'hidden';

		this.backgroundEvents = [
			function (target) {
				target.style.opacity = 1;
			}
		];

		this.letterH = {
			name: 'letterH',
			width: '50px'
		};

		this.letterO = {
			name: 'letterO',
			width: '50px'
		};

		this.letterM = {
			name: 'letterM',
			width: '50px'
		};
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
					<CSSAnimationQueuer
						queueCount={8}
						animationClass={testStyles.HFall}
					>
						<Collectable
							item={this.letterH}
						/>
					</CSSAnimationQueuer>
					<CSSAnimationQueuer
						queueCount={11}
						animationClass={testStyles.OFall}
					>
						<Collectable
							item={this.letterO}
						/>
					</CSSAnimationQueuer>
					<CSSAnimationQueuer
						queueCount={9}
						animationClass={testStyles.MFall}
					>
						<Collectable
							item={this.letterM}
						/>
					</CSSAnimationQueuer>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default TestScene;
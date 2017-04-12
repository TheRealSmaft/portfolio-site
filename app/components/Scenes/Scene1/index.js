import React from 'react';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';
import CSSAnimationQueuer from '../../Containers/EventContainers/CSSAnimationQueuer';

import { scene1Styles } from '../../../styles/scenes';

import ominousBackground from '../__resources/images/ominous-background.svg';

const Scene1 = React.createClass({
	componentWillMount() {
		this.backgroundEvents = [
			function (target) {
				target.style.opacity = 0;
			},

			function (target) {
				target.style.display = 'none';
			}
		];

		this.blueBall = {
			name: 'blueBall',
			width: '100px',
			data: this.blueBallData,
			loop: true,
			autoplay: true
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
							transition: '1000ms ease-in',
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
					<Collectable
						item={this.blueBall}
					/>
					<p style={{float: 'left'}}>
						SHUTP!
					</p>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default Scene1;
import React from 'react';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';

import uglyBackground from '../__resources/images/ugly.gif';

import { introSceneStyles } from '../../../styles/scenes';

const IntroScene = React.createClass({
	componentWillMount() {
		this.h1Events = [
			function (target, animation) {
				target.classList.remove(animation.grow);
				target.classList.add(animation.shrink);
			},

			function (target, animation) {
				target.classList.remove(animation.shrink);
				target.classList.add(animation.grow);
			},
		];

		this.meArrowEvents = [
			function (target, animation) {
				target.classList.add(animation.wiggle);
			},

			function (target, animation) {
				target.classList.remove(animation.shrink);
				target.classList.add(animation.grow);
			},

			function (target, animation) {
				target.classList.remove(animation.grow);
				target.classList.add(animation.shrink);
			},
		];

		this.meImgEvents = [
			function (target) {
				target.src = require('../__resources/images/creepy.png');
			},

			function (target) {
				target.src = require('../__resources/images/missing-image.jpg');
			},

			function (target) {
				target.src = require('../__resources/images/creepy.png');
			},

			function (target) {
				target.src = require('../__resources/images/missing-image.jpg');
			},

			function (target) {
				target.src = require('../__resources/images/creepy.png');
			},

			function (target) {
				target.src = require('../__resources/images/missing-image.jpg');
			},

			function (target) {
				target.src = require('../__resources/images/creepy.png');
			},

			function (target, animation) {
				target.classList.add(animation.imgAttack);
			},
		];

		this.blackBackgroundEvents = [
			function (target, animation) {
				target.classList.add(animation.fadeIn);
			},

			function (target) {
				target.style.backgroundColor = 'black';
			},

			function (target, animation) {
				browserHistory.push('/whereAmI');
			}
		];
	},

	render() {
		return (
			<div>
				<DeferredEventExecutor
					moments={[30, 33, 37]}
					events={this.blackBackgroundEvents}
					increment={500}
				>
					<div 
						style={{
							opacity: 0,
							backgroundColor: 'white',
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							transition: '500ms',
							zIndex: 99
						}}
					>
					</div>
				</DeferredEventExecutor>
				<div 
					style={{
						backgroundImage: `url(${uglyBackground})`,
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: -10
					}}
				>
				</div>
				<ResponsiveContainer className={introSceneStyles}>
					<DeferredEventExecutor
						moments={[0,1]}
						events={this.h1Events}
						loop={true}
					>
						<h1>
							HI!!!1 WECLOME TO MY PORTFOILO PAGE!!
						</h1>
					</DeferredEventExecutor>
					<p>
						my name is matt and this is my protfolio page where i showcase my awsome graphic desing skills for you're viewing plesure!
					</p>
					<DeferredEventExecutor
						moments={[0, 3, 6]}
						events={this.meArrowEvents}
						loop={true}
					>
						<img 
							className={introSceneStyles.meArrow}
							src={require('../__resources/images/me.png')}
						/>
					</DeferredEventExecutor>
					<DeferredEventExecutor
						moments={[150, 151, 153, 154, 160, 162, 170, 220]}
						events={this.meImgEvents}
						increment={50}
					>
						<img
							className={introSceneStyles.meImg}
							src={require('../__resources/images/missing-image.jpg')}
						/>
					</DeferredEventExecutor>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default IntroScene;
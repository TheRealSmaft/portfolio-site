import React from 'react';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';

import uglyBackground from './images/ugly.gif';
import ominousBackground from './images/ominous-background.svg';


const LandingPage = React.createClass({
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
				target.src = require('./images/creepy.png');
			},

			function (target) {
				target.src = require('./images/missing-image.jpg');
			},

			function (target) {
				target.src = require('./images/creepy.png');
			},

			function (target) {
				target.src = require('./images/missing-image.jpg');
			},

			function (target) {
				target.src = require('./images/creepy.png');
			},

			function (target) {
				target.src = require('./images/missing-image.jpg');
			},

			function (target) {
				target.src = require('./images/creepy.png');
			},

			function (target, animation) {
				target.classList.add(animation.imgAttack);
			},
		];

		this.blackBackgroundEvents = [
			function (target, animation) {
				target.style.visibility = 'visible';
				target.classList.add(animation.fadeIn);
			},

			function (target) {
				target.childNodes[0].style.backgroundColor = 'black';
			},

			function (target) {
				target.childNodes[0].style.opacity = 0;
			},

			function (target) {
				target.style.display = 'none';
			}
		];

		this.entirePageEvents = [
			function (target) {
				target.childNodes[0].style.display = 'none';
			},

			function (target) {
				target.childNodes[1].style.display = 'block';
			},

			function (target, animation, history) {
				window.location.pathname = '/about';
			}
		];
	},

	render() {
		return (
			<div>
				<DeferredEventExecutor
					moments={[31, 33, 42, 50]}
					events={this.blackBackgroundEvents}
					increment={500}
				>
					<div
						style={{
							visibility: 'hidden',
							transition: '500ms'
						}}
					>
						<div 
							style={{
								backgroundColor: 'white',
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								transition: '500ms',
								zIndex: 5
							}}
						>
						</div>
					</div>
				</DeferredEventExecutor>
				<DeferredEventExecutor
					moments={[19, 20, 21]}
					events={this.entirePageEvents}
				>
					<div>
						<div>
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
							<ResponsiveContainer className={landingPageStyles}>
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
										className={landingPageStyles.meArrow}
										src={require('./images/me.png')}
									/>
								</DeferredEventExecutor>
								<DeferredEventExecutor
									moments={[150, 151, 153, 154, 160, 162, 170, 220]}
									events={this.meImgEvents}
									increment={50}
								>
									<img
										className={landingPageStyles.meImg}
										src={require('./images/missing-image.jpg')}
									/>
								</DeferredEventExecutor>
							</ResponsiveContainer>
						</div>
						<div
							style={{
								display: 'none',
								transition: '1000ms'
							}}
						>
							<div
								style={{
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
							<ResponsiveContainer>
							</ResponsiveContainer>
						</div>
					</div>
				</DeferredEventExecutor>
			</div>
		)
	}
});

export default LandingPage;
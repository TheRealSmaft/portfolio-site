import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import { scene1Styles } from '../../../styles/scenes';

import ominousBackground from '../__resources/images/ominous-background.svg';

const Scene1 = React.createClass({
	componentWillMount() {
		this.backgroundEvents = [
			function (target) {
				target.style.opacity = 1;
			}
		];

		this.letterHEvents = [
			function (target) {
				target.style.top = (window.innerHeight * .2) * -1 + 'px';
			},

			function (target, animation) {
				target.style.transform = 'translateY(' + window.innerHeight + 'px)';
				target.childNodes[0].childNodes[0].classList.add(scene1Styles.spinForwards);
			},

			function (target, animation) {
				target.childNodes[0].classList.add(animation.squishX);
			}
		];

		this.letterOEvents = [
			function (target) {
				target.style.top = (window.innerHeight * .2) * -1 + 'px';
			},

			function (target, animation) {
				target.style.transform = 'translateY(' + window.innerHeight + 'px)';
				target.childNodes[0].childNodes[0].classList.add(scene1Styles.spinBackwards);
			},

			function (target, animation) {
				target.childNodes[0].classList.add(animation.squishX);
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
	},

	// componentDidMount() {
	// 	ReactDOM.findDOMNode(this.refs.letterH).style.top = (window.innerHeight * .2) * -1 + 'px';
	// },

	componentWillUpdate() {
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
					<DeferredEventExecutor
						moments={[0, 30, 32]}
						events={this.letterHEvents}
						increment={100}
					>
						<Collectable
							ref='letterH'
							style={{
								position: 'absolute',
								transition: '200ms linear'
							}}
							item={this.letterH}
						/>
					</DeferredEventExecutor>
					<DeferredEventExecutor
						moments={[0, 35, 37]}
						events={this.letterOEvents}
						increment={100}
					>

						<Collectable
							ref='letterO'
							style={{
								position: 'absolute',
								left: '20%',
								transition: '200ms linear'
							}}
							item={this.letterO}
						/>
					</DeferredEventExecutor>
				</ResponsiveContainer>
			</div>
		)
	}
});

export default Scene1;
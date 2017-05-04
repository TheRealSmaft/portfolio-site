import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { SVG, ShapeGroup } from '../../Containers/ShapeContainers';

import { LoadingPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const LoadingPage = React.createClass({
	getInitialState() {
		return {
			ellipsisGlyph: '.'
		}
	},

	componentWillMount() {
		this.ellipsisEvents = [
			function (target) {
				target.innerHTML = '';
			},

			function (target) {
				target.innerHTML = target.dataset.glyph;
			},

			function (target) {
				target.innerHTML = target.dataset.glyph + target.dataset.glyph;
			},

			function (target) {
				target.innerHTML = target.dataset.glyph + target.dataset.glyph + target.dataset.glyph;
			}
		];
	},

	componentDidMount() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGears.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: 1,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};

		this.loadingGears = BodyMovin.loadAnimation(animationData);
		this.loadingGears.addEventListener('complete', this.breakGears);
	},

	breakGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsBreaking.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.loadingGears.removeEventListener('complete');
		this.loadingGears.destroy();

		this.breakingGears = BodyMovin.loadAnimation(animationData);
		this.breakingGears.addEventListener('complete', this.makePaperClickable);
		this.changeEllipsisGlyph('?');
	},

	fixGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsFixed.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.breakingGears.removeEventListener('complete');
		this.breakingGears.destroy();

		this.fixedGears = BodyMovin.loadAnimation(animationData);
		this.fixedGears.addEventListener('complete', this.turboChargeGears);
	},

	makePaperClickable(e) {
		this.refs.loadingGears.firstChild.childNodes[1].childNodes[2].childNodes[0].addEventListener('mousedown', this.fixGears);
	},

	turboChargeGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGears.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: true,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.fixedGears.removeEventListener('complete');
		this.fixedGears.destroy();

		this.turboChargedGears = BodyMovin.loadAnimation(animationData);
		this.turboChargedGears.setSpeed(4);
		this.changeEllipsisGlyph('!');

		setTimeout(() => {
			browserHistory.push('/home');
		}, 3000);
	},

	changeEllipsisGlyph(glyph) {
		this.setState({
			...this.state,
			ellipsisGlyph: glyph
		})
	},

	render() {
		return (
			<div
				style={{
					width: '100%'
				}}
			>
				<div 
					className={LoadingPageStyles.loaderContainer}
					style={{
						height: window.innerHeight + 'px'
					}}
				>
					<div>
						<h1 
							className={LoadingPageStyles.loaderText}
						>
							Loading

							<span>
								<DeferredEventExecutor
									style={{display: 'inline'}}
									moments={[0, 1, 2, 3]}
									events={this.ellipsisEvents}
									increment={500}
									loop={true}
								>
									<span data-glyph={this.state.ellipsisGlyph}></span>
								</DeferredEventExecutor>
							</span>
						</h1>
					</div>
					<div
						ref="loadingGears"
					>
					</div>
				</div>
			</div>
		)
	}
});

export default LoadingPage;
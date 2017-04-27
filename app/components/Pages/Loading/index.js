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
			loop: 3,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};

		this.loadingGears = BodyMovin.loadAnimation(animationData);
		this.loadingGears.addEventListener('complete', this.breakGears);

		var paperThrown = {
			animationData: require('../../../assets/images/items/Paper/CrumpledPaperThrown.json'),
			path: '../../../../../assets/images/items/Paper',
			loop: false,
			autoplay: false,
			name: 'paperThrown',
			renderer: 'svg',
			container: ReactDOM.findDOMNode(this.refs.crumpledPaper)
		}

		this.paperThrown = BodyMovin.loadAnimation(paperThrown);
		this.paperThrown.addEventListener('complete', this.makePaperClickable);
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

		this.paperThrown.play();

		this.breakingGears = BodyMovin.loadAnimation(animationData);
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

	makePaperClickable() {
		this.refs.crumpledPaper.firstChild.childNodes[1].firstChild.addEventListener('onClick', this.fixGears);
	},

	componentWillUpdate() {
		if(this.refs.loadingGears != undefined) {
			var rect = ReactDOM.findDOMNode(this.refs.loadingGears).getBoundingClientRect()
			this.crumpleDivHeight = rect.height;
			this.crumpleDivWidth = rect.width;
		}
	},

	render() {
		return (
			<ResponsiveContainer>
				<div 
					className={LoadingPageStyles.loaderContainer}
					style={{
						height: window.innerHeight + 'px'
					}}
				>
					<div
						className={LoadingPageStyles.paper}
						style={{
							width: this.crumpleDivWidth,
							height: this.crumpleDivHeight
						}}
					>
						<div
							ref="crumpledPaper"
						>
						</div>
					</div>
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
			</ResponsiveContainer>
		)
	}
});

export default LoadingPage;
import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';

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
		this.ellipsisTimeElapsed = 0;
		this.ellipsisTimer = setInterval(this.ellipsisTimeCounter, 1000);

		var jsonData = require('../../../assets/images/items/Glue/GlueSqueeze.json');
		var loadingGearsAnimation = {
			animationData: jsonData,
			path: '../../../../../assets/images/items/Glue',
			loop: true,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};

		BodyMovin.loadAnimation(loadingGearsAnimation);
	},

	componentWillUnmount() {
		clearInterval(this.ellipsisTimer);
	},

	ellipsisTimeCounter() {
		this.ellipsisTimeElapsed = this.ellipsisTimeElapsed + 1;
		if(this.ellipsisTimeElapsed === 6) {
			this.changeEllipsisGlyph('?');
		}
		else if(this.ellipsisTimeElapsed === 12) {
			this.changeEllipsisGlyph('!');
			clearInterval(this.ellipsisTimer);
		}
	},

	changeEllipsisGlyph(glyph) {
		this.setState({
			...this.state,
			ellipsisGlyph: glyph
		})
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
					<div>
						<h3 
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
						</h3>
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
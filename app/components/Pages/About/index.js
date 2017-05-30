import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { itemTypes, itemActions } from '../../../state/game/items';

import { ResponsiveContainer, Grid, Row, Col} from '../../Containers';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { AboutPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const AboutPage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 6) {
				browserHistory.replace('/home');
			}
		}
	},

	componentDidMount() {
		if(this.props.mode.gameMode) {
			this.createHandAnimation();
		}
		else
		{
			this.thumbsUp();
		}
	},

	createHandAnimation() {
		var json = require('../../../assets/images/interactables/Hand/HandWithGavel.json');
		var animation = {
			animationData: json,
			path: '../../../assets/images/interactables/Hand',
			loop: false,
			autoplay: false,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.hand)
		};

		this.handWithGavel = BodyMovin.loadAnimation(animation);
		this.handWithGavel.goToAndStop(0, true);

		this.makeGavelClickable();
	},

	makeGavelClickable() {
		var gavel = this.refs.hand.firstChild.childNodes[1].childNodes[1];
		gavel.classList.add(AboutPageStyles.hover);
		gavel.addEventListener('click', this.collectGavel);
	},

	collectGavel() {
		var gavelItem = {
			name: 'Gavel',
			status: 'inventory',
			collectProgress: 11,
			inventoryImage: require('../../../assets/images/items/Gavel/GavelInventory.svg'),
			width: '100px'
		}

		this.props.addItemToArray(gavelItem);

		this.handWithGavel.destroy();
		this.thumbsUp();
	},

	thumbsUp() {
		var json = require('../../../assets/images/interactables/Hand/ThumbsUp.json');
		var animation = {
			animationData: json,
			path: '../../../assets/images/interactables/Hand',
			loop: false,
			autoplay: false,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.hand)
		};

		this.thumbsUpAnimation = BodyMovin.loadAnimation(animation);
		this.thumbsUpAnimation.goToAndStop(0, true);
		this.thumbsUpAnimation.setSpeed(1.5);

		setTimeout(() => {
			this.thumbsUpAnimation.play();
		}, 250);
	},

	render() {
		return (
			<ResponsiveContainer>
				<h1>
					ABOUT ME
				</h1>
				<div
					className={AboutPageStyles.grid}
				>
					<div
						className={AboutPageStyles.row}
					>
						<div
							className={AboutPageStyles.picCol}
						>
							<SVG
								title="Me Pic Background"
							>
								<Circle
									fill={'orange'}
								/>
							</SVG>
						</div>
						<div
							className={AboutPageStyles.textCol}
						>
							<p>
								About me paragraph
							</p>
						</div>
					</div>

					<div
						className={AboutPageStyles.row}
					>
						<div
							className={AboutPageStyles.sectionImg}
						>
							<SVG
								title="Brain Background"
							>
								<Circle
									fill={'yellow'}
								/>
							</SVG>
							<img 
								style={{
									position: 'absolute',
									width: '70%',
									left: '15%',
									top: '22.5%'
								}}
								src={require('../../../assets/images/interactables/Brain/Brain.svg')}
							/>
						</div>
						<div
							className={AboutPageStyles.textCol}
						>
							<div
								className={AboutPageStyles.skillList}
							>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										brain
									</li>
									<li>
										skills
									</li>
								</ul>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										brain
									</li>
									<li>
										skills
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div
						className={AboutPageStyles.row}
					>
						<div
							className={AboutPageStyles.sectionImg}
						>
							<SVG
								title="Heart Background"
							>
								<Circle
									fill={'lightblue'}
								/>
							</SVG>
							<img 
								style={{
									position: 'absolute',
									width: '60%',
									left: '20%',
									top: '8%'
								}}
								src={require('../../../assets/images/interactables/Heart/Heart.svg')}
							/>
						</div>
						<div
							className={AboutPageStyles.textCol}
						>
							<div
								className={AboutPageStyles.skillList}
							>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										heart
									</li>
									<li>
										skills
									</li>
								</ul>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										heart
									</li>
									<li>
										skills
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div
						className={AboutPageStyles.row}
					>
						<div
							className={AboutPageStyles.sectionImg}
						>
							<SVG
								title="Hand Background"
							>
								<Circle
									fill={'lightgreen'}
								/>
							</SVG>
							<div
								ref="hand"
								className={AboutPageStyles.hand}
							>
							</div>
						</div>
						<div
							className={AboutPageStyles.textCol}
						>
							<div
								className={AboutPageStyles.skillList}
							>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										hand
									</li>
									<li>
										skills
									</li>
								</ul>
								<ul>
									<li>
										List
									</li>
									<li>
										of
									</li>
									<li>
										hand
									</li>
									<li>
										skills
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
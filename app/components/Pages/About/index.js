import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer } from '../../Containers';
import { SVG, Circle } from '../../Containers/ShapeContainers';

import { modeActions, modeTypes } from '../../../state/game/mode';
import { itemActions, itemTypes} from '../../../state/game/items';
import { interactableActions, interactableTypes} from '../../../state/game/interactables';

import Portrait from './AboutContainers/Portrait';
import Brain from './AboutContainers/Brain';
import Heart from './AboutContainers/Heart';
import Hand from './AboutContainers/Hand';

const underline = require('../../../assets/background/underline.svg');

const brainBullet = require('../../../assets/images/ListBullets/Mind.svg');
const heartBullet = require('../../../assets/images/ListBullets/Heart.svg');
const handBullet = require('../../../assets/images/ListBullets/Hand.svg');

import { brainSkills, heartSkills, handSkills } from './AboutContainers/skills';

import { AboutPageStyles } from '../../../styles/pages';

const AboutPage = React.createClass({
	getInitialState() {
		return {
			aboutIndex: 0
		}
	},

	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
			else if(this.props.mode.progressLevel > 0 &&
					  this.props.mode.progressLevel < 10) {
				browserHistory.replace('/home');
			}
		}

		this.gibberish = "Ym amne is Attwmhe Rrkaeubb Mstih dna I ma a Arcpghi and Ewb Inrseedg. Huotgh ot be othens, ym slkli set is ermo badro and dvaeri htna taht ittel cynvoes.";

		this.aboutParagraphs = [
			"My name is Matthew Brubaker Smith and I am a Graphic and Web Designer. Though to be honest, my skill set is more broad and varied than that title conveys.",
			"To prove it, I built this website. Or rather, this React/Redux single page web application to be more accurate. So I suppose that makes me a Web App Developer as well.",
			"In addition to all of the static graphic art you will find on this web app, I created all of the animations. So I gather that also makes me an Animator.",
			"I could go on rambling like this for some time (I reckon I'm a rambler!) but for time an readability's sake, I have listed out a plethora of my skills broken down into three categories. Skills of the mind, heart, and hand."	
		];
	},

	componentDidUpdate() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel > 12) {

				this.refs.whiteOut.style.width = window.innerWidth + 'px';
				this.refs.whiteOut.style.height = window.innerHeight + 'px';
				this.refs.whiteOut.style.opacity = 1;
				
				setTimeout(() => {
					this.props.justBeatGame(true);
					this.props.clearInventory();
					this.props.clearEventsArray();
					this.props.changeToSiteMode();
					browserHistory.replace('/home');
				}, 5000);
			}
		}
	},

	nextParagraph() {
		this.refs.aboutP.style.opacity = 0;
		setTimeout(() => {
			if(this.state.aboutIndex >= this.aboutParagraphs.length - 1) {
				this.setState({
					aboutIndex: 0
				});
			}
			else
			{
				this.setState({
					aboutIndex: this.state.aboutIndex + 1
				});
			}
			this.refs.aboutP.style.opacity = 1;
		}, 300);
	},
	
	render() {
		return (
			<ResponsiveContainer>
				<div
					className={AboutPageStyles.grid}
				>
					<div
						className={AboutPageStyles.row}
					>
						<Portrait />
						<div
							className={AboutPageStyles.textCol}
						>
							<h1
								style={{
									background: 'url(' + underline + ') no-repeat',
								}}
							>
								About Me
							</h1>
							<p
								className={AboutPageStyles.aboutP}
								ref="aboutP"
							>
								{this.props.mode.gameMode ? this.gibberish : this.aboutParagraphs[this.state.aboutIndex]}
							</p>
							<button
								className={AboutPageStyles.moreButton}
								onClick={this.nextParagraph}
								style={{
									display: this.props.mode.gameMode ? 'none' : 'flex'
								}}
							>
								{this.state.aboutIndex != 3 ? 'Read More' : 'From the Top'}
							</button>
						</div>
					</div>

					<div
						className={AboutPageStyles.row}
					>
						<Brain />
						<div
							className={AboutPageStyles.textCol}
						>
							<div>
								<h2
									style={{
										background: 'url(' + underline + ') no-repeat',
									}}
								>
									Skills of the Mind
								</h2>
							</div>
							<ul
								className={AboutPageStyles.skillList}
								style={{
									listStyleImage: 'url(' + brainBullet + ')'
								}}
							>
								{brainSkills.map((skill, index) => 
									<li
										key={'brain' + index}
									>
										{skill}
									</li>
								)}
							</ul>
						</div>
					</div>

					<div
						className={AboutPageStyles.row}
					>
						<Heart />
						<div
							className={AboutPageStyles.textCol}
						>
							<div>
								<h2
									style={{
										background: 'url(' + underline + ') no-repeat',
									}}
								>
									Skills of the Heart
								</h2>
							</div>

							<ul
								className={AboutPageStyles.skillList}
								style={{
									listStyleImage: 'url(' + heartBullet + ')'
								}}
							>
								{heartSkills.map((skill, index) => 
									<li
										key={'heart' + index}
									>
										{skill}
									</li>
								)}
							</ul>
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
									fill={'lightblue'}
								/>
							</SVG>
							<Hand
								className={AboutPageStyles.hand}
							/>
						</div>
						<div
							className={AboutPageStyles.textCol}
						>
							<div>
								<h2
									style={{
										background: 'url(' + underline + ') no-repeat',
									}}
								>
									Skills of the Hand
								</h2>
							</div>

							<ul
								className={AboutPageStyles.skillList}
								style={{
									listStyleImage: 'url(' + handBullet + ')'
								}}
							>
								{handSkills.map((skill, index) => 
									<li
										key={'hand' + index}
									>
										{skill}
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
				<div
					ref="whiteOut"
					className={AboutPageStyles.whiteOut}
				>
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
		changeToSiteMode: modeActions.changeToSiteMode,
		justBeatGame: modeActions.justBeatGame,
		clearInventory: itemActions.clearInventory,
		clearEventsArray: interactableActions.clearEventsArray,
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
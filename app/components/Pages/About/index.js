import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer } from '../../Containers';
import { SVG, Circle } from '../../Containers/ShapeContainers';

import { modeActions, modeTypes } from '../../../state/game/mode';

import Portrait from './AboutContainers/Portrait';
import Brain from './AboutContainers/Brain';
import Heart from './AboutContainers/Heart';
import Hand from './AboutContainers/Hand';

import { AboutPageStyles } from '../../../styles/pages';

const AboutPage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 6) {
				browserHistory.replace('/home');
			}
		}
	},

	componentDidUpdate() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel > 12) {

				this.refs.whiteOut.style.width = window.innerWidth + 'px';
				this.refs.whiteOut.style.height = window.innerHeight + 'px';
				this.refs.whiteOut.style.opacity = 1;
				
				setTimeout(() => {
					this.props.justBeatGame(true);
					this.props.changeToSiteMode();
					browserHistory.replace('/home');
				}, 5000);
			}
		}
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
						<Portrait />
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
						<Brain />
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
						<Heart />
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
		justBeatGame: modeActions.justBeatGame
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
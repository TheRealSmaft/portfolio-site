import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer } from '../../Containers';
import { SVG, Circle } from '../../Containers/ShapeContainers';

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
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(AboutPage);
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col} from '../../Containers';
import { SVG, Circle } from '../../Containers/ShapeContainers';
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
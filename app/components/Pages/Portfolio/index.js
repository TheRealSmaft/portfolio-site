import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ResponsiveContainer } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';
import LinkScribble from './PortfolioContainers/LinkScribble';

import PortfolioPiece from './PortfolioContainers/PortfolioPiece';
import PortfolioModal from './PortfolioContainers/PortfolioModal';
import portfolio from '../../../assets/portfolio';

import { PortfolioPageStyles } from '../../../styles/pages';

const PortfolioPage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
			if(this.props.mode.progressLevel > 0 &&
				this.props.mode.progressLevel < 6) {
				browserHistory.replace('/home');
			}
		}

		this.linkScribble = (
			<Link 
				to="/contact"
			>
				contact&nbsp;me!
			</Link>
		);

		if(this.props.mode.gameMode) {
			this.linkScribble = (
				<LinkScribble 
					className={PortfolioPageStyles.linkScribble}
				/>
			);
		}

		this.frameRotations = [];
		for(var i = 0; i < portfolio.length; i++) {
			this.frameRotations.push(this.getRotation());
		}
	},

	getRotation() {
		return ((Math.floor(Math.random() * (10 - 0) + 0)) - 5) * .5 + 'deg';
	},

	render() {
		let port = portfolio.map((piece, index) => 
			<PortfolioPiece
				key={index}
				index={index}
				piece={piece}
				rotation={this.frameRotations[index]}
			/>
		);

		return (
			<ResponsiveContainer>
				<h1>
					Portfolio
				</h1>
				<p
					className={PortfolioPageStyles.portIntro}
				>
					Click on a framed image to view the full piece at higher resolution. If you like what you see please&nbsp;
					{this.linkScribble}
				</p>

				{port}

				<PortfolioModal />
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(PortfolioPage);
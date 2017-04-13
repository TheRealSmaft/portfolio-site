import React from 'react';

import { ResponsiveContainer } from '../../Containers';

import PortfolioPiece from './PortfolioContainers/PortfolioPiece';

import { PortfolioPageStyles } from '../../../styles/pages';

const PortfolioPage = React.createClass({
	componentWillMount() {
		this.piece = {
			name: 'Test Piece',
			description: 'shkf sdjgjks ksg sjgls isgeio isegj sieg isejg segi!'
		}
	},

	render() {
		return (
			<ResponsiveContainer>
				<h1>
					PORTFOLIO
				</h1>
				<PortfolioPiece
					piece={this.piece}
				/>
				<PortfolioPiece
					piece={this.piece}
				/>
			</ResponsiveContainer>
		)
	}
});

export default PortfolioPage;
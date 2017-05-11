import React from 'react';

import { ResponsiveContainer } from '../../Containers';
import LinkScribble from './PortfolioContainers/LinkScribble';

import PortfolioPiece from './PortfolioContainers/PortfolioPiece';

import { PortfolioPageStyles } from '../../../styles/pages';

const PortfolioPage = React.createClass({
	componentWillMount() {
		this.bunnyPiece = {
			name: 'BUNNIEZ',
			description: 'A bunch o\' bunnies!',
			image: 'download.jpg'
		};

		this.carrotPiece = {
			name: 'Carrots?',
			description: 'A bunch o\' carrots for d\'bunnies!',
			image: 'carrots.jpg'
		};
	},

	render() {
		return (
			<ResponsiveContainer>
				<h1>
					PORTFOLIO
				</h1>
				<div
					className={PortfolioPageStyles.portIntro}
				>
					If you like what you see please
					<LinkScribble 
						className={PortfolioPageStyles.linkScribble}
					/>
				</div>

				<PortfolioPiece
					rotation="1deg"
					piece={this.bunnyPiece}
				/>
				<PortfolioPiece
					rotation="-.75deg"
					piece={this.carrotPiece}
				/>
			</ResponsiveContainer>
		)
	}
});

export default PortfolioPage;
import React from 'react';

import { PortfolioPageStyles } from '../../../../../styles/pages';

const PortfolioPiece = React.createClass({
	propTypes: {
		piece: React.PropTypes.object.isRequired
	},

	getDefaultProps() {
		return {
			rotation: '0deg'
		}
	},

	render() {
		return (
			<div
				style={{
					...this.props.style
				}}
			>
				<h2>
					{this.props.piece.name}
				</h2>
				<div
					className={PortfolioPageStyles.pieceImage}
					style={{
						transform: 'rotate(' + this.props.rotation + ')'
					}}
				>
					<img 
						src={require('../../../../../assets/images/interactables/PortfolioFrames/FrameNail.svg')}
					/>
					<div>
						<div>
						</div>
					</div>
					<div>
					</div>
					<div>
					</div>
					<img 
						src={require('../../../../../assets/images/PortfolioPieces/' + this.props.piece.image)}
					/>
				</div>

				<p>
					{this.props.piece.description}
				</p>
			</div>
		);
	}
});

export default PortfolioPiece;
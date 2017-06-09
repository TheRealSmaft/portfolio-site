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

	straightenFrame() {
		if(!this.pieceStraight) {
			this.refs.pieceImage.style.transform = 'rotate(0deg)';
			this.pieceStraight = true;
			setTimeout(() => {
				this.openModal();
			}, 600);
		}
		else
		{
			this.openModal();
		}
	},

	openModal() {
		console.log('OPEN MODAL')
	},

	render() {
		return (
			<div
				className={PortfolioPageStyles.pieceGrid}
			>
				<div
					ref="pieceImage"
					className={PortfolioPageStyles.pieceImage}
					style={{
						transform: 'rotate(' + this.props.rotation + ')'
					}}
					onClick={this.straightenFrame}
				>
					<img 
						alt={this.props.piece.name}
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
						src={require('../../../../../assets/portfolio/' + this.props.piece.image)}
					/>
				</div>

				<div
					className={PortfolioPageStyles.description}
				>
					<h2
						className={PortfolioPageStyles.title}
						onClick={this.openModal}
					>
						{this.props.piece.name}
					</h2>
					<p>
						{this.props.piece.description}
					</p>
				</div>
			</div>
		);
	}
});

export default PortfolioPiece;
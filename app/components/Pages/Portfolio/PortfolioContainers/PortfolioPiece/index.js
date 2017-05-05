import React from 'react';

import { Grid, Row, Col } from '../../../../Containers';

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
				<Grid
					style={{
						width: '100%'
					}}
					breakPoints={[992, 768, 480]}
					gutter={4}
				>
					<Row 
						blocks={3}
					>
						<Col 
							blocks={2}
							breaks={[60, 50, 100]}
						>
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
						</Col>
						<Col 
							blocks={1}
							breaks={[40, 50, 100]}
						>
							<p>
								{this.props.piece.description}
							</p>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

export default PortfolioPiece;
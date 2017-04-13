import React from 'react';

import { Grid, Row, Col } from '../../../../Containers';

const PortfolioPiece = React.createClass({
	propTypes: {
		piece: React.PropTypes.object.isRequired
	},

	render() {
		return (
			<div>
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
								style={{
									width: '100%',
									height: '200px',
									backgroundColor: 'lightblue'
								}}
							>
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
import React from 'react';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { HomePageStyles } from '../../../styles/pages';

const HomePage = React.createClass({


	render() {
		return (
			<ResponsiveContainer>
				<h1>
					WELCOME!
				</h1>
				<Grid
					className={HomePageStyles.homeGrid}
					breakPoints={[768]}
					gutter={4}
				>
					<Row blocks={20}>
						<Col
							breaks={[100]}
							blocks={9}
						>
							<SVG
								title="Logo Circle"
							>
								<Circle
									fill={'orange'}
									stroke={'red'}
									strokeWidth={2}
								>
								</Circle>
							</SVG>
						</Col>
						<Col
							className={HomePageStyles.homeP}
							breaks={[100]}
							blocks={11}
						>
							<p>
								Farm-to-table twee plaid stumptown chia authentic. Drinking vinegar hell of master cleanse banjo, gentrify enamel pin meditation dreamcatcher bespoke shabby chic ethical bitters blue bottle typewriter portland. Coloring book man braid messenger bag chicharrones, sartorial succulents flannel pug XOXO street art cronut. 
							</p>
						</Col>
					</Row>
				</Grid>
				<div
						className={HomePageStyles.portPreview}
					>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<span></span>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<span></span>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</ResponsiveContainer>
		)
	}
});

export default HomePage;
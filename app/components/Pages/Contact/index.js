import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

const ContactPage = React.createClass({
	componentWillMount() {
		this.uncrumpleEvents = [
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(2).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(3).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(4).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(5).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(6).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(7).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(8).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(9).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(10).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(11).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(12).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(13).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(14).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(15).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(16).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(17).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(18).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(19).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(20).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(21).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(22).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(23).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(24).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(25).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(26).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(27).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(28).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(29).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(30).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(31).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(32).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(33).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(34).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(35).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(36).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(37).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(38).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(39).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(40).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(41).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(42).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(43).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(44).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(45).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(46).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(47).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(48).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(49).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(50).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(51).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(52).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(53).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(54).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(55).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(56).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(57).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(58).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(59).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(60).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(61).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(62).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(63).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(64).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(65).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(66).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(67).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(68).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(69).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(70).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(71).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(72).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(73).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(74).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(75).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(76).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(77).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(78).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(79).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(80).png');
		},
		function (target) {
			target.src = require('../../../assets/images/items/Paper/Crumple/Crumple(81).png');
		}
		];

		for(var i = 1; i < 82; i++) {
			console.log(i + ', ')
		}
	},



	render() {
		return (
			<ResponsiveContainer>
				<h1>
					CONTACT ME
				</h1>
				<Grid
					breakPoints={[768]}
					gutter={4}
				>
					<Row>
						<Col
							breaks={[100]}
						>
							<p>
								This will be a pic of a flying saucer (from Zanahoria) abducting the Sinister Silhouette.
							</p>
						</Col>
						<Col
							breaks={[100]}
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Form Background"
							>
								<Rect
									fill="pink"
									dimensions={[90, 90]}
									position={[5,5]}
								>
								<animateTransform 
									attributeName="transform"
									id="forth"
									attributeType="XML"
									type="rotate"
									from="-2 45 45"
									to="2 45 45"
									dur="20s"
									begin="0s; back.end"
								/>
								<animateTransform 
									attributeName="transform"
									id="back"
									attributeType="XML"
									type="rotate"
									from="2 45 45"
									to="-2 45 45"
									dur="20s"
									begin="forth.end"
								/>
								</Rect>
							</SVG>
							<p
								style={{
									position: 'absolute',
									top: '5%',
									left: '8%'
								}}
							>
								This will be a contact form
							</p>
						</Col>
					</Row>
				</Grid>
				<DeferredEventExecutor
					moments={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]}
					events={this.uncrumpleEvents}
					increment={34}
				>
					<img 
						style={{width: '100%'}}
						src={require('../../../assets/images/items/Paper/Crumple/Crumple(1).png')}
					/>
				</DeferredEventExecutor>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;
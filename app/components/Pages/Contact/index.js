import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import Abduction from '../../Scenes/Abduction';

import { ContactPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const ContactPage = React.createClass({
	componentWillMount() {
		this.scene = this.props.mode.gameMode ? (
			<Abduction />
		) : null;
	},

	render() {
		return (
			<ResponsiveContainer>
				<h1>
					CONTACT ME
				</h1>

				<div
					className={ContactPageStyles.sceneAndForm}
				>
					<div>
						{this.scene}
					</div>
					<div>
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

export default connect(mapStateToProps)(ContactPage);
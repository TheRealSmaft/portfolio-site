import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import Abduction from '../../Scenes/Abduction';

import { ContactPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const ContactPage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
		}
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
						<Abduction />
					</div>
					<div
						className={!this.props.mode.gameMode ? ContactPageStyles.formInSiteMode : ''}
					>

						<form className={ContactPageStyles.form}>
							<fieldset>
								<div>
									<label for="firstName">
										First Name:
									</label>
									<input type="text" name="firstName" id="firstName"/>
								</div>
								<div>
									<label for="lastName">
										Last Name:
									</label>
									<input type="text" name="lastName" id="lastName"/>
								</div>
							</fieldset>
						</form>
						
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
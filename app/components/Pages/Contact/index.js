import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import Abduction from '../../Scenes/Abduction';

import { ContactPageStyles } from '../../../styles/pages';

const ContactPage = React.createClass({
	getInitialState() {
		return {
			formData: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				message: ''
			}
		}
	},

	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
			if(this.props.mode.progressLevel > 0 &&
				this.props.mode.progressLevel < 8) {
				browserHistory.replace('/home');
			}
		}
	},

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			formData: {
				[name]: value
			}
		});
	},

	submitForm() {
		var post = new XMLHttpRequest();
		post.open("POST", '../../../assets/formMailer/mailer.php');
		post.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		var data = JSON.stringify(this.state.formData);
		post.send(data);
	},

	render() {
		return (
			<ResponsiveContainer>
				<div
					className={ContactPageStyles.sceneAndForm}
				>
					<div>
						<Abduction />
					</div>
					<div
						className={!this.props.mode.gameMode || this.props.mode.progressLevel > 8.5 ? ContactPageStyles.formInSiteMode : ''}
					>
						<h1>
							Contact Me
						</h1>
						<form className={ContactPageStyles.form}>
							<fieldset>
								<div>
									<label for="firstName">
										First Name:
									</label>
									<input 
										type="text" 
										name="firstName" 
										id="firstName"
										onChange={this.handleInputChange}
									/>
								</div>
								<div>
									<label for="lastName">
										Last Name:
									</label>
									<input 
										type="text" 
										name="lastName" 
										id="lastName"
										onChange={this.handleInputChange}
									/>
								</div>
							</fieldset>
							<fieldset>
								<div>
									<label for="email">
										Email:
									</label>
									<input 
										type="email" 
										name="email" 
										id="email"
										onChange={this.handleInputChange}
									/>
								</div>
								<div>
									<label for="phoneNumber">
										Phone:
									</label>
									<input 
										type="phone" 
										name="phoneNumber" 
										id="phoneNumber"
										onChange={this.handleInputChange}
									/>
								</div>
							</fieldset>
							<fieldset>
								<div>
									<label for="message">
										Message:
									</label>
									<textarea 
										name="message" 
										id="message"
										onChange={this.handleInputChange}
									/>
								</div>
							</fieldset>
							<div
								className={ContactPageStyles.submitButton}
							>
								{this.props.mode.gameMode ? (
										<img
											src={require('../../../assets/images/interactables/ContactForm/ButtonGlue.svg')}
										/>
									) : ''
								}
								{this.props.mode.gameMode ? (
										<button disabled>
											Submit
										</button>
									) :
									(
										<button
											onClick={this.submitForm}
										>
											Submit
										</button>
									)
								}
							</div>
						</form>
					</div>
				</div>
			</ResponsiveContainer>
		);
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(ContactPage);
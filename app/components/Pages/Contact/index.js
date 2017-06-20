import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import Abduction from '../../Scenes/Abduction';

import { ContactPageStyles } from '../../../styles/pages';

const underline = require('../../../assets/background/underline.svg');

const ContactPage = React.createClass({
	getInitialState() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: ''
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
			[name]: value
		});
	},

	submitForm() {
		var post = new XMLHttpRequest();
		post.open("POST", '../../../db/mailer.php');
		post.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		var form = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phone: this.state.phone,
			message: this.state.message
		};

		var data = JSON.stringify(form);
		post.send(data);

		this.refs.form.style.display = 'none';
		this.refs.thanks.style.display = 'block';
	},

	render() {
		return (
			<ResponsiveContainer>
				<div
					className={ContactPageStyles.sceneAndForm}
				>
					<div>
						<h1
							style={{
								background: 'url(' + underline + ') no-repeat',
							}}
						>
							Contact Me
						</h1>
						<Abduction />
					</div>
					<div
						ref="form"
					>
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
									<label for="phone">
										Phone:
									</label>
									<input 
										type="phone" 
										name="phone" 
										id="phone"
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
											type="button"
											onClick={this.submitForm}
										>
											Submit
										</button>
									)
								}
							</div>
						</form>
					</div>
					<div
						ref="thanks"
						style={{
							display: 'none'
						}}
					>
						<h1>
							Thank you!
						</h1>
						<p>
							Your message has been sent!
						</p>
						<p>
							I appreciate you reaching out to me and I will get back to you as soon as possible!
						</p>
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
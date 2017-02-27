import React from 'react';

const TimedContainer = React.createClass({
	propTypes: {
		tcDuration: React.PropTypes.number.isRequired
	},

	componentWillMount() {
		this.start = this.props.tcStart ? this.props.tcStart : 0;
		this.elapsedTime = 0;
		this.eventTime = 0;
	},

	componentDidMount() {
		this.timer = setInterval(this.timeCounter, this.props.tcIncrement ? this.props.tcIncrement : 1000);
	},

	componentWillUnmount() {
		this.stopTimer();
	},

	timeCounter() {
		this.elapsedTime = this.elapsedTime + 1;

		if(this.elapsedTime >= this.start) {
			this.eventTime = this.eventTime + 1;
		}

		if(this.eventTime >= this.props.tcDuration) {
			this.stopTimer();
		}
	},

	stopTimer() {
		clearInterval(this.timer);
	},

	// NEED A REDUX STORE AND EVENT LISTENER IN APP TO WATCH TIME?

	render() {
		return (
			<div style={{
				position: 'absolute', 
				top: this.eventTime * 100, 
				transition: 'top ease-in-out ' + this.props.tcDuration + 's'
			}}>
				{this.props.children}
			</div>
		)
	}
});

export default TimedContainer;
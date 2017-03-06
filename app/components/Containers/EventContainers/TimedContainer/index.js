import React from 'react';

import TimedComponent from './TimedComponent';

const TimedContainer = React.createClass({
	getInitialState() {
		return {
			delay: 0,
			elapsedTime: 0,
		}
	},

	propTypes: {
		tcDelay: React.PropTypes.number,
		tcIncrement: React.PropTypes.number,
		tcDuration: React.PropTypes.number.isRequired
	},

	getDefaultProps() {
		return {
			tcDelay: 0,
			tcIncrement: 1000
		}
	},

	componentWillMount() {
		this.delay = 0;
		this.elapsedTime = 0;
	},

	componentDidMount() {
		this.initializeTimer();
	},

	componentWillUnmount() {
		this.stopTimer();
	},

	initializeTimer() {
		this.timer = setInterval(this.timeCounter, this.props.tcIncrement);
	},

	timeCounter() {
		if(this.state.delay < this.props.tcDelay) {
			this.setState({
				...this.state,
				delay: this.state.delay + 1
			});
		}
		else
		{
			this.setState({
				...this.state,
				elapsedTime: this.state.elapsedTime + 1
			});
		}

		if(this.state.elapsedTime >= this.props.tcDuration) {
			this.stopTimer();
		}
	},

	stopTimer() {
		clearInterval(this.timer);
		this.stopped = true;
	},	

	render() {
		return (
			<TimedComponent time={this.state.elapsedTime} stop={this.state.elapsedTime >= this.props.tcDuration || this.stopped}>
				{this.props.children}
			</TimedComponent>
		)
	}
});

export default TimedContainer;
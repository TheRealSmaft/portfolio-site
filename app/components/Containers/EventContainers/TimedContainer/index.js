import React from 'react';

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
			tcIncrement: 1000,
			eventCount: 1
		}
	},

	componentWillMount() {
		this.delay = 0;
		this.elapsedTime = 0;
		this.eventsRemaining = this.props.eventCount;
	},

	componentDidMount() {
		this.initializeTimer();
	},

	componentWillUnmount() {
		this.stopTimer();
	},

	componentDidUpdate() {
		if(this.eventsRemaining > 0 && 
			this.state.elapsedTime === this.props.tcDuration) {
			this.fireChildUpdate();
			this.eventsRemaining--;
			console.log(this.eventsRemaining)
		}
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

	fireChildUpdate() {
		this.refs.timerChild.style.backgroundColor = 'pink';
	},

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, {
					['data-ElapsedTime']: this.state.elapsedTime,
					ref: 'timerChild'
				}
				)}
			</div>
		)
	}
});

export default TimedContainer;
import React from 'react';
import ReactDOM from 'react-dom';

const EventExecutor = React.createClass({
	getInitialState() {
		return {
			elapsedTime: 0,
		}
	},

	propTypes: {
		moments: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
		events: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
		increment: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			increment: 1000,
			loop: false
		}
	},

	componentWillMount() {
		this.elapsedTime = 0;

		this.momentsPassed = 0;
		this.momentTotal = this.props.moments.length;
		this.nextMoment = this.props.moments[0];

		this.duration = this.props.moments[this.momentTotal - 1];
	},

	componentDidMount() {
		this.initializeTimer();
	},

	componentWillUnmount() {
		this.stopTimer();
	},

	componentDidUpdate() {
		if(this.momentsPassed <= this.momentTotal &&
		   this.state.elapsedTime === this.nextMoment) {
			this.fireNextEvent();
		}
	},

	initializeTimer() {
		this.timer = setInterval(this.timeCounter, this.props.increment);
	},

	timeCounter() {
		this.setState({
			...this.state,
			elapsedTime: this.state.elapsedTime + 1
		});

		if(this.state.elapsedTime >= this.duration + 1) {
			if(this.props.loop)	{
				this.setState({
					...this.state,
					elapsedTime: 0
				})
				this.momentsPassed = 0;
				this.nextMoment = this.props.moments[this.momentsPassed];

				if(this.state.elapsedTime === this.nextMoment) {
					this.fireNextEvent();
				}
			}
			else
			{
				this.stopTimer();
			}
		}
	},

	stopTimer() {
		clearInterval(this.timer);
		this.stopped = true;
	},

	fireNextEvent() {
		this.props.events[this.momentsPassed](this.refs.target);

		this.momentsPassed = this.momentsPassed + 1;
		this.nextMoment = this.props.moments[this.momentsPassed];
	},

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, {
					['data-ElapsedTime']: this.state.elapsedTime,
					ref: 'target'
				}
				)}
			</div>
		)
	}
});

export default EventExecutor;
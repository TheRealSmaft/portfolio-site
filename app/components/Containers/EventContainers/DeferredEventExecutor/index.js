import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { interactableTypes, interactableActions } from '../../../../state/game/interactables';

import animation from '../../../../styles/animation';

const DeferredEventExecutor = React.createClass({
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
			loop: false,
			fireCondition: null,
			eventToTrigger: null
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
		if(this.checkFireCondition()) {
			this.initializeTimer();
			
			if(this.nextMoment === 0) {
				this.fireNextEvent();
			};
		}
	},

	componentWillUnmount() {
		this.stopTimer();
	},

	componentWillUpdate() {

	},

	componentDidUpdate() {
		if(this.checkFireCondition()) {
			if(this.momentsPassed <= this.momentTotal &&
			   this.state.elapsedTime === this.nextMoment) {
				this.fireNextEvent();
			}
		}
	},

	checkFireCondition() {
		if(this.props.fireCondition != null) {
			return this.props.interactables.firedEvents.includes(this.props.fireCondition);
		}
		else
		{
			return true;
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
		if(this.props.eventToTrigger != null) {
			this.props.addEventToFiredArray(this.props.eventToTrigger);
		}
	},

	fireNextEvent() {
		if(!this.refs.target.props) {
			this.props.events[this.momentsPassed](this.refs.target, animation);
		}
		else
		{
			this.props.events[this.momentsPassed](ReactDOM.findDOMNode(this.refs.target), animation, this.refs.target);
		}

		this.momentsPassed = this.momentsPassed + 1;
		this.nextMoment = this.props.moments[this.momentsPassed];
	},

	render() {
		return (
			<div
				style={{...this.props.style}}
			>
				{React.cloneElement(this.props.children, {
					['data-ElapsedTime']: this.state.elapsedTime,
					ref: 'target'
				}
				)}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		interactables: store.interactableState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeferredEventExecutor);
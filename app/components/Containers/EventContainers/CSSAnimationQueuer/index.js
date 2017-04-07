import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { interactableActions, interactableTypes } from '../../../../state/game/interactables';

const CSSAnimationQueuer = React.createClass({
	propTypes: {
		queueCount: React.PropTypes.number.isRequired,
		animationClass: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			initialStyle: null,
			triggeredByEvent: null,
			eventToTrigger: null,
			triggerDelay: null
		}
	},

	componentWillMount() {
		this.animationQueue = null;

		if(this.props.triggeredByEvent != null && this.props.initialStyle != null) {
			this.alreadyTriggered = this.checkForFiredEvent(this.props.triggeredByEvent);
		}
		else
		{
			this.alreadyTriggered = false;
			this.createAnimationQueue();
		}
	},

	componentDidMount() {
		if(this.props.eventToTrigger != null && 
			this.props.triggerDelay != null &&
			!this.checkForFiredEvent(this.props.eventToTrigger)) {
			this.startCountDown();
		};
	},

	componentDidUpdate() {
		if(this.props.triggeredByEvent != null &&
			this.props.initialStyle != null &&
			!this.alreadyTriggered &&
			this.checkForFiredEvent(this.props.triggeredByEvent)) {
			this.createAnimationQueue();
			this.alreadyTriggered = true;
			this.forceUpdate();
		}
	},

	createAnimationQueue() {
		var wrappedChild = <div>{this.props.children}</div>;

		for(var i = 0; i < this.props.queueCount; i++) {
			wrappedChild = <div>{wrappedChild}</div>;
		};

		this.animationQueue = (
			<div className={this.props.animationClass}>
				{wrappedChild}
			</div>
		);
	},

	checkForFiredEvent(event) {
		return this.props.interactables.firedEvents.includes(event);
	},

	startCountDown() {
		setTimeout(() => {
			this.props.addEventToFiredArray(this.props.eventToTrigger);
		}, this.props.triggerDelay);
	},

	render() {
		if(this.animationQueue === null) {
			return (
				<div style={this.props.style}>
					<div className={this.props.initialStyle}>
						{this.props.children}
					</div>
				</div>
			)
		}
		else
		{
			return (
				<div style={this.props.style}>
					{this.animationQueue}
				</div>
			)
		}
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
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSAnimationQueuer);
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DeferredEventExecutor from '../../EventContainers/DeferredEventExecutor';
import CSSAnimationQueuer from '../../EventContainers/CSSAnimationQueuer';

import { interactableTypes, interactableActions } from '../../../../state/game/interactables';

import { testStyles } from '../../../../styles/pages';

const PhysicsContainer = React.createClass({
	componentWillMount() {	
		this.world = this.getWorld();
		this.divCount = 1;
	},

	componentDidMount() {
		this.physElement = ReactDOM.findDOMNode(this.refs.physElement);
		this.physRect = this.getPhysElementRect();

		setTimeout(() => {
			if(this.physRect.bottom < this.world.bottom)	{
				this.applyGravity();
			}
		}, 500)
	},

	applyGravity() {
		this.physRect = this.getPhysElementRect();
		this.fall();
	},

	fall() {
		this.fallDuration = (this.world.bottom - this.physRect.bottom) * .5;

		this.physElement.style.animationDuration = this.fallDuration + 'ms';
		this.physElement.classList.add(testStyles.fall)

		this.fallTimer = setInterval(this.fallCounter, 10);
	},

	fallCounter() {
		this.fallDuration = this.fallDuration - 10;
		if(this.fallDuration < 10) {
			clearInterval(this.fallTimer);
			this.bounce();
		}
	},

	bounce() {
		this.wrapElementInNewDiv();
		this.physElement.classList.add(testStyles.bounce);
	},

	wrapElementInNewDiv() {
		this.divCount++;
		this.physElement = this.refs.physElement.parentNode;
		this.physRect = this.getPhysElementRect();
	},

	getPhysElementRect() {
		return this.physElement.getBoundingClientRect();
	},

	getWorld() {
		return {
			top: 0,
			bottom: window.innerHeight,
			left: 0,
			right: window.innerWidth
		}
	},

	render() {
		var divs = this.props.children;

		for(var i = 0; i < this.divCount; i++) {
			if(i === this.divCount - 1) {
				divs = <div ref="physElement" style={{display: 'block', position: 'absolute'}}>{divs}</div>;
			}
			else
			{
				divs = <div style={{display: 'block', position: 'absolute'}}>{divs}</div>;
			}
		}

		return (
			<div>
				{divs}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PhysicsContainer);
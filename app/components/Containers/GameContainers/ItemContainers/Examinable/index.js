import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DeferredEventExecutor } from '../../../../Containers';

import { modeActions, modeTypes } from '../../../../../state/game/mode';
import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { scrollEventActions, scrollEventTypes } from '../../../../../state/events/scroll';

import ExaminableStyles from '../../../../../styles/examinables';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const Examinable = React.createClass({
	componentWillMount() {
		this.getItemInfo();
	},

	componentDidMount() {
		this.createAnimation();

		if(this.item.name === 'Paper' ||
			this.item.name === 'Crumpled Paper') {
			ReactDOM.findDOMNode(this.refs.itemImage).firstChild.classList.add(ExaminableStyles.paper);
		}

		this.refs.scene.addEventListener('click', this.closeExamination);
	},

	componentWillUnmount() {
		if(this.animation) {
			this.animation.destroy();
		}

		this.props.unlockScrollPosition();
	},

	componentWillReceiveProps(nextProps) {
		if(!this.props.interactables.firedEvents.includes('updatePaper') && 
			nextProps.interactables.firedEvents.includes('updatePaper')) {
			this.updateItem();
			if(this.props.mode.progressLevel === 2) {
				this.props.updateGameProgress(2.5);
			}
			if(this.props.mode.progressLevel === 3) {
				this.props.updateGameProgress(3.5);	
			}
		}
	},

	componentDidUpdate() {
		if(this.checkFireCondition() && !this.animationFired &&
			!this.alreadyFired) {
			this.animationFired = true;
			this.refs.animation.style.visibility = 'visible';
			if(this.item.password) {
				this.createPasswordElement();
			}
			setTimeout(() => {
				this.animationPlaying = true;
				this.animation.play();
				this.suspendClosing();
			}, 50)
		}
	},

	getItemInfo() {
		var name = this.props.items.examinable;
		var index = _.findIndex(this.props.items.items, function(obj) {
			return obj.name === name;
		});

		if(index > -1) {
			this.item = this.props.items.items[index];
		}
		else
		{
			this.item = null;
		}

		if(this.item != null) {
			this.updateDeferredEvents();
			this.props.lockScrollPosition();
			this.alreadyFired = this.checkFireCondition();

			if(this.item.name === 'Paper') {
				this.item.password = this.props.mode.password;
			}
		}
	},

	createAnimation() {
		if(this.item.animationToTrigger) {
			var animationData = this.item.animationToTrigger;
			var animationData = {
				...animationData,
				container: this.refs.animation
			}

			this.animation = BodyMovin.loadAnimation(animationData);
			this.animation.addEventListener('complete', this.animationComplete);

			if(this.item.changeAfterAnimation) {
				this.animation.addEventListener('complete', this.updateItem);
			}

			if(this.item.animationReplacesImage) {
				this.refs.animation.style.visibility = 'visible';
				var initialFrame = this.item.initialFrame > -1 ? this.item.initialFrame : this.animation.totalFrames;
				this.animation.goToAndStop(initialFrame, true);
				this.refs.animation.style.pointerEvents = 'none';
				this.refs.animation.firstChild.childNodes[1].style.pointerEvents = 'auto';
				this.refs.animation.firstChild.childNodes[1].classList.add(ExaminableStyles.clickWillFireEvent);
				this.refs.animation.firstChild.childNodes[1].addEventListener('click', this.clickEvent);
			}

			if(this.alreadyFired) {
				this.refs.animation.style.visibility = 'visible';
				this.animation.goToAndStop(this.animation.totalFrames, true);
				if(this.item.password) {
					this.createPasswordElement();
				}
			}
		}
	},

	updateDeferredEvents() {
		if(this.item.deferredEvents.moments.length > 0) {
			this.item.deferredEvents.moments.push(this.item.deferredEvents.moments[this.item.deferredEvents.moments.length - 1] + 1);
			this.item.deferredEvents.events.push(() => {this.updateItem()});
		}
	},

	checkFireCondition() {
		if(this.item.fireCondition != undefined) {
			if(this.props.interactables.firedEvents.includes(this.item.fireCondition)){
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},

	createPasswordElement() {
		var passwordElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
		passwordElement.setAttribute("font-size", "72");
		passwordElement.setAttribute("font-family", "Comic Sans MS");
		passwordElement.setAttribute("fill", "rgba(255,255,255,0.85)");
		passwordElement.setAttribute("x", "-5%");
		passwordElement.setAttribute("y", "16%");
		passwordElement.style.transform = "rotateZ(-20deg)";
		passwordElement.style.width = '50%';
		passwordElement.innerHTML = this.item.password;

		this.refs.animation.firstChild.childNodes[1].firstChild.appendChild(passwordElement);
	},

	suspendClosing() {
		this.refs.scene.removeEventListener('click', this.closeExamination);	
	},

	resumeClosing() {
		if(!this.animationPlaying) {
			this.refs.scene.addEventListener('click', this.closeExamination);	
		}
	},

	animationComplete() {
		this.animationPlaying = false;
		this.resumeClosing();
	},

	closeExamination() {
		this.props.toggleItemExamine();
		this.props.unlockScrollPosition();

		if(this.animation) {
			this.animation.destroy();
		}
	},

	clickEvent() {
		if(this.item.clickEvent) {
			var event = this.item.clickEvent();
			if(event === true) {
				this.closeExamination();
			}
		}
		if(this.item.eventToFire) {
			if(this.item.triggerItem) {
				if(this.item.triggerItem === this.props.items.draggable) {
					this.props.addEventToFiredArray(this.item.eventToFire);
				}
			}
			else
			{
				this.props.addEventToFiredArray(this.item.eventToFire);
			}
		}
	},

	updateItem() {
		var name = this.item.name;
		
		this.props.changeItemStatus(name, 'used');

		if(name === "Broken Link") {
			this.animation.destroy();
			this.props.updateGameProgress(10);
		}

		if(name === 'Crumpled Paper') {
			setTimeout(() => {
				this.closeExamination();
			}, 500)
		}

		this.item = this.item.nextItemState;

		this.props.addItemToArray(this.item);

		this.props.toggleItemExamine(this.item.name);

		this.getItemInfo();
		this.createAnimation();
		this.updateDeferredEvents();

		this.alreadyFired = this.checkFireCondition();
	},

	render() {
		if(this.item === null) {
			return null;
		}
		else
		{
			return (
				<div
					ref="scene"
					className={ExaminableStyles.examinationScene}
					style={{
						...this.props.style,
						display: this.item === null ? 'none' : 'block'
					}}
				>
					<DeferredEventExecutor
						ref="itemImage"
						moments={this.item.deferredEvents.moments}
						events={this.item.deferredEvents.events}
						increment={this.item.deferredEvents.increment ? this.item.deferredEvents.increment : 1000}
						loop={this.item.deferredEvents.loop ? this.item.deferredEvents.loop : false}
						fireCondition={this.item.deferredEvents.fireCondition ? this.item.deferredEvents.fireCondition : null}
						eventToTrigger={this.item.deferredEvents.eventToTrigger ? this.item.deferredEvents.eventToTrigger : null}
						style={{
							height: this.item.name === 'Paper' || this.item.name === "Crumpled Paper" ? '100%' : 'auto'
						}}
					>
						<img
							className={this.item.eventToFire || this.item.clickEvent ? ExaminableStyles.clickWillFireEvent : ''}
							src={this.item.examineImage}
							style={{
								display: this.item.animationReplacesImage ? 'none' : 'block',
								width: this.item.examineWidth ? this.item.examineWidth : '100%',
								height: 'auto'
							}}
							onClick={() => {this.clickEvent()}}
							onMouseOver={() => {this.suspendClosing()}}
							onMouseLeave={() => {this.resumeClosing()}}
						/>
					</DeferredEventExecutor>
					<div
						className={ExaminableStyles.animationContainer}
					>
						<div
							ref="animation"
							className={this.item.name === 'Paper' ? ExaminableStyles.scribble : ''}
							style={{
								visibility: 'hidden'
							}}
							onMouseOver={() => {this.suspendClosing()}}
							onMouseLeave={() => {this.resumeClosing()}}
						>
						</div>
					</div>
				</div>
			);
		}
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		items: store.itemState,
		interactables: store.interactableState,
		scrollState: store.scrollState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGameProgress: modeActions.updateGameProgress,
		addItemToArray: itemActions.addItemToArray,
		changeItemStatus: itemActions.changeItemStatus,
		toggleItemExamine: itemActions.toggleItemExamine,
		addEventToFiredArray: interactableActions.addEventToFiredArray,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Examinable);
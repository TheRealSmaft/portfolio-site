import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DeferredEventExecutor } from '../../../../Containers';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { scrollEventActions, scrollEventTypes } from '../../../../../state/events/scroll';

import ExaminableStyles from '../../../../../styles/examinables';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const Examinable = React.createClass({
	componentDidUpdate() {
		if(this.item != null) {
			if(this.item.animationToTrigger && !this.animation) {
				var animationData = this.item.animationToTrigger;
				var animationData = {
					...animationData,
					container: this.refs.animation
				}

				this.animation = BodyMovin.loadAnimation(animationData);
			}

			if(this.checkFireCondition() && !this.animationFired) {
				this.animationFired = true;
				this.refs.animation.style.visibility = 'visible';
				if(this.item.password) {
					var passwordElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
					passwordElement.setAttribute("font-size", "80");
					passwordElement.setAttribute("font-family", "Comic Sans MS");
					passwordElement.setAttribute("fill", "rgba(255,255,255,0.85)");
					passwordElement.setAttribute("x", "-5%");
					passwordElement.setAttribute("y", "16%");
					passwordElement.style.transform = "rotateZ(-20deg)";
					passwordElement.style.width = '50%';

					passwordElement.innerHTML = this.item.password;
					this.refs.animation.firstChild.childNodes[1].firstChild.appendChild(passwordElement);
				}
				setTimeout(() => {
					this.animation.play();
				}, 50)
			}
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

	closeExamination() {
		this.props.toggleItemExamine();
	},

	clickEvent() {
		if(this.item.clickEvent) {
			this.item.clickEvent();
		}
		if(this.item.eventToFire) {
			this.props.addEventToFiredArray(this.item.eventToFire);
		}
	},

	updateItem() {
		var name = this.item.name;
		var index = _.findIndex(this.props.items.items, function(obj) {
			return obj.name === name;
		});

		this.props.changeItemStatus(index, 'used');
		this.props.addItemToArray(this.item.nextItemState);
	},

	render() {
		this.item = this.props.items.examinable != null ? 
					  _.find(this.props.items.items, ['name', this.props.items.examinable]) :
					  null;
		if(this.item != null) {
			this.item.deferredEvents.moments.push(this.item.deferredEvents.moments[this.item.deferredEvents.moments.length - 1] + 1);
			this.item.deferredEvents.events.push(() => {this.updateItem()});
		}
		var itemElement = this.item != null ?
			(
				<DeferredEventExecutor
					moments={this.item.deferredEvents.moments}
					events={this.item.deferredEvents.events}
					increment={this.item.deferredEvents.increment ? this.item.deferredEvents.increment : 1000}
					loop={this.item.deferredEvents.loop ? this.item.deferredEvents.loop : false}
					fireCondition={this.item.deferredEvents.fireCondition ? this.item.deferredEvents.fireCondition : null}
				>
					<img
						className={this.item.eventToFire || this.item.clickEvent ? ExaminableStyles.clickWillFireEvent : ''}
						src={this.item.examineImage}
						onClick={() => {this.clickEvent()}}
					/>
				</DeferredEventExecutor>
			) : null;

		return (
			<div
				className={ExaminableStyles.examinationScene}
				style={{
					...this.props.style,
					display: this.item === null ? 'none' : 'block'
				}}
			>
				<img
					className={ExaminableStyles.exitButton}
					onClick={this.closeExamination}
					src={require('../../../../../assets/images/interactables/Inventory/ExitButton.svg')}
				/>
				{itemElement}
				<div
					className={ExaminableStyles.animationContainer}
				>
					<div
						ref="animation"
						style={{
							visibility: 'hidden'
						}}
					>
					</div>
				</div>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		interactables: store.interactableState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray,
		changeItemStatus: itemActions.changeItemStatus,
		toggleItemExamine: itemActions.toggleItemExamine,
		addEventToFiredArray: interactableActions.addEventToFiredArray,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Examinable);
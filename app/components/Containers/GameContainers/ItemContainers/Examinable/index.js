import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DeferredEventExecutor } from '../../../../Containers';

import { TriggerZone } from '../../../GameContainers';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { scrollEventActions, scrollEventTypes } from '../../../../../state/events/scroll';

import ExaminableStyles from '../../../../../styles/examinables';

const Examinable = React.createClass({
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

		this.props.changeItemStatus(index, 'allocated');
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

		var triggerItem = this.item != null && this.item.triggerItem ? this.item.triggerItem : 'none';

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
				<TriggerZone
					triggerItem={triggerItem}
				>
					{itemElement}
				</TriggerZone>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState
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
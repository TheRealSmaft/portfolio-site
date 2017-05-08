import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DeferredEventExecutor } from '../../../../Containers';

import ExaminableStyles from '../../../../../styles/examinables';

const Examinable = React.createClass({
	componentWillMount() {
		this.item = null;
	},

	componentDidUpdate() {
		var item = null;
		if(this.props.items.examinable != null) {
			item = _.find(this.props.items.items, ['name', this.props.items.examinable]);
		}

		if(item != null) {
			this.item = (
				<DeferredEventExecutor
					moments={item.deferredEvents.moments}
					events={item.deferredEvents.events}
					increment={item.deferredEvents.increment}
					loop={item.deferredEvents.loop}
				>
					<img
						style={{
							width: item.examineWidth ? item.examineWidth : '50%'
						}}
						src={item.examineImage}
					/>
				</DeferredEventExecutor>
			);
		}

	},

	render() {
		return (
			<div
				className={ExaminableStyles.examinationScene}
				style={{
					...this.props.style,
					display: this.item === null ? 'none' : 'flex'
				}}
			>
				{this.item}
			</div>
		);
		
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState
	}
};

export default connect(mapStateToProps)(Examinable);
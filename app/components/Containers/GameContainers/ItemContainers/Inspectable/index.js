import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from '../ItemComponent';

const Inspectable = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},

	render() {
		return (
			<Item
				item={this.props.item}
			/>
		)
	}
});

export default Inspectable;
import React from 'react';
import { connect } from 'react-redux';

import { style3D } from '../../../../styles/3DContainer';

const ThreeDSpace = React.createClass({
	propTypes: {
		perspective: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			perspective: 800
		}
	},

	render() {
		return (
			<div 
				className={style3D.world}
				style={{
					...this.props.style,
					perspective: this.props.perspective + 'px'
				}}
			>
				{this.props.children}
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
};

export default connect(mapStateToProps)(ThreeDSpace);
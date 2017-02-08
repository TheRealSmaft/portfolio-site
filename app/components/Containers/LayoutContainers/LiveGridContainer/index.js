import React from 'react';
import { GridRow } from '../../../Components/GridComponents';

class LiveGridContainer extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return <div>{this.props.children}</div>;
	}
};

export default LiveGridContainer;
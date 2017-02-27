import React from 'react';

import Row from './GridComponents/Row';

const GridContainer = React.createClass({
	propTypes: {
		gutter: React.PropTypes.number,
		breakPoints: React.PropTypes.array.isRequired
	},

	componentWillMount() {
		this.gutter = this.props.gutter != undefined ? this.props.gutter : 2;
		this.breakLevel = this.getBreakPoint();
	},

	componentWillUpdate() {
		this.breakLevel = this.getBreakPoint();
	},

	getBreakPoint() {
		var bl = 0;
		
		for(var i = 0; i < this.props.breakPoints.length; i++) {
			if(window.innerWidth < this.props.breakPoints[i]) {
				bl = i + 1;
			}
		}
		
		return bl;
	},

	render() {
		let rows = React.Children.map(this.props.children, (row, i) => {
			return (
				<Row gutter={this.gutter} breakLevel={this.breakLevel}>
					{row}
				</Row>
			)
		});
		return <div style={{display: 'inline-block'}}>{rows}</div>;
	}
});

export default GridContainer;
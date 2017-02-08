import React from 'react';

export default class GridColumn extends React.Component {
	render() {
		return (
			<div 
				style={{
					float: 'left',
					width: (100 - this.props.count * this.props.gutter) / this.props.count + '%',
					paddingRight: this.props.gutter + '%'
				}}>
				{this.props.children}
			</div>
		)
	}
};
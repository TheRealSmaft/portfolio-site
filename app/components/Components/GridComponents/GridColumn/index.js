import React from 'react';

export default class GridColumn extends React.Component {
	componentWillMount() {
		this.colWidth = ((100 - this.props.rowBlocks * this.props.gutter) + this.props.gutter) / this.props.rowBlocks;
		this.gutter = this.props.gutter;

		if(this.props.blocks != undefined) {
			this.colWidth = this.colWidth * this.props.blocks + (this.props.gutter * (this.props.blocks - 1));
		}

		if(this.props.lastBlock) {
			this.gutter = 0;
		}
	}

	render() {
		return (
			<div 
				style={{
					float: 'left',
					width: this.colWidth + '%',
					marginRight: this.gutter + '%'
				}}>
				{this.props.children}
			</div>
		)
	}
};
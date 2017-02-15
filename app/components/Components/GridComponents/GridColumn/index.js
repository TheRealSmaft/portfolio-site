import React from 'react';
import ReactDOM from 'react-dom';

const GridColumn = React.createClass({
	componentWillMount() {
		this.setColumnWidth();
		this.checkForEmptyColumns();

		this.domStyle = {
			float: 'left',
			width: this.colWidth + '%',
			marginRight: this.gutter + '%'
		};
	},

	setColumnWidth() {
		this.colWidth = ((100 - this.props.rowBlocks * this.props.gutter) + this.props.gutter) / this.props.rowBlocks;
		this.gutter = this.props.gutter;

		if(this.props.blocks != undefined) {
			this.colWidth = this.colWidth * this.props.blocks + (this.props.gutter * (this.props.blocks - 1));
		}

		if(this.props.lastBlock) {
			this.gutter = 0;
		}
	},

	checkForEmptyColumns() {
		if(this.props.children == undefined) {
			this.children = <p> </p>;
		}
	},

	getBreakColumnWidth(breakLevel) {
		if(this.props.breaks[breakLevel] != 100) {
			return  this.props.breaks[breakLevel] - this.gutter;
		} 
		else
		{
			return this.props.breaks[breakLevel];
		}
	},

	render() {
		if(this.props.breakLevel > 0 && this.props.breakLevel < 6) {
			var width = this.getBreakColumnWidth(this.props.breakLevel - 1);
			return (
				<div 
					style={{
						...this.domStyle,
						width: width + '%'
					}}>
					{this.children ? this.children : this.props.children}
				</div>
			)
		}
		else 
		{
			return (
				<div 
					style={this.domStyle}>
					{this.children ? this.children : this.props.children}
				</div>
			)
		}
	}
});

export default GridColumn;
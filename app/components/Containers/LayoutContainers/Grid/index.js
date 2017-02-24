import React from 'react';

const GridContainer = React.createClass({
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
				<div>
					{React.cloneElement(row,
						{ 
							gutter: this.gutter,
							breakLevel: this.breakLevel
						}
					)}
				</div>
			)
		});
		return <div style={{display: 'inline-block'}}>{rows}</div>;
	}
});

export default GridContainer;
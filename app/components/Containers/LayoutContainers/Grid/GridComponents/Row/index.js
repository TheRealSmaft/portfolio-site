import React from 'react';

import { gridStyles } from '../../../../../../styles';

const GridRow = React.createClass({
	componentWillMount() {
		this.blocks = this.props.blocks ? this.props.blocks : this.props.children.length;
		this.count = this.props.children.length;
	},
	
	render() {
		let cols = React.Children.map(this.props.children, (col, i) => {
			return (
				<div>
					{React.cloneElement(col,
						{ 
							ref: 'col' + i,
							lastBlock: this.props.children.length == i + 1,
							rowBlocks: this.blocks,
							gutter: this.props.gutter,
							breakLevel: this.props.breakLevel
						}
					)}
				</div>
			)
		});

		return (
			<div className={gridStyles}>
				{cols}
			</div>
		);
	}
});

export default GridRow;
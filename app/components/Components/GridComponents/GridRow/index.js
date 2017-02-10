import React from 'react';

import { gridStyles } from '../../../../styles';

export default class GridRow extends React.Component {
	constructor(props) {
		super(props);

		this.blocks = this.props.children.length;
	}

	render() {
		React.Children.forEach(this.props.children, (col, i) => {
			if(col.props.blocks != undefined) {
				this.blocks = this.blocks + col.props.blocks - 1;
			}
		});

		let cols = React.Children.map(this.props.children, (col, i) => {
			return (
				<div>
					{React.cloneElement(col,
						{ 
							lastBlock: this.props.children.length == i + 1,
							rowBlocks: this.blocks,
							rowCount: this.props.children.length,
							gutter: this.props.gutter,
							windowState: this.props.windowState,
							getWindowSize: this.props.getWindowSize
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
};
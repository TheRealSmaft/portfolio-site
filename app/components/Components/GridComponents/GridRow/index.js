import React from 'react';
import { GridColumn } from '../';

import { gridStyles } from '../../../../styles';

export default class GridRow extends React.Component {
	componentWillMount() {
		this.colCount = this.props.children.length;
		this.gutter;

		if(this.props.gutter != undefined) {
			this.gutter = this.props.gutter;
		} else {
			this.gutter = 2;
		}
	}

	render() {
		let cols = React.Children.map(this.props.children, (col, i) => {
			var gutter = this.gutter;

			if(i + 1 == this.colCount) {
				gutter = 0;
			}

			return (
				<GridColumn count={this.colCount} gutter={gutter}>
					{col}
				</GridColumn>
			) 
		});

		return <div className={gridStyles} style={{clear: 'both'}}>{cols}</div>;
	}
};
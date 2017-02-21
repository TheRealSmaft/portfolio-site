import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const GridContainer = React.createClass({
	getInitialState() {
		return {
			breakLevel: this.getBreakPoint(),
			rows: 0
		}
	},

	componentWillMount() {
		this.gutter = this.props.gutter != undefined ? this.props.gutter : 2;
		this.count = this.props.children.length ? this.props.children.length : 1;
		this.minColWidth = this.props.minColWidth ? this.props.minColWidth : 60;
	},

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();
	},

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	},

	handleWindowResize() {
		this.setState({
			...this.state,
			breakLevel: this.getBreakPoint()
		})
	},

	getBreakPoint() {
		var bl = 0;

		for(var i = 0; i < this.props.breakPoints.length; i++) {
			if(this.props.windowState.width < this.props.breakPoints[i]) {
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
							ref: 'row' + i,
							gutter: this.gutter,
							breakLevel: this.state.breakLevel
						}
					)}
				</div>
			)
		});
		return <div style={{display: 'inline-block'}}>{rows}</div>;
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState,
	}
}

export default connect(mapStateToProps)(GridContainer);
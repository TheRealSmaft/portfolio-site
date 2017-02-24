import React from 'react';
import ReactDOM from 'react-dom';

const ResponsiveContainer = React.createClass({
	componentWillMount() {
		this.styles = {
			clear: 'both',
			minWidth: this.props.rcMinWidth ? this.props.rcMinWidth : 200,
			maxWidth: this.props.rcMaxWidth ? this.props.rcMaxWidth : 1000,
			width: this.props.rcWidth ? this.props.rcWidth + '%' : '80%'
		}
	},

	componentWillUpdate() {
		var elementWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
		var maxWidth = this.props.rcMaxWidth ? this.props.rcMaxWidth : 1000;

		if(elementWidth >= maxWidth) {
			this.centerAtMaxWidth(elementWidth, window.innerWidth);
		}
		else
		{
			this.centerBelowMaxWidth();
		}
	},

	centerAtMaxWidth(elementWidth, windowWidth) {
		this.margin = (windowWidth - elementWidth)/2;
	},

	centerBelowMaxWidth() {
		this.margin = this.props.rcWidth ? (100 - this.props.rcWidth)/2 + '%' : '10%';
	},

	render() {
		return (
			<div 
				style={{...this.styles, marginLeft: this.margin}}>
				{this.props.children}
			</div>
		)
	}
});

export default ResponsiveContainer;
import React from 'react';

const ResponsiveContainer = React.createClass({
	propTypes: {
		rcMinWidth: React.PropTypes.number,
		rcMaxWidth: React.PropTypes.number,
		rcWidth: React.PropTypes.number,
		rcMargin: React.PropTypes.number,
		rcDisplay: React.PropTypes.string
	},

	componentWillMount() {
		this.styles = {
			minWidth: this.props.rcMinWidth ? this.props.rcMinWidth : 200,
			maxWidth: this.props.rcMaxWidth ? this.props.rcMaxWidth : 1000,
			width: this.props.rcWidth ? this.props.rcWidth + '%' : '80%',
			margin: this.props.rcMargin ? '0 ' + this.props.rcMargin + '%' : '0 auto',
			display: this.props.rcDisplay ? this.props.rcDisplay : 'block'
		}
	},

	render() {
		return (
			<div 
				style={this.styles}>
				{this.props.children}
			</div>
		)
	}
});

export default ResponsiveContainer;
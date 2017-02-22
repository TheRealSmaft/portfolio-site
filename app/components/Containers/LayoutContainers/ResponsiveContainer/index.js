import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const ResponsiveContainer = React.createClass({
	componentWillMount() {
		this.styles = {
			clear: 'both',
			minWidth: this.props.rcMinWidth ? this.props.rcMinWidth : 200,
			maxWidth: this.props.rcMaxWidth ? this.props.rcMaxWidth : 1000,
			width: this.props.rcWidth ? this.props.rcWidth + '%' : '80%',
			marginLeft: this.props.rcWidth ? (100 - this.props.rcWidth)/2 + '%' : '10%'
		};

		var widthInPercent = (this.props.rcWidth ? this.props.rcWidth : 80)/100;
		var initialElementWidth = this.props.windowState.width * widthInPercent;

		if(initialElementWidth > this.styles.maxWidth - 1) {
			this.centerPageInDOM();
		}
	},

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);

		this.domElement = ReactDOM.findDOMNode(this);
		this.handleWindowResize();
	},

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	},

	handleWindowResize() {
		if(this.domElement.getBoundingClientRect().width > this.styles.maxWidth - 1) {
			setTimeout(() => {
				this.centerPageInDOM();
			}, 5);
		}
		else
		{
			this.styles = {
				...this.styles,
				width: this.props.rcWidth ? this.props.rcWidth + '%' : '80%',
				marginLeft: this.props.rcWidth ? (100 - this.props.rcWidth)/2 + '%' : '10%'
			};
		}
	},

	centerPageInDOM() {
		this.margin = (this.props.windowState.width - this.styles.maxWidth) / 2;

		this.styles= {
			...this.styles,
			marginLeft: this.margin,
		};
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

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
}

export default connect(mapStateToProps)(ResponsiveContainer);
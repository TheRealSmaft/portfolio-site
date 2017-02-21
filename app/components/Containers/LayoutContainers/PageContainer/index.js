import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const PageContainer = React.createClass({
	getInitialState() {
		return {
			styles: {
				clear: 'both',
				minWidth: this.props.minWidth ? this.props.minWidth : 200,
				maxWidth: this.props.maxWidth ? this.props.maxWidth : 1000,
				width: '80%',
				marginLeft: '10%'
			},
		}
	},

	componentWillMount() {
		if(this.props.windowState.width > this.state.styles.maxWidth - 1) {
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
		if(this.domElement.getBoundingClientRect().width > this.state.styles.maxWidth - 1) {
			setTimeout(() => {
				this.centerPageInDOM();
			}, 5);
		}
		else
		{
			this.setState({
				...this.state,
				styles: {
					...this.state.styles,
					width: '80%',
					marginLeft: '10%'
				}
			})
		}
	},

	centerPageInDOM() {
		this.margin = (this.props.windowState.width - this.state.styles.maxWidth) / 2;

		this.setState({
			...this.state,
			styles: {
				...this.state.styles,
				marginLeft: this.margin,
			}
		});
	},

	render() {
		return (
			<div 
				style={this.state.styles}>
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

export default connect(mapStateToProps)(PageContainer);
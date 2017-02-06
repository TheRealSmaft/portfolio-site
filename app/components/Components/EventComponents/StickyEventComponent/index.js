import React from 'react';
import ReactDOM from 'react-dom';

class StickyEventComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stickyStyles: {
				position: "fixed",
				top: 0,
				left: 0
			},
			placeholderStyles: {
				position: "static",
				height: 0,
				width: 0
			}
		}
	}
	
	componentWillMount() {
		this.setState((prevState, props) => ({
			stickyStyles: {
				position: "fixed",
				top: this.props.stickyPosY,
				left: this.props.stickyPosX
			}
		}));
	}

	componentDidMount() {
		var thisDiv = ReactDOM.findDOMNode(this);

		this.setState((prevState, props) => ({
			placeholderStyles: {
				height: thisDiv.clientHeight,
				width: thisDiv.clientWidth,
				position: "static"
			}
		}));
	}

	render() {
		if(this.props.windowState.scrollY > this.props.stickyStartY ||
			this.props.windowState.scrollX > this.props.stickyStartX) {
			return (
				<div style={this.state.placeholderStyles}>
					<div 
						className={this.props.childStyles} 
						style={this.state.stickyStyles}>
						{this.props.children}
					</div>
				</div>
			)
		}
		else 
		{
			return (
				<div>
					{this.props.children}
				</div>
			)
		}
	}
};

export default StickyEventComponent;
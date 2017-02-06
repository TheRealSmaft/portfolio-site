import React from 'react';

var styles;

const StickyEventComponent = React.createClass({
	componentWillMount() {
		styles = {
			top: this.props.stickyPosY,
			left: this.props.stickyPosX
		}
	},

	render() {
		if(this.props.windowState.scrollY > this.props.stickyStart) {
			return (
				<div 
					className={this.props.stickyStyles} 
					style={styles}>
					{this.props.children}
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
});

export default StickyEventComponent;
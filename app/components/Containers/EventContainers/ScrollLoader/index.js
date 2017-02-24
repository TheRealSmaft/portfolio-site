import React from 'react';
import ScrollLoad from './ScrollLoad';

const ScrollLoader = React.createClass({
	componentWillMount() {
		this.count = this.props.children.length;
		this.childrenLoaded = 0;
		this.loadNext = false;
	},

	componentWillUpdate() {
		this.loadNext = this.shouldItLoadContent() && this.childrenLoaded < this.count;

		if(this.loadNext) {
			this.childrenLoaded++;
		}
	},

	shouldItLoadContent() {
		return this.props.loadPoint ? window.scrollY + this.props.loadPoint > document.body.clientHeight - (window.innerHeight - 1) : window.scrollY + window.innerHeight > document.body.clientHeight - (window.innerHeight * .1);
	},

	render() {
		let loads = React.Children.map(this.props.children, (load, i) => {
			return (
				<ScrollLoad timeToLoad={i < this.childrenLoaded}>
					{load}
				</ScrollLoad>
			)
		});

		return (
			<div>
				{loads}
			</div>
		)
	}
});

export default ScrollLoader;
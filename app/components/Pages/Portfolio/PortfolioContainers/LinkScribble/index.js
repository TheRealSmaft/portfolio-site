import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const LinkScribble = React.createClass({
	componentWillMount() {
		this.linkClickable = false;
	},

	componentDidMount() {
		var animationData = {
			animationData: require('../../../../../assets/images/interactables/LinkScribble/LinkScribble.json'),
			path: '../../../../../assets/images/interactables/LinkScribble',
			loop: false,
			autoplay: false,
			name: 'linkScribble',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.scribble)
		};

		this.scribble = BodyMovin.loadAnimation(animationData);
		this.scribble.addEventListener('complete', this.makeLinkClickable);
	},

	eraseScribble() {
		this.scribble.play();
	},

	makeLinkClickable() {
		this.scribble.removeEventListener('complete', this.makeLinkClickable);
		this.scribble.destroy();
		this.linkClickable = true;
		this.refs.scribble.parentNode.childNodes[0].style.pointerEvents = 'auto';
	},

	render() {
		return (
			<div
				className={this.props.className}
			>
				<Link 
					to="/contact"
					style={{
						pointerEvents: 'none'
					}}
				>
					contact&nbsp;me!
				</Link>
				<div
					ref="scribble"
					onClick={this.eraseScribble}
				>
				</div>
			</div>
		);
	}
})

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(LinkScribble);
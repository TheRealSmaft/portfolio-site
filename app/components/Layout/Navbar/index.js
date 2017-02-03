import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { windowEventActions, windowEventTypes } from '../../../state/events/window';

import StickyContainer from '../../Containers/StickyContainer';

const Navbar = React.createClass({
	componentDidMount() {
		window.addEventListener('scroll', this.props.windowPositionUpdate);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.windowPositionUpdate);
	},

	render() {
		var links = this.props.links.map(function(link){
			return (
				<li key={link.name}>
					<a href={link.url}>
						{link.name}
					</a>
				</li>
			);
		})
		return (
			<StickyContainer scrollY={this.props.windowState.scrollY}>
				<ul className={this.props.navStyles}>
					{links}
				</ul>
			</StickyContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		windowPositionUpdate: windowEventActions.windowPositionUpdate
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles, navbarStyles } from '../styles';

import { ResponsiveContainer, StickyContainer, Navbar } from './Containers';

import { Inventory, Examinable } from './Containers/GameContainers';

import { windowEventActions, windowEventTypes } from '../state/events/window';
import { scrollEventActions, scrollEventTypes } from '../state/events/scroll';

const App = React.createClass({
	componentWillMount() {
		this.props.getWindowSize();
		this.scrollLocked = this.props.scrollState.scrollLocked;
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getScrollPosition);
		window.addEventListener('resize', this.props.getWindowSize);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getScrollPosition);
		window.removeEventListener('resize', this.props.getWindowSize);
	},

	componentWillReceiveProps(nextProps) {
		if(this.props.scrollState.scrollLocked != nextProps.scrollState.scrollLocked) {
			if(nextProps.scrollState.scrollLocked) {
				document.body.style.overflow = "hidden";
				if(document.body.clientHeight > window.innerHeight){
					document.body.style.marginRight = '17px';
				}
			}
			else
			{
				document.body.style.overflow = "";
				document.body.style.marginRight = '0px';
			}
		}
	},

	render() {
		var clickBlocker = this.props.mode.gameMode ? (
			<div
				style={{
					display: this.props.sceneState.playing ? 'block' : 'none',
					position: 'fixed',
					top: '0px',
					left: '0px',
					zIndex: 200,
					width: window.innerWidth + 'px',
					height: window.innerHeight + 'px'
				}}
			>
			</div>
		) : null;

		return (
			<div className={appStyles}
				style={{
					minHeight: window.innerHeight
				}}
			>

				<StickyContainer 
					stickyStartY={0}
					stickyPosY={0}
					childStyles={navbarStyles.sticky}
				>
					<Navbar/>
				</StickyContainer>

				{this.props.children}

				<Inventory />

				<Examinable 
					style={{
						width: window.innerWidth + 'px',
						height: (window.innerHeight - 150) + 'px'
					}}
				/>

				{clickBlocker}

			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState,
		scrollState: store.scrollState,
		mode: store.modeState,
		sceneState: store.sceneState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getWindowSize: windowEventActions.getWindowSize,
		getScrollPosition: scrollEventActions.getScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
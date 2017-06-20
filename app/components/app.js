import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles } from '../styles';

import { ResponsiveContainer, StickyContainer, Navbar } from './Containers';

import { Inventory, Tooltip } from './Containers/GameContainers';

import { modeActions, modeTypes } from '../state/game/mode';
import { windowEventActions, windowEventTypes } from '../state/events/window';
import { scrollEventActions, scrollEventTypes } from '../state/events/scroll';

var background = require('../assets/background/background1.svg');

const App = React.createClass({
	componentWillMount() {
		document.body.style.background = 'url(' + background + ') no-repeat top left fixed';
		document.body.style.backgroundSize = '100% 100%';

		this.props.getWindowSize();
		this.scrollLocked = this.props.scrollState.scrollLocked;

		this.clickBlocker = null;
		this.inventory = null;
		this.toolTip = null;

		if(this.props.mode.gameMode) {
			this.clickBlocker = (
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
			);
			this.inventory = <Inventory/>;
			this.toolTip = <Tooltip/>;
		}
		else
		{
			if(browserHistory.getCurrentLocation().pathname === '/') {
				browserHistory.replace('/home');
			}
		}
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
					document.body.style.backgroundSize = 'calc(100% - 17px) 100%';
				}
			}
			else
			{
				document.body.style.overflow = "";
				document.body.style.marginRight = '0px';
				document.body.style.backgroundSize = '100% 100%';
			}
		}

		if(this.props.mode.gameMode) {
			if(!nextProps.mode.gameMode) {
				this.inventory = null;
				this.toolTip = null;
			}
		}
		else
		{
			if(nextProps.mode.gameMode) {
				this.inventory = <Inventory/>;
				this.toolTip = <Tooltip/>;
			}
		}

		if(this.props.mode.justBeatGame != nextProps.mode.justBeatGame ||
			this.props.mode.justSkippedGame != nextProps.mode.justSkippedGame) {
			if(nextProps.mode.justBeatGame ||
				nextProps.mode.justSkippedGame) {
				this.toolTip = null;
				this.props.unlockScrollPosition();
			}
		}
	},

	render() {
		return (
			<div 
				className={appStyles}
			>

				<Navbar/>

				{this.props.children}

				{browserHistory.getCurrentLocation().pathname != '/' ? this.inventory : ''}

				{this.clickBlocker}

				{this.toolTip}
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
		getScrollPosition: scrollEventActions.getScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
		clearLocalStorage: modeActions.clearLocalStorage,
		logLocalStorage: modeActions.logLocalStorage
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



		
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles } from '../styles';

import { ResponsiveContainer, StickyContainer } from './Containers';

import { Inventory } from './Containers/GameContainers';

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
		return (
			<div className={appStyles}
				style={{
					minHeight: window.innerHeight
				}}
			>

				<div
					style={{
						backgroundColor: 'black',
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: -99
					}}
				>
				</div>

				{this.props.children}

				<Inventory />

			</div>
		)
	}
});

//				<StickyContainer 
					//stickyStartY={0}
					//stickyPosY={0}
					//childStyles={navbarStyles.sticky}>
					
					//<MainNavbar links={NavLinks} />
					
				//</StickyContainer>

function mapStateToProps(store) {
	return {
		windowState: store.windowState,
		scrollState: store.scrollState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getWindowSize: windowEventActions.getWindowSize,
		getScrollPosition: scrollEventActions.getScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
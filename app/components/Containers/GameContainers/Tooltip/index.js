import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { modeActions, modeTypes} from '../../../../state/game/mode';
import { scrollEventActions, scrollEventTypes} from '../../../../state/events/scroll';

import styles from '../../../../styles/tooltip';

import tips from './tips';

const Tooltip = React.createClass({
	componentWillMount() {
		this.getTip(this.props.mode.progressLevel);
	},

	componentDidMount() {
		this.startDelayedAppearanceTimer(8000);
	},

	componentWillUpdate(nextProps) {
		if(this.props.mode.progressLevel != nextProps.mode.progressLevel) {
			this.lastTip = this.tipIndex;
			this.getTip(nextProps.mode.progressLevel);
			this.startDelayedAppearanceTimer(tips[this.tipIndex].delay);
		}
	},

	getTip(pl) {
		switch(pl) {
			case 0: {
				this.tipIndex = 0;
				break;
			}
			case 1: {
				this.tipIndex = 1;
				break;
			}
			case 2:
			case 3: {
				this.tipIndex = 1;
				break;
			}
			case 2.5:
			case 3.5: {
				this.tipIndex = 2;
				break;
			}
			case 4:
			case 5: {
				this.tipIndex = 3;
				break;
			}
			case 6:
			case 6.5:
			case 7:
			case 7.5: {
				this.tipIndex = 4;
				break;
			}
			case 8:
			case 8.5: {
				this.tipIndex = 5;
				break;
			}
			case 9:
			case 9.5: {
				this.tipIndex = 6;
				break;
			}
			case 10: {
				this.tipIndex = 7;
				break;
			}
			case 11: {
				this.tipIndex = 8;
				break;
			}
			case 12: {
				this.tipIndex = 9;
				break;
			}
			default: {
				this.tipIndex = 0;
				break;
			}
		}
	},

	startDelayedAppearanceTimer(delay) {
		if(this.refs.tipQuery) {
			if(this.refs.tipQuery.style.opacity == 1 &&
				this.tipIndex != this.lastTip) {
				this.refs.tipQuery.style.opacity = 0;
				this.refs.tipQuery.style.pointerEvents = 'none';
			}

			setTimeout(() => {
				this.refs.tipQuery.style.opacity = 1;
				this.refs.tipQuery.style.pointerEvents = 'auto';
			}, delay);
		}
	},

	showToolTip() {
		this.refs.toolTip.style.opacity = 1;
		this.refs.toolTip.style.pointerEvents = 'auto';
		this.refs.tipQuery.style.opacity = 0;
		this.refs.tipQuery.style.pointerEvents = 'none';
		this.props.lockScrollPosition();
	},

	hideToolTip() {
		this.refs.toolTip.style.opacity = 0;
		this.refs.toolTip.style.pointerEvents = 'none';
		this.refs.tipQuery.style.opacity = 1;
		this.refs.tipQuery.style.pointerEvents = 'auto';
		this.props.unlockScrollPosition();
	},

	changeMode() {
		this.props.justSkippedGame(true);
		this.props.changeToSiteMode();
		browserHistory.replace('/home');

		setTimeout(() => {
			this.props.justSkippedGame(false);
		}, 200);
	},

	render() {
		if(this.props.mode.gameMode) {
			let body = tips[this.tipIndex].body.map((p, index) => 
				<p
					key={index}
				>
					{p}
				</p>
			);

			return (
				<div>
					<div
						ref="toolTip"
						className={styles.toolTip}
					>
						<div
							className={styles.toolTipContent}
						>
							<img
								alt="Close Tooltip"
								src={require('../../../../assets/images/interactables/Inventory/ExitButton.svg')}
								onClick={this.hideToolTip}
							/>
							<h3>
								{tips[this.tipIndex].head}
							</h3>
							{body}
							<div>
								<button
									onClick={this.changeMode}
								>
									Skip Game
								</button>
							</div>
						</div>
					</div>
					<div
						ref="tipQuery"
						className={styles.tipQuery}
						onClick={this.showToolTip}
					>
						<img
							alt="Tooltip"
							src={require('../../../../assets/images/interactables/Inventory/ExaminableButton.svg')}
						/>
					</div>
				</div>
			);
		}
		else
		{
			return null;
		}
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeToSiteMode: modeActions.changeToSiteMode,
		justSkippedGame: modeActions.justSkippedGame,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tooltip);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { scrollEventActions, scrollEventTypes } from '../../../../../state/events/scroll';
import { portfolioActions, portfolioTypes } from '../../../../../state/portfolio';

import { PortfolioPageStyles } from '../../../../../styles/pages';

import portfolio from '../../../../../assets/portfolio';

const PortfolioModal = React.createClass({
	componentWillMount() {
		if(this.props.portfolio.modalPiece > -1) {
			this.piece = portfolio[this.props.portfolio.modalPiece];
		}
		else
		{
			this.piece = null;
		}
	},

	componentWillReceiveProps(nextProps) {
		if(nextProps.portfolio.modalPiece > -1) {
			this.piece = portfolio[nextProps.portfolio.modalPiece];

			this.props.lockScrollPosition();
		}
		else
		{
			this.piece = null;
			this.props.unlockScrollPosition();
		}
	},

	componentWillUnmount() {
		this.closeModal();
	},

	closeModal() {
		this.props.selectModalPiece(-1);
		this.props.unlockScrollPosition();
	},

	render() {
		if(this.props.portfolio.modalPiece < 0) {
			return null;
		}
		else
		{
			return (
				<div
					className={PortfolioPageStyles.modal}
					style={{
						width: '100%',
						height: '100%',
					}}
					onClick={this.closeModal}
				>
					<img
						src={require('../../../../../assets/portfolio/' + this.piece.image)}
						alt={this.piece.name}
					/>
				</div>
			);
		}
	}
});

function mapStateToProps(store) {
	return {
		portfolio: store.portfolioState,
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
		selectModalPiece: portfolioActions.selectModalPiece
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioModal);
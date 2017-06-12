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

	link(url) {
		window.open(url, "_blank");
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
			var content;	
			if(this.piece.largeImage) {
				content = (
					<img
						src={require('../../../../../assets/portfolio/' + this.piece.largeImage)}
						alt={this.piece.name}
						className={PortfolioPageStyles.modalImage}
					/>
				);
			}
			else if(this.piece.largeImages) {
				content = this.piece.largeImages.map((img, index) => 
					<img
						key={index}
						src={require('../../../../../assets/portfolio/' + img)}
						alt={this.piece.name + ' ' + (index + 1)}
						className={PortfolioPageStyles.modalImage}
					/>
				);
			}
			else if(this.piece.siteUrl) {
				content = (
					<img
						src={require('../../../../../assets/portfolio/' + this.piece.image)}
						alt={this.piece.name}
						className={PortfolioPageStyles.modalImage, PortfolioPageStyles.hover}
						onClick={() => {this.link(this.piece.siteUrl)}}
					/>
				);
			}
			else if(this.piece.name === 'Elvisaurus Rex and the Carrot from Outer Space') {
				content = (
					<iframe 
						className={PortfolioPageStyles.modalVideo}
						src="https://www.youtube.com/embed/-mrkhbhYLBM" 
						frameBorder="0" 
						allowFullScreen
					>
					</iframe>
				);
			}

			return (
				<div
					className={PortfolioPageStyles.modal}
					onClick={this.closeModal}
				>
					<h2>
						{this.piece.name}
					</h2>
					{content}
					<div>
						<p>
							{this.piece.description}
						</p>
					</div>
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
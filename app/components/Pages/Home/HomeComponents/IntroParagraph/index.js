import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const IntroParagraph = React.createClass({
	componentWillMount() {
		this.p = "Farm-to-table twee plaid stumptown chia authentic. " + 
					"Drinking vinegar hell of master cleanse banjo, gentrify " +
					"enamel pin meditation dreamcatcher bespoke shabby chic " +
					"ethical bitters blue bottle typewriter portland. Coloring " +
					"book man braid messenger bag chicharrones, sartorial " +
					"succulents flannel pug XOXO street art cronut."
	},

	componentDidMount() {
		if(this.props.mode.gameMode) {
			var tearJson = require('../../../../../assets/images/interactables/Tear/Tear.json');
			var tearAnimation = {
				animationData: tearJson,
				path: '../../../../../assets/images/interactables/Tear',
				loop: false,
				autoplay: false,
				name: 'logo',
				renderer: 'svg' ,
				container: ReactDOM.findDOMNode(this.refs.tear)
			}

			this.tearAnimation = BodyMovin.loadAnimation(tearAnimation);
			this.tearAnimation.playSegments([1,12], true);
		}
	},

	render() {
		if(this.props.mode.gameMode) {
			return (
				<div
					className={this.props.className}
					style={{
						...this.props.style,
						position: "relative"
					}}
				>
					<div
						ref="tear"
						style={{
							position: "absolute"
						}}
					>
					</div>
					<p>
						{this.p}
					</p>
				</div>
			);
		}
		else
		{
			return (
				<div
					className={this.props.className}
					style={{
						...this.props.style
					}}
				>
					<p>
						{this.p}
					</p>
				</div>
			);
		}
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
}

export default connect(mapStateToProps)(IntroParagraph);
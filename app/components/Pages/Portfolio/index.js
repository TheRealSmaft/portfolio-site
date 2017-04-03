import React from 'react';
import { connect } from 'react-redux';

import { ResponsiveContainer } from '../../Containers';

import { DropZone } from '../../Containers/GameContainers';

const PortfolioPage = React.createClass({
	componentWillMount() {
		this.nugget = null;
		this.nuggetBuddy = 'SOMEWHEREZ...';

		if(this.props.interactables.firedEvents.includes('starEvent')){
			this.nugget = (
				<h1>
					THE NUGGET IS {this.nuggetBuddy}
				</h1>
			)
		}

		this.getNuggetBuddy();
	},

	componentWillUpdate() {
		if(this.props.interactables.firedEvents.includes('starEvent')){
			this.nugget = (
				<h1>
					THE NUGGET IS {this.nuggetBuddy}
				</h1>
			)
		}
	},

	componentDidUpdate() {
		this.getNuggetBuddy();
	},

	getNuggetBuddy() {
		var index = _.findIndex(this.props.interactables.dropZones, function(obj) {
			return obj.name === 'item1';
		})

		if(index > -1 &&
			this.props.interactables.dropZones[index].status === 'closed') {
			this.nuggetBuddy = 'HEEEYA!!!!';
		}
	},

	render() {

		var dropZone1 = {
			name: 'item1',
			width: 100,
			height: 100
		}
		
		return (
			<ResponsiveContainer>
				<DropZone dropZone={dropZone1} />
				{this.nugget}
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		interactables: store.interactableState
	}
};

export default connect(mapStateToProps)(PortfolioPage);
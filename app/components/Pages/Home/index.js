import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, ScrollLoader, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';

import { DropZone } from '../../Containers/GameContainers';
import dropZoneFunctions from '../../Containers/GameContainers/InteractableContainers/DropZone/eventFunctions';

const HomePage = React.createClass({
	componentWillMount() {
		this.dropZone = {
			name: 'star',
			width: 75,
			height: 75
		}
		
		function first(target, animation, reactTarget) {
			target.classList.add(animation.spin);
		}

		function blort(target, animation) {
			target.classList.remove(animation.grow);
			target.classList.add(animation.shrink);
		}

		function blortTwo(target, animation) {
			target.classList.remove(animation.shrink);
			target.classList.add(animation.grow);
		}

		this.events = [
			first
		]

		this.blorts = [
			blort,
			blortTwo
		]
	},

	render() {
		return (
			<ResponsiveContainer>
				<DeferredEventExecutor
					fireCondition={'starEvent'}
					moments={[0]} 
					events={this.events}
					loop={true}
				>
					<DropZone
						eventTrigger={true}
						dropZone={this.dropZone}
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px',
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							backgroundColor: 'blue'
						}}
					>
					</DropZone>
				</DeferredEventExecutor>

				<DeferredEventExecutor
					moments={[3, 5]} 
					events={this.blorts}
					loop={true}
				>
					<h1>
						Turdburgerz Rulz
					</h1>
				</DeferredEventExecutor>
			</ResponsiveContainer>
		)
	}
});

export default HomePage;
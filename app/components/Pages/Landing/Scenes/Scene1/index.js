import React from 'react';
import ReactDOM from 'react-dom';

import { DeferredEventExecutor } from '../../../../Containers';

const LandingScene1 = React.createClass({
	componentWillMount() {
		this.testEvents = [
			function (target, animation) {
				target.classList.add(animation.spin);
			}
		]
	},

	componentDidMount() {

	},

	componentWillUpdate() {
	},

	render() {
		return (
			<div>
				<DeferredEventExecutor
					moments={[5]}
					events={this.testEvents}
				>
					<h2>
						SCEEEEENE 1!
					</h2>
				</DeferredEventExecutor>

			</div>
		)
	}
});

export default LandingScene1;
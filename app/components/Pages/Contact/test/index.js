import React from 'react';

import { SVG, Circle, MotionPath } from '../../../Containers/ShapeContainers';

const Test = React.createClass({
	render() {
		return (
			<SVG>
     			<Circle
     				ref="turd"
     				diameter={5}
     			>
     			</Circle>
			</SVG>
		);
	}
});

export default Test;
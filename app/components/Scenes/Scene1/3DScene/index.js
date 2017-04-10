import React from 'react';

import { ThreeDSpace, ThreeDObjectGroup, Cube } from '../../../Containers/3DContainers';

import { scene1Styles } from '../../../../styles/scenes';

import uglyGif from '../../__resources/images/ugly.gif';

const Scene1_3DScene = React.createClass({
	componentWillMount() {
		this.monitorSide = (
			<img 
				className={scene1Styles.monitorSide}
				src={require('../../__resources/images/monitorSide.svg')}
				style={{
					border: '1px solid darkgray'
				}}
			/>
		);

		this.monitorFaces = [
			(
				<img 
					className={scene1Styles.monitorSvg} 
					src={require('../../__resources/images/monitor.svg')}
					style={{
						backgroundImage: `url(${uglyGif})`,
						border: '1px solid darkgray'
					}}
				/>
			),
		]

		for(var i = 0; i < 5; i++) {
			this.monitorFaces.push(this.monitorSide);
		}

		this.otherBoxSide = (
			<div style={{backgroundColor: 'pink', height: '100%', width: '100%', border: '1px solid black'}}>
			</div>
		);
		this.otherBoxFaces = [];

		for(var i = 0; i < 6; i++) {
			this.otherBoxFaces.push(this.otherBoxSide);
		}

		this.planeSide = (
			<div style={{backgroundColor: 'green', height: '100%', width: '100%', border: '1px solid black'}}>
			</div>
		);
		this.planeFaces = [];

		for(var i = 0; i < 6; i++) {
			this.planeFaces.push(this.planeSide);
		}
	},

	render() {
		return (
			<ThreeDSpace
				style={{
					width: '100%',
					height: window.innerHeight * .9 + 'px',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					alignItems: 'flex-end'
				}}
				perspective={800}
			>
				<ThreeDObjectGroup
					ref="boxGroup"
					style={{
						flexDirection: 'column'
					}}
				>
					<Cube
						ref="monitor"
						dimensions={[20, 12.5, 10]}
						faces={this.monitorFaces}
						responsive={true}
					>
					</Cube>

					<Cube
						ref="pinkBox"
						dimensions={[25, 16, 23]}
						faces={this.otherBoxFaces}
						responsive={true}
					>
					</Cube>
				</ThreeDObjectGroup>
			</ThreeDSpace>
		)
	}
});

export default Scene1_3DScene;
import React from 'react';
import ReactDOM from 'react-dom';

import BodyMovin from '../../../plugins/bodymovin.min';

const Abduction = React.createClass({
	componentDidMount() {
		var ufoArrival = {
			animationData: require('../../../assets/images/interactables/UFO/UFOArrival.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: false,
			name: 'ufoArrival',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoArrival = BodyMovin.loadAnimation(ufoArrival);
		this.ufoArrival.addEventListener('complete', this.ufoHover);
		setTimeout(() => {
			this.ufoArrival.play();
		}, 500);

		var silhouetteChewing = {
			animationData: require('../../../assets/images/interactables/UFO/SilhouetteChewing.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'silhouetteChewing',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.silhouetteChewing = BodyMovin.loadAnimation(silhouetteChewing);
	},

	ufoHover() {
		this.ufoArrival.removeEventListener('complete', this.ufoHover);
		this.ufoArrival.destroy();

		var animationData = {
			animationData: require('../../../assets/images/interactables/UFO/UFOHovering.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoHover = BodyMovin.loadAnimation(animationData);
		this.ufoHover.setSpeed(.25);

		var carrotAnimationData = {
			animationData: require('../../../assets/images/interactables/UFO/Carrot.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.carrot)
		};

		this.carrot = BodyMovin.loadAnimation(carrotAnimationData);

		this.silhouetteAbduction();

		setTimeout(() => {
			this.useTractorBeam();
		}, 3000);
	},

	useTractorBeam() {
		var tractorBeam = {
			animationData: require('../../../assets/images/interactables/UFO/TractorBeam.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: true,
			name: 'tractorBeam',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.tractorBeam)
		};

		this.tractorBeam = BodyMovin.loadAnimation(tractorBeam);		
	},

	silhouetteAbduction() {
		var silhouetteAbduction = {
			animationData: require('../../../assets/images/interactables/UFO/SilhouetteAbduction.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: true,
			name: 'silhouetteAbduction',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.silhouetteChewing.destroy();
		this.silhouetteAbduction = BodyMovin.loadAnimation(silhouetteAbduction);
	},

	render() {
		return (
			<div>
				<div
					style={{
						position: 'relative'
					}}
				>
					<div
						ref="carrot"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px',
							zIndex: 9
						}}
					>
					</div>
					<div
						ref="alienContact"
						style={{
							position: 'relative',
							zIndex: 10
						}}
					>
					</div>
					<div
						ref="silhouette"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px'
						}}
					>
					</div>
					<div
						ref="tractorBeam"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px'
						}}
					>
					</div>
				</div>
			</div>
		);
	}
});

export default Abduction;
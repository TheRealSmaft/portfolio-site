import React from 'react';
import { Link } from 'react-router';

import { ResponsiveContainer } from '../../../Containers';
import { SVG, Circle, Rect, Path, MotionPath } from '../../../Containers/ShapeContainers';

import { navbarStyles } from '../../../../styles';

const Navbar = React.createClass({
	getInitialState() {
		return {
			menuToggled: false
		}
	},

	componentWillMount() {
		this.navLinkNailTopLeft = (
			<div
				style={{
					position: 'absolute',
					top: '-12%',
					left: '2%'
				}}
			>
				<img 
					style={{
						width: '8px'
					}}
					src={require('../../../../assets/images/interactables/Navbar/LinkNail.svg')}
				/>
			</div>
		);

		this.navLinkNailTopRight = (
			<div
				style={{
					position: 'absolute',
					top: '-12%',
					right: '2%'
				}}
			>
				<img 
					style={{
						width: '8px'
					}}
					src={require('../../../../assets/images/interactables/Navbar/LinkNail.svg')}
				/>
			</div>
		);

		this.navLinkNailBottomLeft = (
			<div
				style={{
					position: 'absolute',
					bottom: '10%',
					left: '2%'
				}}
			>
				<img 
					style={{
						width: '8px'
					}}
					src={require('../../../../assets/images/interactables/Navbar/LinkNail.svg')}
				/>
			</div>
		);

		this.navLinkNailBottomRight = (
			<div
				style={{
					position: 'absolute',
					bottom: '10%',
					right: '2%'
				}}
			>
				<img 
					style={{
						width: '8px'
					}}
					src={require('../../../../assets/images/interactables/Navbar/LinkNail.svg')}
				/>
			</div>
		);
	}, 

	toggleMobileMenu() {
		this.setState({
			...this.state, 
			menuToggled: !this.state.menuToggled
		})
	},

	render() {
		return (
			<ResponsiveContainer>
				<div
					className={navbarStyles.navbar}
				>
					<Link to="/home"> 
						<div
							style={{
								height: '100%',
								backgroundColor: "rgb(120,120,164)",
								border: '1px solid rgb(50,50,62)'
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignContent: 'center',
									textAlign: 'center'
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '10%',
										left: '10%'
									}}
								>
									<img 
										style={{
											width: '80%',
											height: '50px'
										}}
										src={require('../../../../assets/images/interactables/Navbar/LinkShine.svg')}
									/>
								</div>
								<h4
									style={{
										width: '100%',
										height: '100%',
										marginTop: '10px'
									}}
								>
									Home
								</h4>
							</div>
						</div>
					</Link>
					<Link to="/portfolio"> 
						<div
							style={{
								height: '100%',
								backgroundColor: "rgb(120,120,164)",
								border: '1px solid rgb(50,50,62)'
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignContent: 'center',
									textAlign: 'center'
								}}
							>
								<h4
									style={{
										width: '100%',
										height: '100%',
										marginTop: '10px'
									}}
								>
									Portfolio
								</h4>
							</div>
						</div>
					</Link>
					<Link to="/contact"> 
						<div
							style={{
								height: '100%',
								backgroundColor: "rgb(120,120,164)",
								border: '1px solid rgb(50,50,62)'
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignContent: 'center',
									textAlign: 'center'
								}}
							>
								<h4
									style={{
										width: '100%',
										height: '100%',
										marginTop: '10px'
									}}
								>
									Contact
								</h4>
							</div>
						</div>
					</Link>
					<Link to="/about"> 
						<div
							style={{
								height: '100%',
								backgroundColor: "rgb(120,120,164)",
								border: '1px solid rgb(50,50,62)'
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignContent: 'center',
									textAlign: 'center'
								}}
							>
								<h4
									style={{
										width: '100%',
										height: '100%',
										marginTop: '10px'
									}}
								>
									About
								</h4>
							</div>
						</div>
					</Link>
				</div>
				<div
					className={navbarStyles.navbarCollapsed}
				>
					<div
						onClick={this.toggleMobileMenu}
					>
						<span>
							M
						</span>
					</div>
					<div
						ref="mobileMenu"
						style={{
							display: this.state.menuToggled ? 'block' : 'none'
						}}
					>
						<Link to="/home"> 
							Home
						</Link>
						<Link to="/portfolio"> 
							Portfolio
						</Link>
						<Link to="/contact"> 
							Contact
						</Link>
						<Link to="/about"> 
							About
						</Link>
					</div>
				</div>
			</ResponsiveContainer>
		);
	}
});

export default Navbar;
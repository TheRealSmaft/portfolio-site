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
					style={{...this.props.style}}
				>
					<Link to="/home"> 
						<h4>
							Home
						</h4>
					</Link>
					<Link to="/portfolio"> 
						<h4>
							Portfolio
						</h4>
					</Link>
					<Link to="/contact"> 
						<h4>
							Contact
						</h4>
					</Link>
					<Link to="/about"> 
						<h4>
							About
						</h4>
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
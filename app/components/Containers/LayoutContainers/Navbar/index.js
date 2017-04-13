import React from 'react';
import { Link } from 'react-router';

import { ResponsiveContainer } from '../../../Containers';

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
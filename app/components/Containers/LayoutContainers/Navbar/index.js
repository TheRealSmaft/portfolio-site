import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { SVG, Circle, Rect, Path, MotionPath } from '../../../Containers/ShapeContainers';

import { navbarStyles } from '../../../../styles';

const Navbar = React.createClass({
	getInitialState() {
		return {
			menuToggled: false
		}
	},

	componentWillUpdate(nextProps) {
		if(this.props.scrollState != nextProps.scrollState &&
			this.state.menuToggled) {
			this.toggleMobileMenu();
		}
	},

	toggleMobileMenu() {
		this.setState({
			...this.state, 
			menuToggled: !this.state.menuToggled
		})
	},

	render() {
		if(!this.props.mode.gameMode) {
			return (
				<div>
					<div
						className={navbarStyles.navbarContainer}
					>
						<div
							className={navbarStyles.navbar}
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
								&#9776;
							</div>
							<div
								ref="mobileMenu"
								style={{
									display: this.state.menuToggled ? 'block' : 'none'
								}}
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
						</div>
					</div>
					<div
						className={navbarStyles.placeholder}
					>
					</div>	
				</div>
			);
		}
		else 
		{
			return null;
		}
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		scrollState: store.scrollState
	}
};

export default connect(mapStateToProps)(Navbar);
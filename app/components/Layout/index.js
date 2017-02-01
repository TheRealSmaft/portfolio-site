import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
	constructor() {
		super();
		this.site = {
			title: 'Portfolio Site',
			author: 'Matthew Smith'
		}
	}

	render() {
		return (
			<div>
				<Header text={this.site.title} />
				<Footer author={this.site.author} />
			</div>
		);
	}
}
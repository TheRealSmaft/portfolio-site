const PasswordRandomizer = {
	getPassword() {
		var beg = [
			'ie8',
			'evil',
			'aol',
			'dial-up'
		];

		var end = [
			'4ever',
			'rulz',
			'187',
			'isL33T'
		];

		return beg[this.getRandomNumber()] + end[this.getRandomNumber()];
	},

	getRandomNumber() {
		return Math.floor(Math.random() * 4);
	}
}

export default PasswordRandomizer;
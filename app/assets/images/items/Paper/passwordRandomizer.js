const PasswordRandomizer = {
	getPassword() {
		var beg = [
			'evil',
			'daWeb',
			'ie',
			'$$$'
		];

		var mid = [
			'Rulz',
			'Sux',
			'4ever',
			'AllDay'
		];

		var end = [
			'LOL',
			'187',
			'OMG',
			'?!'
		];

		return beg[this.getRandomNumber()] + mid[this.getRandomNumber()] + end[this.getRandomNumber()];
	},

	getRandomNumber() {
		return Math.floor(Math.random() * 4);
	}
}

export default PasswordRandomizer;
const PasswordRandomizer = {
	getPassword() {
		var beg = [
			'i',
			'you',
			'emus',
			'no'
		];

		var mid = [
			'cant',
			'rulz',
			'feel',
			'love'
		];

		var end = [
			'4ever',
			'ham',
			'187',
			'alf'
		];

		return beg[this.getRandomNumber()] + mid[this.getRandomNumber()] + end[this.getRandomNumber()];
	},

	getRandomNumber() {
		return Math.floor(Math.random() * 4);
	}
}

export default PasswordRandomizer;
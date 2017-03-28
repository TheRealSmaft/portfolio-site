export default class Item {
	constructor(name:string, zone:string, loc:string = 'collectables') {
		this.name = name;
		this.zone = zone;
		this.location = loc;
		this.image = null;
	}

	setImage(image) {
		this.image = image;
	}

	changeLocation(loc) {
		this.location = loc;
	}
};
export default class Item {
	constructor(name:string) {
		this.name = name;
		this.acquired = false;
		this.hasDimensions = false;
		this.position = null;
		this.display = null;
	}

	setDimensions(dimensions) {
		this.dimensions = dimensions;
		this.hasDimensions = true;
	}

	setPosition(style) {
		this.position = style;
	}

	setDisplay(style) {
		this.display = style;
	}

	acquireItem() {
		this.acquired = true;
	}

	placeItem() {
		this.isPlaced = true;
	}
};
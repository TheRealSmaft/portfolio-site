import { browserHistory } from 'react-router';
import uncrumpleEvents from '../../images/items/Paper/uncrumpleEvents';

var aboutLink = {
	name: 'About Link',
	collectableImage: require('../../images/items/AboutLink/AboutLinkFixed.svg'),
	inventoryImage: require('../../images/items/AboutLink/AboutLinkFixed.svg'),
	status: 'inventory',
	width: '100px',
	examinable: true,
	examineImage: require('../../images/items/AboutLink/AboutLinkFixed.svg'),
	animationReplacesImage: true,
	initialFrame: -1,
	animationToTrigger: {
		animationData: require('../../images/items/AboutLink/AboutLinkFixed.json'),
		path: '../../images/items/AboutLink',
		loop: false,
		autoplay: false,
		name: 'aboutLink',
		renderer: 'svg'
	},
	clickEvent: function() {
		browserHistory.push('/about');
		return true;
	},
	deferredEvents: {
		events: [],
		moments: []
	}
};

var brokenLink = {
	name: 'Broken Link',
	collectableImage: require('../../images/items/AboutLink/BrokenAboutLink.svg'),
	inventoryImage: require('../../images/items/AboutLink/BrokenAboutLink.svg'),
	width: '100px',
	examinable: true,
	examineImage: require('../../images/items/AboutLink/AboutLinkBrokenExamine.svg'),
	deferredEvents: {
		events: [],
		moments: []
	},
	triggerItem: "Glue",
	fireCondition: "GlueUsed",
	eventToFire: "GlueUsed",
	animationToTrigger: {
		animationData: require('../../images/items/AboutLink/AboutLinkFixed.json'),
		path: '../../images/items/AboutLink',
		loop: false,
		autoplay: false,
		name: 'aboutLinkFixed',
		renderer: 'svg'
	},
	animationReplacesImage: true,
	initialFrame: 0,
	changeAfterAnimation: true,
	nextItemState: aboutLink
};

var eraser = {
	name: 'Eraser',
	status: 'collectable',
	collectProgress: 7,
	collectableImage: require('../../images/items/Eraser/Eraser.svg'),
	inventoryImage: require('../../images/items/Eraser/Eraser.svg'),
	width: '100px'
};

var gavel = {
	name: 'Gavel',
	status: 'inventory',
	collectProgress: 11,
	inventoryImage: require('../../images/items/Gavel/GavelInventory.svg'),
	width: '100px'
}

var glue = {
	name: 'Glue',
	status: 'collectable',
	collectProgress: 6.5,
	collectableImage: require('../../images/items/Glue/Glue.svg'),
	inventoryImage: require('../../images/items/Glue/GlueInventory.svg'),
	width: '100px'
};

var knife = {
	name: 'Artist\'s Knife',
	status: 'collectable',
	collectProgress: 5,
	collectableImage: require('../../images/items/Knife/KnifeCollectable.svg'),
	inventoryImage: require('../../images/items/Knife/KnifeInventory.svg'),
	width: '100px'
};

var navbar = {
	name: 'Navbar',
	status: 'collectable',
	collectProgress: 13,
	collectableImage: require('../../images/items/Glue/Glue.svg'),
	inventoryImage: require('../../images/items/Glue/GlueInventory.svg'),
	width: '100px'
};

var paper = {
	name: 'Paper',
	collectableImage: require('../../images/items/Paper/Paper.png'),
	inventoryImage: require('../../images/items/Paper/Paper.png'),
	width: '100px',
	status: 'collectable',
	examinable: true,
	examineImage: require('../../images/items/Paper/PaperExaminable.png'),
	deferredEvents: {
		events: [],
		moments: []
	},
	hasTriggerZone: true,
	triggerItem: "Pencil",
	fireCondition: 'PencilUsed',
	eventToFire: 'PencilUsed',
	animationToTrigger: {
		animationData: require('../../images/items/Pencil/PencilWriting.json'),
		path: '../Pencil',
		loop: false,
		autoplay: false,
		name: 'penclWriting',
		renderer: 'svg'
	}
};

var uncrumpleMoments = [];

for(var i = 1; i < uncrumpleEvents.length; i++) {
	uncrumpleMoments.push(i);
}

var crumpledPaper = {
	name: 'Crumpled Paper',
	collectableImage: require('../../images/items/Paper/CrumpledPaper.png'),
	inventoryImage: require('../../images/items/Paper/CrumpledPaper.png'),
	width: '100px',
	status: 'collectable',
	examinable: true,
	examineImage: require('../../images/items/Paper/CrumpledPaperExaminable.png'),
	eventCount: uncrumpleEvents.length,
	deferredEvents: {
		events: uncrumpleEvents,
		moments: uncrumpleMoments,
		increment: 34,
		loop: false,
		fireCondition: 'uncrumplePaper',
		eventToTrigger: 'updatePaper'
	},
	eventToFire: 'uncrumplePaper',
	changeAfterEvent: true,
	nextItemState: paper
};

var pencil = {
	name: 'Pencil',
	status: 'collectable',
	collectProgress: 2.5,
	collectableImage: require('../../images/items/Pencil/PencilCollectable.svg'),
	inventoryImage: require('../../images/items/Pencil/PencilInventory.svg'),
	width: '100px'
};

export default {
	aboutLink,
	brokenLink,
	eraser,
	gavel,
	glue,
	knife,
	navbar,	
	paper,
	crumpledPaper,
	pencil
};
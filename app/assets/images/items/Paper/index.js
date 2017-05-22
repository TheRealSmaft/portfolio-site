import uncrumpleEvents from './uncrumpleEvents';

var uncrumpleMoments = [];

for(var i = 1; i < uncrumpleEvents.length; i++) {
	uncrumpleMoments.push(i);
}

var paper = {
	name: 'Crumpled Paper',
	collectableImage: require('./CrumpledPaper.png'),
	inventoryImage: require('./CrumpledPaper.png'),
	width: '100px',
	status: 'inventory',
	examinable: true,
	examineImage: require('./CrumpledPaperExaminable.png'),
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
	nextItemState: {
		name: 'Paper',
		collectableImage: require('./Paper.png'),
		inventoryImage: require('./Paper.png'),
		width: '100px',
		status: 'inventory',
		examinable: true,
		examineImage: require('./PaperExaminable.png'),
		deferredEvents: {
			events: [],
			moments: []
		},
		hasTriggerZone: true,
		triggerItem: "Pencil",
		fireCondition: 'PencilUsed',
		eventToFire: 'PencilUsed',
		animationToTrigger: {
			animationData: require('../Pencil/PencilWriting.json'),
			path: '../Pencil',
			loop: false,
			autoplay: false,
			name: 'penclWriting',
			renderer: 'svg'
		}
	}
};

export default paper;
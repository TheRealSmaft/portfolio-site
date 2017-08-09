const portfolio = [
	{
		name: 'AGT Tapes Website',
		description: 'I personally developed every part of this site, front-end to back. It is a business-to-business focused manufacturer site that offers highly customizable adhesive tapes.',
		scrambledText: "I lpoenrlsay dvoelepde ervye aprt of hist itse, nfort-end to ckba. It si a nusbseis-ot-sbieusns cfudoes efcnumrartua iest tath frfoes highyl cetoaiusmzlb ihdaeevs eatsp.",
		moreInfo: [
			'I designed the site in such a way that allows users to alter certain aspects of the products as they wish, with a system that generates part numbers dynamically.',
			'I also shot/edited all the photos, as well as created all of the graphics.',
			'The AGT Tapes website was designed using AngularJS, SASS, PHP, SQL, and Adobe CC.'
		],
		image: 'AGTTapes/AGTTapesThumbnail.png',
		siteUrl: 'http://www.agttapes.com/home',
		vandalized: 'AGTTapes/AGTTapesVandalism.svg'
	},
	{
		name: 'Piano Competition Poster',
		description: 'This poster was designed for the Emilio del Rosario youth piano competition. I created a piece that is whimsical and vibrant but not silly or overly childish.',
		scrambledText: "Stih sopter wsa diegsned rfo the Elomii lde Rsoraio oyuth iapno ttoeinopcmi. I ceeatdr a peice that is wshamiicl and nvirabt btu ont slily ro volyer cihsildh.",
		moreInfo: [
			"The piano is supposed to appear as though its own music is lifting it in the air.",
			"I designed this poster with Photoshop, Illustrator, and InDesign.",
		],
		image: 'PianoPoster/PianoPosterThumbnail.png',
		largeImage: 'PianoPoster/PianoPosterLarge.jpg',
		vandalized: 'PianoPoster/PianoPosterVandalism.svg'
	},
	{
		name: 'Elvisaurus Rex and the Carrot from Outer Space',
		description: "This is a cartoon I created that was inspired by my pet rabbit, Elvisaurus Rex. I used rotoscoping techniques to capture Elvis' movements with a bit of realism.",
		scrambledText: "Tshi si a orntcoa I ctadree ttha was sipniedr yb my tep babrit, Lvsaeuiusr Rxe. I usde soontoprgci scheineqtu to acuprte Liesv' omemenvts itwh a tbi fo iareslm.",
		moreInfo: [
			"I used a Wacom tablet to draw all of the artwork to give it a hand drawn style.",
			"In addition to the art and animation, I also did the voices and sound effects.",
			"Rabbits are more food driven than dogs. Seriously, look it up!",
			"I created this animation using an adorable bunny, After Effects, Photoshop, Illustrator, and Audition (for the audio recording/editing)."
		],
		image: 'ElvisCartoon/ElvisCartoonThumbnail.jpg',
		vandalized: 'ElvisCartoon/ElvisCartoonVandalism.svg'
	},
	{
		name: 'Sacrilicious Hopnipotent',
		description: "This is a label for an invented brewery called Sacrilicious and their even more imaginary beer, Hopnipotent. This one was a lot of fun.",
		scrambledText: "Hsti is a lelba fro na vinenetd wberery cadlel Ocliisaircsu adn hiert vene roem migirnyaa bere, Htenoptinpo. This noe wsa a lto fo unf.",
		moreInfo: [
			"My name over \"Brewmaster\" over the label is written in a font I made of my own handwriting.",
			"I created this beer concept with recreational drinking, Photoshop, Illustrator, and hand drawings.",
		],
		image: 'Hopnipotent/HopnipotentThumbnail.png',
		largeImage: 'Hopnipotent/HopnipotentLabelLarge.png',
		vandalized: 'Hopnipotent/HopnipotentVandalism.svg'
	},
	{
		name: 'Flambé',
		description: "This is a menu for a restaurant concept I invented called Flambé. The concept is an upscale/casual eatery with a pyromaniacal twist.",
		scrambledText: "Htis is a uemn rof a uerstarant cneptoc I ienvntde lclaed Flmabé. Eht occeptn si na uspcael/aacsul eateyr wiht a acniampyarlo swtit.",
		moreInfo: [
			"The burns around the edges of the menu are real. I thought it would look cooler. It does.",
			"I created this menu design with fire, Photoshop, Illustrator, and InDesign."
		],
		image: 'Flambe/FlambeThumbnail.png',
		largeImages: ['Flambe/FlambeFrontLarge.png', 'Flambe/FlambeBackLarge.png'],
		vandalized: 'Flambe/FlambeVandalism.svg'
	},
	{
		name: 'Batavia Main Street Events Poster',
		description: "This poster was my winning entry in a contest sponsored by local nonprofit Batavia MainStreet. I have since donated many more designs to their organization.",
		scrambledText: "Sith ptsore saw ym wninngi etryn ni a ontects pssedoron yb clloa fipnnroot Vtabaia Aetmiestrn. I haev iecns dndaeto mnay oemr dgissne ot ehirt zgitrnanoioa.",
		moreInfo: [
			"I created this poster using Illustrator.",
		],
		image: 'BataviaPoster/BataviaPosterThumbnail.png',
		largeImage: 'BataviaPoster/BataviaPosterLarge.png',
		vandalized: 'BataviaPoster/BataviaPosterVandalism.svg'
	},
	{
		name: 'Skull and Fishbowl Still Life',
		description: "I drew this still life completely by hand using black and white conté crayons on toned paper.",
		scrambledText: "I erwd htsi sltil leif oecmleptyl by ahnd usgni calkb dan tehwi oncté sacryon on tnedo aprpe.",
		moreInfo: [
			"The skull was fake.",
			"I think..."
		],
		image: 'SkullAndBowl/SkullAndBowlThumbnail.jpg',
		largeImage: 'SkullAndBowl/SkullAndBowlLarge.jpg',
		vandalized: 'SkullAndBowl/SkullAndBowlVandalism.svg'
	},
	{
		name: 'Ladies Night Out Event',
		description: "Ladies Night Out was an event in downtown Batavia, IL. I created the logo concept and art myself, but the other designs were a collaborative effort.",
		scrambledText: "Dlaies Ngiht Uot was na eenvt ni odnwnowt Tvabaai, Li. I rceated het gloo eopccnt nad art smyelf, btu hte toher dseisgn were a loalovircatbe eforft.",
		moreInfo: [
			"I tried to make the hand racially ambiguous.",
			"I created the Ladies Night Out logo using Illustrator and the postcard with Illustrator and Photoshop."
		],
		image: 'LadiesNightOut/BLNLogo.jpg',
		largeImage: 'LadiesNightOut/LNOPostcardLarge.png',
		vandalized: 'LadiesNightOut/LNOVandalism.svg'
	},
	{
		name: 'Batavia Farmers\'s Market',
		description: "These logos were created for the Batavia Farmers' Market for their 20th anniversary. The logo concept was a collaboration, but I created the artwork myself.",
		scrambledText: "Etesh lgoos ewre atrecde ofr hte Abvtaai Mraefrs' Amtrke orf ehrit 20ht anvrirnsaye. Teh loog nctopec wsa a ilooobrtcaaln, btu I recated hte rawortk ysmelf.",
		moreInfo: [
			"One logo was just for the 20th anniversary, the other was for the following years moving forward.",
			"I created the logo with Illustrator and added distress using Photoshop."
		],
		image: 'FarmersMarket/BFMLogoThumbnail.png',
		largeImages: ['FarmersMarket/BFMLogoLarge.png', 'FarmersMarket/BFMLogo20.png'],
		vandalized: 'FarmersMarket/BFMVandalism.svg'
	},
	{
		name: 'Twisted Roots Game',
		description: "Twisted Roots is a video game concept I invented in which you play as an old tree trying to unravel the dark mystery of its previous life as a human.",
		scrambledText: "Tetwsid Ortos is a iovde geam cpnocet I einevndt in hhwci yuo alyp as na odl tere ryntig to reanluv eht dkar eysmytr of sit riveuspo elfi as a auhmn.",
		moreInfo: [
			"I also created fictitious game design company (and logo) Pumpkin Turtle Games.",
			"The tree was drawn by hand using charcoal, and the rest was designed in Illustrator, Photoshop, and InDesign.",
		],
		image: 'TwistedRoots/TwistedRootsThumbnail.jpg',
		largeImage: 'TwistedRoots/TwistedRootsLarge.jpg',
		vandalized: 'TwistedRoots/TwistedRootsVandalism.svg'
	},
	{
		name: 'Carla and I Vector Portrait',
		description: "This is a vector portrait of my beautiful wife, Carla and I. It was a challenging task to create this, but I am very proud of the result.",
		scrambledText: "Thsi si a ectvro protaitr fo ym abtueulfi wief, Aclra dna I. It was a lecignglahn stak to creeat hits, ubt I am rvey ruopd of the serutl.",
		moreInfo: [
			"I created this with Illustrator, elbow grease, and gumption."
		],
		image: 'CarlaAndI/CarlaAndIThumbnail.png',
		largeImage: 'CarlaAndI/CarlaAndILarge.png',
		vandalized: 'CarlaAndI/CarlaAndIVandalism.svg'
	},
];

export default portfolio;
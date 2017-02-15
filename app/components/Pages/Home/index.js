import React from 'react';

import { Page, Grid } from '../../Containers';
import { Row, Col } from '../../Components';

export default class Home extends React.Component {
	render() {
		return (
			<Page>
				<h1>SUP HOMEBOY!</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non elementum purus. In lacus sem, aliquet in augue porttitor, molestie ultricies dolor. In est quam, iaculis quis laoreet id, viverra non mi. Vestibulum molestie tempor nisl id porttitor. Fusce ultricies venenatis enim at mattis. Nunc lorem lorem, condimentum et metus vitae, vestibulum pulvinar tellus. Duis quis turpis sem. Quisque et tellus enim. Curabitur in vestibulum ex. Duis eleifend consequat congue. Praesent eget sollicitudin magna. Quisque ac consequat est. Vivamus vehicula sem vitae ultricies tempus. Etiam pellentesque urna sapien, accumsan consectetur mauris vehicula a. Vivamus nec iaculis massa, sed gravida ligula. Proin consequat tristique rhoncus. Sed ultrices, nisi eget tempor pellentesque, ex sem scelerisque odio, nec interdum nibh odio a ligula. Morbi ac sagittis magna. Praesent ornare eget mi eu imperdiet. Sed lobortis arcu neque, nec tempor justo suscipit sit amet. Nunc vulputate purus et mi pellentesque rhoncus. Etiam at metus arcu. Praesent a diam suscipit, interdum tortor ut, facilisis ex. Pellentesque fermentum in elit quis varius. Maecenas efficitur pretium auctor. Sed tempor pellentesque tincidunt. Aenean eget semper lorem. Sed id erat ornare, varius dolor eu, pharetra odio. Morbi massa velit, aliquam in felis non, vehicula euismod quam. Fusce non nisl in eros auctor tincidunt at id arcu. Sed in augue sed felis lobortis molestie. Integer lobortis aliquam rhoncus. Fusce dictum, augue quis aliquam ullamcorper, augue libero aliquam ex, et tempor ex lorem sit amet lectus. Mauris tempor risus mauris, rhoncus tempor sem tristique ac. Aenean dapibus eros dapibus viverra cursus. Proin leo metus, vehicula congue odio eget, eleifend semper augue. Quisque efficitur turpis vitae velit varius, nec fermentum quam rhoncus. Proin fermentum tellus eget pellentesque tempus. Nunc egestas maximus congue. Vivamus pellentesque ligula vel placerat efficitur. Vivamus congue arcu lectus, id lacinia magna posuere a. Pellentesque quis dolor justo. Ut vehicula, nibh vitae consectetur dictum, arcu felis semper purus, eu euismod nunc nisl sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eget felis augue. Mauris quis tempus est. Nunc id rhoncus nibh. Nullam condimentum magna non nisi lobortis molestie. Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
				</p>

				<Grid gutter={5} breakPoints={[1200, 900, 600]}>
					<Row blocks={5}>
						<Col blocks={2} breaks={[100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purentum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt.
							</p>
							<img src={require('./images/bunnies.jpg')}/>
							<p>
								Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>						
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
					</Row>
					<Row blocks={4}>
						<Col blocks={2} breaks={[100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[50, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purentum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt.
							</p>
							<img src={require('./images/bunnies.jpg')}/>
							<p>
								Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>						
						</Col>
						<Col breaks={[50, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
					</Row>
				</Grid>
				<p>&nbsp;</p>
			</Page>
		)
	}
};
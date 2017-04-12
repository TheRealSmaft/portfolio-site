import React from 'react';
import ReactDOM from 'react-dom';

var Vertex = function(x, y, z) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.z = parseFloat(z);
};

var Vertex2D = function(x, y)  {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};

var Cube = function(center, side) {
	var d = side / 2;

	this.vertices = [
		new Vertex(center.x - d, center.y - d, center.z + d),
		new Vertex(center.x - d, center.y - d, center.z - d),
		new Vertex(center.x + d, center.y - d, center.z - d),
		new Vertex(center.x + d, center.y - d, center.z + d),
		new Vertex(center.x + d, center.y + d, center.z + d),
		new Vertex(center.x + d, center.y + d, center.z - d),
		new Vertex(center.x - d, center.y + d, center.z - d),
		new Vertex(center.x - d, center.y + d, center.z + d)
	];

	this.faces = [
		[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
		[this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
		[this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
		[this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
		[this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
		[this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
 	];
};

const TestObject = React.createClass({
	componentWillMount() {

	},

	componentDidMount() {
		var canvas = this.refs.canvas;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		this.dx = canvas.width / 2;
		this.dy = canvas.height / 2;

		this.ctx = canvas.getContext('2d');
		this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
		this.ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

		this.cubeCenter = new Vertex(0, 600, 0);
		this.cube = new Cube(this.cubeCenter, this.dy);
		this.objects = [this.cube];

		this.cubeObject = this.createCube(this.objects, this.ctx, this.dx, this.dy);

		this.mousedown = false;
		this.mx = 0;
		this.my = 0;

		canvas.addEventListener('mousedown', this.initMove);
		document.addEventListener('mousemove', this.move);
		document.addEventListener('mouseup', this.stopMove);
	},

	project(M) {
		var d = 500;
		var r = d / M.y;

		return new Vertex2D(r * M.x, r * M.z);
	},

	createCube(objects, ctx, dx, dy) {
		this.ctx.clearRect(0, 0, 2 * this.dx, 2 * this.dy);

		for(var i = 0; i < this.objects.length; i++) {
			for(var j = 0; j < this.objects[i].faces.length; j++) {
				var face = this.objects[i].faces[j];

				var P = this.project(face[0]);
				this.ctx.beginPath();
				this.ctx.moveTo(P.x + this.dx, -P.y + this.dy);

				for(var k = 0; k < face.length; k++) {
					P = this.project(face[k]);
					this.ctx.lineTo(P.x + this.dx, -P.y + this.dy);
				}

				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.fill();
			}
		}
	},

	initMove(event) {
		this.mousedown = true;
		this.mx = event.clientX;
		this.my = event.clientY;
	},

	move(event) {
		if(this.mousedown) {
			var theta = (event.clientX - this.mx) * Math.PI / 360;
			var phi = (event.clientY - this.my) * Math.PI / 180;

			for(var i = 0; i < 8; i++) {
				this.rotate(this.cube.vertices[i], this.cubeCenter, theta, phi);
			}

			this.mx = event.clientX;
			this.my = event.clientY;

			this.cubeObject = this.createCube(this.objects, this.ctx, this.dx, this.dy);
		}
	},

	stopMove() {
		this.mousedown = false;
	},

	rotate(M, center, theta, phi) {
		var ct = Math.cos(theta);
		var st = Math.sin(theta);
		var cp = Math.cos(phi);
		var sp = Math.sin(phi);

		var x = M.x - center.x;
		var y = M.y - center.y;
		var z = M.z - center.z;

		M.x = ct * x - st * cp * y + st * sp * z + center.x;
		M.y = st * x + ct * cp * y - ct * sp * z + center.y;
		M.z = sp * y + cp * z + center.z;
	},

	render() {
		return (
			<canvas 
				ref="canvas"
				style={{
					position: 'absolute',
					top: (window.innerHeight * .125) + 'px',
					left: (window.innerHeight * .125) + 'px',
					width: window.innerHeight * .75 + 'px',
					height: window.innerHeight * .75 + 'px'
				}}
			>
			</canvas>
		);
	}
});

export default TestObject;
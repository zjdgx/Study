import React from 'react';
import FileInput from '../fileInputComponent/fileInput'

require('./canvasupload.styl');

export default class zjdgxCanvasUpload extends React.Component {
	static defaultProps = {
		canvasWidth: 100,
		canvasHeight: 100
	};

	constructor (props) {
		super(props);
		this.state = {
			scale: 1,
			shape: 'circle',
			isMoving: false,
			isMouseDown: false,
			position: {x: 0, y: 0},
			movePosition: {x: 0, y: 0}
		}
	};

	componentDidMount () {
		this.canvas = this.refs['upload-canvas'];
		this.context = this.canvas.getContext('2d');
	};

	onFileSelected (file) {
		let image = document.createElement('img');

		image.onload = this.loadImage.bind(this, image);

		if (file.files && file.files[0]) {
			image.src = window.URL.createObjectURL(file.files[0]);
		} else {
			// TODO: canvas draText.....
			// canvas.drawText('浏览器不支持...');
		}

		this.image = image;
	};

	loadImage (image) {
		let w = 0,
				h = 0,
				scale = 1,
				position = {},
				iw = image.width,
				ih = image.height,
				cw = this.canvas.width,
				ch = this.canvas.height;

		position.x = iw > cw ? (iw - cw) / 2 : 0;
		position.y = ih > ch ? (ih - ch) / 2 : 0;
		this.setState({position: position});
		this.context.drawImage(image, position.x, position.y, cw, ch, 0, 0, cw, ch);
	};

	windowToCanvas(x, y) {
	   const canvasRectangle = this.canvas.getBoundingClientRect();

	   return {
	        x: x - canvasRectangle.left,
	        y: y - canvasRectangle.top
	      };
	 };

	mouseDown (e) {
		this.setState({
			isMouseDown: true,
			movePosition: this.windowToCanvas(e.clientX, e.clientY)
		});
	};

	mouseMove (e) {
		this.state.isMouseDown && this.setState({isMoving: true});
	};

	mouseUp (e) {
		let cw = this.canvas.width,
				ch = this.canvas.height,
				position = this.windowToCanvas(e.clientX, e.clientY),
				x = this.state.position.x + this.state.movePosition.x - position.x,
				y = this.state.position.y + this.state.movePosition.y - position.y;

		this.context.clearRect(0, 0, cw, ch);
		this.context.drawImage(this.image, x, y, cw * this.state.scale, ch * this.state.scale, 0, 0, cw, ch);

		this.setState({
			isMoving: false,
			isMouseDown: false,
			position: {
				x: x,
				y: y
			}
		});
	};

	toggleScale (isAdd) {
		let cw = this.canvas.width,
				ch = this.canvas.height,
				scale = this.state.scale * (1 + (isAdd ? 0.1 : -0.1));

		this.setState({
			scale: scale
		});
		this.context.clearRect(0, 0, cw, ch);
		this.context.drawImage(this.image, this.state.position.x, this.state.position.y, cw * scale, ch * scale, 0, 0, cw, ch);
	}

	render () {
		return (
			<div className='zjdgx-canvas-upload' onSelect={return false}>
				<h2>头像预览上传</h2>
				<canvas ref='upload-canvas'
				 	width={this.props.canvasWidth}
					height={this.props.canvasHeight}
					onMouseDown={this.mouseDown.bind(this)}
					onMouseMove={this.mouseMove.bind(this)}
					onMouseUp={this.mouseUp.bind(this)}>您的浏览器不支持...</canvas>
				<span className='icon add' onClick={this.toggleScale.bind(this, 1)}>+</span>
				<span className='icon substact' onClick={this.toggleScale.bind(this, 0)}>-</span>
				<FileInput ref='imageFile' onFileSelected={this.onFileSelected.bind(this)} />
			</div>
		);
	}
}

import React from 'react';

require('./canvasupload.styl');

export default class zjdgxCanvasUpload extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			size: 100,
			shape: 'circle',
			position: [0, 0]
		}
	};
	
	componentDidMount () {
		this.canvas = this.refs['upload-canvas'];
		this.context = this.canvas.getContext('2d');
	};
	
	onFileSelected () {
		let file = this.refs['imageFile'],
				image = document.createElement('img');
		
		image.onload = this.loadImage.bind(this, image);
		
		if (file.files && file.files[0]) {
			image.src = window.URL.createObjectURL(file.files[0]);
		} else {
			// TODO: canvas draText.....
			// canvas.drawText('浏览器不支持...');
		}
	};
	
	loadImage (image) {
		let w = 0,
				h = 0,
				scale = 1,
				iw = image.width,
				ih = image.height,
				cw = this.canvas.width,
				ch = this.canvas.height;
		
		if (iw > cw) {
			w = cw;
			h = ch * ih / iw;
		} else if (ih > ch) {
			w = ch * iw / ih;
			h = ch;
		} else if (iw / ih >= cw / ch) {
			w = cw;
			h = cw * ih / iw;
		} else if(iw / ih < cw / ch) {
			w = ch * iw / ih;
			h = ch;
		}
		
		scale = w / iw;
		this.context.clearRect(0, 0, cw, ch);
		this.context.drawImage(image, 0, 0, w, h); 
		this.drawSelectArea(image, scale);
	};
	
	drawSelectArea (image, scale) {
		let context = this.context,
				canvas = this.canvas;
		
		context.save();
		context.beginPath();//开始新的路径
		context.lineWidth = 1;
		context.strokeStyle = '#333';
		
		if (this.state.shape == 'circle') {
		//context.drawImage(image,rubberbandRectangle.left/scale,rubberbandRectangle.top/scale,rubberbandRectangle.width/scale,rubberbandRectangle.height/scale,,,,);
			//context.arc(100, 100, 50, 0, Math.PI * 2, true);
			context.drawImage(image, 50/scale, 50/scale, 100, 100);
		} else {
			this.rect(50, 50, 100, 100);
		}

		context.fillStyle='rgba(255, 255, 255, .8)';
		this.rect(0, 0, canvas.width, canvas.height, true);
		context.fill();//填充路径
		context.stroke();//填充路径
		context.restore();
	};
	
	rect (x, y, w, h, direction) {
		const context = this.context;
		
		if (direction) {//逆时针
			context.moveTo(x, y);
			context.lineTo(x, y + h);
			context.lineTo(x + w, y + h);
			context.lineTo(x + w, y);
	   } else {//顺时针
			context.moveTo(x, y);
			context.lineTo(x + w, y);
			context.lineTo(x + w, y + h);
			context.lineTo(x, y + h);
	   }
	   
	   context.closePath();
	};
	
	render () {
		return (
			<div className='zjdgx-canvas-upload'>
				<h2>头像预览上传</h2>
				<canvas ref='upload-canvas' width='200' height='200'></canvas>
				<input ref='imageFile' type='file' onChange={this.onFileSelected.bind(this)} />
			</div>
		);
	}
}
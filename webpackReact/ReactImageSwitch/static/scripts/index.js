import React from 'react';
import {render} from 'react-dom';
import ImageFocusSwitch from './components/ImageFocusSwitch';

render(
	<ImageFocusSwitch imgs={[
		'./static/image/1.jpg',
		'./static/image/2.jpg',
		'./static/image/3.jpg',
		'./static/image/4.jpg',
		'./static/image/5.jpg',
		'./static/image/6.jpg'
		]}/>,
	document.getElementById('root')
);
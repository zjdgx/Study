import React from 'react';
import {render} from 'react-dom';
//import ComponentsList from './ComponentsList';
import CanvasUpload from '../../canvasUpload/CanvasUpload';

require('./index.styl');

render(
	<CanvasUpload />,
	document.getElementById('canvas-avatar')
);
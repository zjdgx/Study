import React from 'react';
import {render} from 'react-dom';
import ComponentsList from './ComponentsList';

require('./index.styl');

render(
	<ComponentsList />,
	document.getElementById('components-demo')
);
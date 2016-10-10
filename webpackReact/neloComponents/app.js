/**
 * Build Date: 2016/07/13 10:27.
 * Copyright (c): ZJDGX
 * Autor: ZJDGX
 * Description: nelo components demo
 */
 
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx-dom';

import Button from './Button';
import Input from './Input';
import InputDropdown from './InputDropdown';
import OutsideClick from './OutsideClick';
import Popover from './Popover';
import Tooltip from './Tooltip';

function getTarget () {
	return document.getElementById('popup');
}

ReactDOM.render(
	<Popover getTarget={getTarget}>
		<span>ZJDGX Popover</span>
	</Popover>,
	document.getElementById('content')
);

ReactDOM.render(
	<Tooltip text='zjdgx tooltip'/>,
	document.getElementById('content')
);
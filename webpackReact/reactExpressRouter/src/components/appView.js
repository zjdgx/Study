/**
 * Author: ZJDGX
 * Date: 2016/06/01
 */

import React from 'react';
import {Link} from 'react-router';

export default class AppView extends React.Component {
	render () {
		return (
			<div className='route-content'>
				<ul>
					 <li><Link to="/reactRouterDemo">Home</Link></li>
					 <li><Link to="/reactRouterDemo/about">About</Link></li>
					 <li><Link to="/reactRouterDemo/users">Concat</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	};
}

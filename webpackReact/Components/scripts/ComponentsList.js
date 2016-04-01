import React from 'react';
import ReactDOM from 'react-dom';

import Loading from '../loading/Loading';

export default class ComponentsList extends React.Component {
	render () {
		return (
			<div className='component-container'>
				<nav className='component-nav'>
					<a href='#loading'>React Loading</a>
				</nav>
				<div className='component-list'>
					<div className='item' id='loading'>
						<h2>(2016/03/31)React Loading</h2>
						<Loading/>
					</div>
					<div className='item' id='loading'>
						<h2>(2016/03/31)React Loading</h2>
						<Loading/>
					</div>
				</div>
			</div>
		);
	};
}
import React from 'react';
import ReactDOM from 'react-dom';

import Loading from '../../loading/Loading';
import NavMenu from '../../navMenu/NavMenu';

/*
<NavMenu category='WEB前端' items={[
							{
								title: '前端综合',
								links: 'xxxx'
							},
							{
								title: '性能优化',
								links: 'xxxx'
							}
						]}/>
*/

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
					<div className='item' id='navMenu'>
						<h2>(2016/04/07)React Nav Menu</h2>
						<NavMenu imageSrc='dist/image/time_relative_default.png'
							transitionName={{
								enter: 'enter',
								leave: 'leave',
								appear: 'appear'
							}}
						/>
					</div>
				</div>
			</div>
		);
	};
}
/**
 * Author: ZJDGX
 * Date: 2016/04/07 16:15
 * Description: react nav menu
 * Reference: http://www.tenfour.cn/
 */
 
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./NavMenu.styl');

export default class NavMenu extends React.Component {
	/* static propTypes = {
	    transitionName: React.PropTypes.string.isRequired,
		imageSrc: React.PropTypes.string.isRequired
	}; */
	render () {
		return (
			<div className='carousel'>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true}> 
					<h1>Fading at Initial Mount</h1> 
				</ReactCSSTransitionGroup> 
			</div>
		);
	};
	/*
	<ReactCSSTransitionGroup transitionName={this.props.transitionName} >
		<img src={this.props.imageSrc} key={this.props.imageSrc} />
	</ReactCSSTransitionGroup>
	/*render () {
		return (
			<div className='nav-menu-container'>
				<a href='#'>{this.props.category}</a>
				<ul className='nav-menu'>
				{
					this.props.items.map((item, index) => {
						return (
							<li key={index}><a href={item.links}>{item.title}</a></li>
						);
					})
				}
				</ul>
			</div>
		);
	}*/
}
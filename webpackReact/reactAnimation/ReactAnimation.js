import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./zjdgxReactAnimation.styl');

export default class ZjdgxReactAnimation extends React.Component {
	constructor () {
		super();
		this.state = {
			hover: 0,
			items: ['hello', 'world', 'click', 'me']
		};
	};
	
	toggleHover (hover) {
		this.setState({
			hover: hover
		});
	};
	
	render () {
		return (
			<div>
				<h2 
					onMouseOut={this.toggleHover.bind(this, 0)}
					onMouseEnter={this.toggleHover.bind(this, 1)}>Drop down menu</h2>
				<ul className={'dropdown-items' + (this.state.hover ? ' open' : '')}>
					{
						this.state.items.map((item) => {
						  return (
							<li key={item} className='item'>
							  {item}
							</li>
						  );
						})
					}
				</ul>
			</div>
		);
	};
}
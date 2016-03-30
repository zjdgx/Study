/**
 * Author: ZJDGX
 * Date: 2016/03/30
 * Description: react图片焦点切换
 * Usage: <ImageFocusSwitch imgs={...} interval={300} />
 */
import React, {Component, PropTypes} from 'react';

require('./ImageFocusSwitch.styl');

export default class ImageFocusSwitch extends Component {
	constructor (props) {
		super(props);
	};
	
	static defaultProps = {
		interval: 3000
	};
	
	static propTypes = {
		imgs: PropTypes.array.isRequired
	};
	
	render() {
		return (
			<ul className='zjdgx-image-switch'>
			{
				this.props.imgs.map((img, index) => {
					return <li key={index}><img width='200' height='80' src={img} /></li>;
				})
			}
			</ul>
		);
	};
}

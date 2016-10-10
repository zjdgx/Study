/**
 * Author: ZJDGX
 * Date: 2016/04/28
 * Description: react fading popup
 * Usage: <Dropdown options={} onSelected={}/>
 */
 
import React from 'react';

require('./fadingPopup.styl');

export default class ZjdgxFadingPopup extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isShow: true
		};
	};
	
	componentDidMount () {
		this.toggleView(this.state.isShow);
	};
	
	toggleView (isShow) {
		this.refs['popup'].className = 'zjdgx-fading-popup' + (isShow ? '' : ' hide');
	};
	
	render () {
		return (
			<div className='zjdgx-fading-popup' ref='popup'>
				<div>zjdgx fading demo</div>
			</div>
		);
	};
}
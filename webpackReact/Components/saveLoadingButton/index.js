/**!
 * Build Date: 2016/08/26 17:21
 * @Author ZJDGX
 * @Description save loading button
 * @reference http://h5bp.github.io/Effeckt.css/#0
 */

'use strict';

import React from 'react';
import Loading from '../loading/Loading';

require('./index.styl');

export default class SaveLoadingButton extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			showLoading: false
		};
	};
	
	toggleLoading () {
		this.setState({
			showLoading: !this.state.showLoading
		});
	};
	
	render () {
		return (
			<div className='zjdgx-save-loading'>
				<span className='zjdgx-save-loading_button' onClick={this.toggleLoading.bind(this)}>Save</span>
				<Loading showLoading={this.state.showLoading} />
			</div>
		);
	};
}
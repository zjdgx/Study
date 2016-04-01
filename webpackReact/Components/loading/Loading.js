/**
 * Author: ZJDGX
 * Date: 2016/03/30
 * Description: react loading effect
 * Usage: <Loading />
 */
import React from 'react';

require('./Loading.styl');

export default class Loading extends React.Component {
	render () {
		return (
			<div className="zjdgx-loading circle-spinner">
				<div className="spinner-container container1">
					<div className="circle circle1"></div>
					<div className="circle circle2"></div>
					<div className="circle circle3"></div>
					<div className="circle circle4"></div>
				</div>
				<div className="spinner-container container2">
					<div className="circle circle1"></div>
					<div className="circle circle2"></div>
					<div className="circle circle3"></div>
					<div className="circle circle4"></div>
				</div>
				<div className="spinner-container container3">
					<div className="circle circle1"></div>
					<div className="circle circle2"></div>
					<div className="circle circle3"></div>
					<div className="circle circle4"></div>
				</div>
			</div>
		);
	};
}
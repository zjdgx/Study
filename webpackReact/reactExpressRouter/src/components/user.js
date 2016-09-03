/**
 * Author: ZJDGX
 * Date: 2016/06/01
 */

import React from 'react';

export default class User extends React.Component {
   componentDidMount () {
      console.log('mount');
   }

   componentWillUnmount () {
      console.log('un mount');
   }
	render () {
		return (
			<div className='user'>User Page</div>
		);
	};
}

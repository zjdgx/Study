import React from "react";
import ReactDOM from "react-dom";
import ReactCssTransitionGroup from "react-addons-css-transition-group"

import "./zjdgxReactAnimation.styl"

var style={
  position:"absolute",
  right:"100px",
  top:"20px"
}

export default class App extends React.Component{
	constructor(){
		super();
		this.state= {
			isFocus: 0,
			entered: 0
		};
	};
  
	toggleWidth (e) {
		this.setState({
			isFocus: e.type === 'mouseover' ? 1 : 0,
			entered: 1
		})
	};
	
	toggleChange () {
	};
  
	render(){
		return(
			<div className='zjdgx-slide-width'>
				<input className={this.state.isFocus ? 'focus' : this.state.entered ? 'leave' : ''} type='text'
					onMouseOver={this.toggleWidth.bind(this)}
					onMouseLeave={this.toggleWidth.bind(this)}
					onChange={this.toggleChange.bind(this)}/>
			</div>
		)
  }
}
/**
 * Author: ZJDGX
 * Date: 2016/04/18
 * Description: react drop down
 * Usage: <Dropdown options={} onSelected={}/>
 */
 
import React from 'react';
//import listensToClickOutside from 'react-onclickoutside/decorator';

require('./dropdown.styl');

//@listensToClickOutside()
export default class Dropdown extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isOpen: false,
			curOption: props.defaultOption || 0
		};
	};
	
	handleClickOutside () {
		this.setState({isOpen: false});
	};
	
	onSelected (index) {
		this.setState({curOption: index});
		this.props.onSelected && this.props.onSelected(this.props.options[index].key);
	};
	
	toggleOpen () {
		this.setState({isOpen: !this.state.isOpen});
	}
	
	render () {
		return (
			<div className='zjdgx-dropdown'>
				<label 
					className='dropdown-label'
					onClick={this.toggleOpen.bind(this)}>
						{this.props.options[this.state.curOption].value}
				</label>
				<ul className={'dropdown-option-list' + (this.state.isOpen ? '' : ' hide')}>
				{
					this.props.options.map((option, index) => {
						return <li key={index} onClick={this.onSelected.bind(this, index)}>{option.value}</li>;
					})
				}
				</ul>
			</div>
		);
	};
}
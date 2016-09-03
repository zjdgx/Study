'use strict';

import classnames from 'classnames';
import React, { PropTypes } from 'react';

import OutsideClick from '../OutsideClick';

import './dropdown.styl';

class Dropdown extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
		selectedOption: PropTypes.node.isRequired,
		title: PropTypes.string,
	};

	state = {
		active: false
	};

	componentWillReceiveProps() {
		this.setState({
			active: false
		});
	}

	handleClick(option) {
		const { onChange, selectedOption } = this.props;

		if (selectedOption !== option.label) {
			onChange(option);
		}
	}

	toggle = () => {
		this.setState({
			active: !this.state.active
		});
	};

	getOptions() {
		var { options, selectedOption } = this.props;

		if (!options.length) {
			return <li key="no-options">No options</li>;
		}

		return options.map((option) => {
			const className = classnames('nelo-dropdown__option', {
				'nelo-dropdown__option_active': option.label == selectedOption
			});

			return <li key={option.value}
			           className={className}
			           onClick={this.handleClick.bind(this, option)}
			           title={option.title}
			>{option.label}</li>;
		});
	}

	render() {
		const { className, selectedOption, title } = this.props,
				{ active } = this.state;

		return <OutsideClick active={active}
												 className={classnames(className, {
													'nelo-dropdown': true,
													'nelo-dropdown_active': active
												 })}
												 onOutsideClick={this.toggle}
		>
			<label className="nelo-label"
						 onClick={this.toggle}
						 title={title}
			>{selectedOption} <i className='fa fa-caret-down'></i></label>
			<ul className="nelo-dropdown__options">{this.getOptions()}</ul>
		</OutsideClick>;
	}
}

export default Dropdown;

'use strict';

import React, { PropTypes } from 'react';

import '../Input';
import './input-dropdown.styl';
import Dropdown from '../Dropdown'

class InputDropdown extends React.Component {
	static propTypes = {
		onOptionChange: PropTypes.func.isRequired,
		onValueChange: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
		selectedOption: PropTypes.string.isRequired,
		type: PropTypes.string,
		value: PropTypes.number.isRequired
	};

	render() {
		const { onOptionChange, onValueChange, options, selectedOption, type, value } = this.props;

		var inputType = type || 'text';

		return <div className="input-dropdown">
				<input type={inputType} className="nelo-input" value={value} onChange={onValueChange} />
				<Dropdown onChange={onOptionChange}
				          options={options}
				          selectedOption={selectedOption}
				/>
			</div>;
	}
}

export default InputDropdown;

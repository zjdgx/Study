'use strict';

import classnames from 'classnames';
import React from 'react';

import './tooltip.styl';

class Tooltip extends React.Component {
	state = {
		enter: false
	};

	componentDidMount() {
		setImmediate(() => {
			this.setState({
				enter: true
			});
		});
	}

	render() {
		const { className, text } = this.props,
				{ enter } = this.state;

		return <div className={classnames(className, {
			'nelo-tooltip': true,
			'nelo-tooltip_enter': enter,
		})}>{text}</div>;
	}
}

export default Tooltip;

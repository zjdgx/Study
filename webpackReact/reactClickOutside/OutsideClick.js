'use strict';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx-dom';

class OutsideClick extends React.Component {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		className: PropTypes.string,
		onOutsideClick: PropTypes.func.isRequired,
	};

	componentDidMount() {
		var click = Rx.DOM.click(document.getElementsByTagName('body'));

		function isChild(queue, target) {
			var node, found = false;

			while (!found && queue.length) {
				node = queue.shift();

				if (node === target) {
					found = true;
				} else if (node.childNodes.length) {
					Array.prototype.push.apply(queue, node.childNodes);
				}
			}

			return found;
		}

		const domElement = ReactDOM.findDOMNode(this);

		this.clickEvent = click.subscribe((e) => {
			const { active, onOutsideClick } = this.props;

			// When the component is open...
			active
				// and there is a click outside of the dropdown component...
			&& !isChild([domElement], e.target)
				// close it.
			&& onOutsideClick();
		});
	}

	componentWillUnmount() {
		this.clickEvent.dispose();
	}

	render() {
		const { className } = this.props;

		return <div className={className}>{this.props.children}</div>;
	}
}

export default OutsideClick;

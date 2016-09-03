'use strict';

// NPM module dependencies.
import classnames from 'classnames';
import React, { PropTypes } from 'react';

// React children component dependencies.
import './popover.styl';

const ARROW_HEIGHT = 4;

class Popover extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    getTarget: PropTypes.func.isRequired,
    show: PropTypes.bool,
    tooltip: PropTypes.bool,
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  updatePosition() {
    // Recalculate the position.
    const { show, getTarget } = this.props;

    const targetElement = getTarget();

    if (!show || !targetElement) {
      // No need to update the position, if the popover is not visible.
      return;
    }

    var { arrow, popover} = this.refs;

    const arrowWidth = arrow.offsetWidth;
    const popoverSize = popover.getBoundingClientRect();
    const popoverWidth = popoverSize.width;

    const targetElementSize = targetElement.getBoundingClientRect();

    popover.style.top = `${targetElementSize.bottom + ARROW_HEIGHT}px`;
    popover.style.left = `${targetElementSize.left - (popoverWidth - targetElementSize.width) / 2}px`;
    arrow.style.left = `${popoverWidth / 2 - arrowWidth}px`;
  }

	render() {
		const { className, show, tooltip } = this.props;

		return <div className={classnames(className, {
                  'nelo-popover': true,
                  'nelo-popover_show': show,
                  'nelo-popover_tooltip nelo-popover_dark': tooltip,
                })}
                ref="popover"
    >
      <div className="nelo-popover__arrow" ref="arrow">
        <div className="nelo-popover__arrow-border"></div>
        <div className="nelo-popover__arrow-bg"></div>
      </div>
      {this.props.children}
    </div>;
	}
}

Popover.defaultProps = {
  show: true,
  tooltip: false,
};

export default Popover;

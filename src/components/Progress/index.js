import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Progress extends Component {
  static propTypes = {
    percent: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number
  };

  static defaultProps = {
    percent: 0,
    strokeColor: '#9b9b9b',
    strokeWidth: 2
  };

  constructor() {
    super();
    this.progressContainer = React.createRef();
  }

  adjust = e => {
    const { onClick } = this.props;
    const progress =
      (e.clientX - this.progressContainer.current.getBoundingClientRect().left) /
      this.progressContainer.current.clientWidth;
    onClick(progress);
  };

  render() {
    const { percent, strokeColor, strokeWidth } = this.props;
    return (
      <div
        ref={this.progressContainer}
        className="progress"
        style={{ height: `${strokeWidth}px` }}
        onClick={this.adjust}
      >
        <div className="progress-inner" style={{ width: `${percent * 100}%`, backgroundColor: strokeColor }} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import './App.css';

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

var StateStreamMixin = require('rx-react').StateStreamMixin;
var React = require('react');
var Rx = require('rx');


var Timer = React.createClass({
  mixins: [StateStreamMixin],
  getStateStream: function () {
    return Rx.Observable.interval(1000).map(function (interval) {
      return {
        secondsElapsed: interval
      };
    });
  },
  render: function () {
    var secondsElapsed = this.state ? this.state.secondsElapsed : 0;
    return (
      <div>Seconds Elapsed: {secondsElapsed}</div>
    );
  }
});

export default Timer;

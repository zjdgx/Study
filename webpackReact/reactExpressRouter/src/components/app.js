/**
 * Author: ZJDGX
 * Date: 2016/06/01
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import User from './user';
import App from './appView';
import About from './about';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/reactRouterDemo" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={User}/ >
    </Route>
  </Router>
, document.getElementById('zjdgx-react-router'));

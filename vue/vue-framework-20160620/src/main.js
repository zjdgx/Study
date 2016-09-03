'use strict';
import Vue from 'vue';
import Router from 'vue-router';

import App from './App';
import routerMap from './router';// 引入路由表

Vue.use(Router);// 声明使用vue-router

const router = new Router();// 创建路由

routerMap(router);// 引入路由表

router.start(App, '#root');

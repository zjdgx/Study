/**
 * Build Date: 2016/06/29 10:49.
 * Copyright (c): ZJDGX
 * Autor: ZJDGX
 * Description: vue single page entry point.
 */
 
const Vue = require('vue'),
		VueRouter = require('vue-router'),
		VueSource = require('vue-resource');
		
Vue.use(VueRouter);
Vue.use(VueSource);

const app = Vue.extend({});
const router = new VueRouter({
	// 当hashbang的值为true时, 所有的路径都会被格式化以#!开头
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	transitionOnLoad: true
});

router.map({
	'/': {
		name: 'home',
		component: (resolve) => {
			require(['./vue/home.vue'], resolve)
		}
	},
	'/blog': {
		name: 'blog',
		component: (resolve) => {
			require(['./vue/blog.vue'], resolve)
		}
	}
});


router.afterEach((transition) => {
	console.log('成功浏览到: ' + transition.to.path);
});

router.start(app, '#app');
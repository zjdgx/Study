<template>
	<div id='home'>
		<ul>
			<li v-for="todo in todos">
				{{ todo.text }}
			</li>
		</ul>
	</div>
</template>
<script>
	new Vue({
		el: '#home',
		data: {
			todos: [
				{ text: 'Learn JavaScript' },
				{ text: 'Learn Vue.js' },
				{ text: 'Build Something Awesome' }
			]
		}
	})
</script>
<style>
	#home
		background #bdc6c5
</style>
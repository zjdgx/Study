<template>
	<input type='text' placeholder='type email.' />
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	input {
		width: 60px;
	}
	input:focus {
		width: 100px;
		transition: width 500ms ease-in;
	}
</style>
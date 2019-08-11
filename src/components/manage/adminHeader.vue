<template>
	<div class="top">
		<div class="top_content">
			<span class="font16">东软智能制造云平台</span><span class="font12">v1.0</span>
			<span class="font16 font16right">超级管理员&emsp;admin</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'adminHeader',
		
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.top{
		width: 100%;
		height: 45px;
		background: #222;
		color: #fff;
	}
	.top_content{
		padding-left: 15px;
		padding-right: 15px;

	}
	.font16{
		font-size: 16px;
		line-height: 44px;
		display: inline-block;
		vertical-align: middle;
	}
	.font12{
		margin-left: 10px;
		font-size: 12px;
	}
	.font16right{
		font-size: 14px;
		margin-left:65%;
	}
</style>

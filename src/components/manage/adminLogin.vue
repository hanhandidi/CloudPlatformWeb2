<template>
	<div class="top">
		<h1>管理员登陆</h1>
		<h4 v-if="news.stories">{{news.stories[1].title}}</h4>
	</div>
	
</template>

<script>
	export default {
		name: 'adminHeader',
		data() {
			return {
				news: {}
			}
		},
		created: function() {
			let path = `${this.MYGLOBAL.url}/v1?url=http://news-at.zhihu.com/api/4/news/latest`;
			//console.log(this.MYGLOBAL.url+"   "+this.MYGLOBAL.token);
			this.http.get(path)
				.then(response => {
					this.news = response.data;
				})
				.catch(function(error) { // 请求失败处理
					console.log(error);
				});
		}
	}
</script>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	.top{
		width: 100%;
		height: auto;
	}
</style>

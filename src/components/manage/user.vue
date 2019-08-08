<template>
	<div>
		<h1>用户管理</h1>
		<input type="text" v-model="user.username" placeholder="请输入用户名" />
		<input type="text" v-model="user.pwd" placeholder="请输入密码" />
		<el-date-picker v-model="user.addTime" type="datetime" placeholder="选择日期时间">
		</el-date-picker>
		<button v-on:click="add">添加</button>
		<button v-on:click="update">修改</button>
		<input type="text" v-model="id" placeholder="请输入密ID" />
		<button v-on:click="del">删除</button>
		<button v-on:click="query">查询</button>
		<!-- <button v-on:click="test">单个参1</button> -->
		<button v-on:click="test2">单个参2</button>
		<button v-on:click="queryAll">查询全部</button>
		<h1>{{backinfo}}</h1>

		<el-upload class="avatar-uploader" action="http://localhost:8081/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="`http://localhost:8081/${imageUrl}`" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					username: '',
					pwd: '',
					addTime:''
				},
				myname: '周全',
				backinfo: '',
				id: 0,
				imageUrl: ''
			}
		},
		methods: {
			test2() {

				this.http.post('/test', {
					myname: this.myname
				}).then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			/* test() {

				this.http({
						method: "post",
						url: "/test",
						data: {
							myname: this.myname
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					})
					.then((response) => {
						this.backinfo = response.data;
						console.log(this.backinfo);
					})
					.catch((error) => {
						console.log(error);
					});
			}, */
			add() {
				this.http.post('/employ', this.user).then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			update() {
				this.http.put('/employ', this.user).then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			del() {
				this.http.delete('/employ/' + this.id).then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			query() {
				this.http.get('/employ/' + this.id).then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			queryAll() {
				this.http.get('/employ').then(response => {
					this.backinfo = response.data;
					console.log(this.backinfo);
				}).catch(function(error) {
					console.log(error);
				});
			},
			handleAvatarSuccess(res, file) {
				//this.imageUrl = URL.createObjectURL(file.raw);
				this.imageUrl = res;
				console.log(res);
				console.log("file:" + file);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}

		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px !important;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

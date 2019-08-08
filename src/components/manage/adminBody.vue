<template>
	<div>
		<el-row class="tac">
			<el-col class="tac_left">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<template slot="title">用户管理</template>
							<el-menu-item index="1-1" @click="userList">用户列表</el-menu-item>
							<el-menu-item index="1-2" @click="addlist">添加用户</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col class="tac_right">
				<router-view></router-view>
			</el-col>

		</el-row>

	</div>
</template>

<script>
	export default {
		name: "adminBody",
		methods: {
			userList() {
				this.$router.push("/admin/user");
			},
			addlist() {
				this.$router.push("/admin/adduser");
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped="scoped">
	.tac_left{
		width: 20%;
	}
	.tac_right{
		width: 77%;
	}
</style>

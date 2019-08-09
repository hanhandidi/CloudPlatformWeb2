<template>
	<div>
		<el-row class="tac">
			<el-col class="tac_left">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>设备管理</span>
						</template>
						<el-menu-item-group>
							<template slot="title">用户管理</template>
							<el-menu-item index="1-1" @click="userList">用户列表</el-menu-item>
							<el-menu-item index="1-2" @click="addlist">添加用户</el-menu-item>
							<el-menu-item index="1-3" @click="addDevice">添加设备</el-menu-item>
							<el-menu-item index="1-4" @click="DeviceManagement">设备管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="订单管理">
							<el-menu-item index="1-5" @click="orderManagement">订单管理</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-6">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>

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
            addDevice(){
                this.$router.push("/admin/addDevice");
			},
            DeviceManagement(){
                this.$router.push("/admin/deviceManege");
			},
            orderManagement(){
                this.$router.push("/admin/orderManege");
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

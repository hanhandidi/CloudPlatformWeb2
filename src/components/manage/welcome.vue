<template>
	<div class="top">
		<p class="font20">欢迎使用南京市第一人民医院后台管理系统&emsp;<span class="font12"> v1.0</span></p>
		<p class="font14">登录次数：18 </p>
		<p class="font14">上次登录IP：222.35.131.79.1 上次登录时间：2014-6-14 11:19:55</p>
		<table class="table">
			<thead>
				<tr>
					<th colspan="2">服务器信息</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="width: 30%;">主机名</td>
					<td>{{hostname}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">端口号</td>
					<td>{{port}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">通信协议</td>
					<td>{{protocol}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">访问路径</td>
					<td>{{pathname}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">浏览器代号</td>
					<td>{{browserCode}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">浏览器名称</td>
					<td>{{browserName}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">是否启用Java</td>
					<td>{{ifJava}}</td>
				</tr>
				<tr>
					<td style="width: 30%;">操作系统</td>
					<td>{{OS}}</td>
				</tr>
				
			</tbody>
		</table>

	</div>
	
</template>
<script>
	export default {
		data() {
			return {
				port: location.port,
				hostname: location.hostname,
				protocol: location.protocol,
				pathname: location.pathname,
				browserCode: navigator.appCodeName,
				browserName: navigator.appName,
				OS: navigator.platform,
				ifJava: navigator.javaEnabled() ? '是' : '否',
		
			}
		},
		

	}
</script>

<style scoped>
	.top {
		width: 100%;
		padding: 20px;
		color: #333;
	}

	.font20 {
		font-size: 20px;
		margin-bottom: 10px;

	}

	.font12 {
		font-size: 14px;
	}

	.font14 {
		font-size: 14px;
		margin-bottom: 10px;
		line-height: 2.0;
	}

	.table {
		width: 100%;
		border-spacing: 0;
		border: 1px solid #ddd;
		border-collapse: separate;
		border-left: 0;
		margin-top: 10px;
		

	}

	.table th {
		text-align: left;
		font-weight: bold;
		line-height: 30px;
		padding: 8px;
		background-color: #f5fafe;
		border-left: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		font-size: 18px;
	}

	.table td {
		text-align: left;
		line-height: 20px;
		padding: 8px;
		border-left: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		font-size: 12px;
		color: #333;
	}
</style>

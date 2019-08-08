<template>
	<div>
		<el-form ref="zhou" :model="form" :rules="myrules"  label-width="80px">
			<el-form-item label="活动名称" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="即时配送">
				<el-switch v-model="form.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源">
				<el-radio-group v-model="form.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动形式" prop="desc">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('zhou')">立即创建</el-button>
				
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var checkPhone = (rule, value, callback) => {
				let reg = /^1[3-9]\d{9}$/;
				let result = false;
				if (reg.test(value)) {
					let phone2 = value.charAt(1);
					let phone3 = value.charAt(2);
					switch (phone2) {
						case '3':
							result = true;
							break;
						case '4':
							if ("56789".indexOf(phone3) != -1) {
								result = true;
							}
							break;
						case '5':
							if (phone3 != '4') {
								result = true;
							}
							break;
						case '6':
							if (phone3 == '6') {
								result = true;
							}
							break;
						case '7':
							if (phone3 != '0' && phone3 != '9') {
								result = true;
							}
							break;
						case '8':
							result = true;
							break;
						case '9':
							if (phone3 == '8' || phone3 == '9') {
								result = true;
							}
							break;
					}
				}
				if (result) {
					callback();
				} else {
					callback(new Error('无效手机号'));
				}

			};
			return {
				form: {
					name: '',
					phone: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				myrules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
		}
	}
</script>

<style>
</style>

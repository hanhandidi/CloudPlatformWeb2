<template>
    <div>
        <div class="position">
            <el-form  :model="productPlan"  label-width="125px">
                <el-form-item label="订单编号">
                    <el-select v-model="productPlan.orderSeq" >
                        <el-option label="O20190845452" value="O20190845452"></el-option>
                        <el-option label="O20190458525" value="O20190458525"></el-option>
                        <el-option label="O20190844852" value="O20190844852"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input style="width: 30%" :disabled="true"  v-model="productPlan.productName">
                    </el-input>
                </el-form-item>
                <el-form-item label="计划数量" >
                    <el-input style="width: 20%" :disabled="true"  v-model="productPlan.planCount">
                    </el-input>
                </el-form-item>
                <el-form-item label="交货日期" >
                    <el-date-picker :disabled="true" v-model="productPlan.deliveryDate"
                                    type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="计划开始日期" >
                    <el-date-picker v-model="productPlan.planStartDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="计划结束日期" >
                    <el-date-picker v-model="productPlan.planEndDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效标识">
                    <el-radio-group v-model="productPlan.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">创建计划</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AddProductPlan",
        data() {
            return {
                productPlan: {
                    orderSeq: '',
                    productName: '',
                    planCount: '',
                    deliveryDate: '',
                    planStartDate: '',
                    planEndDate:'',
                    flag: 0
                }
            };
        },
        methods:{
            onSubmit(){
                console.log(this.productPlan);
            }
        }
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 30px;
    }
</style>
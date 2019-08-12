<template>
    <div>
        <div class="position">
            <el-form  :model="productSchedule"  label-width="125px">
                <el-form-item label="计划编号">
                    <el-select v-model="productSchedule.planSeq" >
                        <el-option label="P2019086989" value="P2019086989"></el-option>
                        <el-option label="P2019085684" value="P2019085684"></el-option>
                        <el-option label="P2019089753" value="P2019089753"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input style="width: 30%" :disabled="true"  v-model="productSchedule.productName">
                    </el-input>
                </el-form-item>
                <el-form-item label="计划数量" >
                    <el-input style="width: 20%" :disabled="true"  v-model="productSchedule.planCount">
                    </el-input>
                </el-form-item>
                <el-form-item label="设备序号">
                    <el-select v-model="productSchedule.equipmentSeq" >
                        <el-option label="P2019086989" value="P2019086989"></el-option>
                        <el-option label="P2019085684" value="P2019085684"></el-option>
                        <el-option label="P2019089753" value="P2019089753"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始日期" >
                    <el-date-picker v-model="productSchedule.startDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" >
                    <el-date-picker v-model="productSchedule.endDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效标识">
                    <el-radio-group v-model="productSchedule.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">创建工单</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AddProSchedule",
        data() {
            return {
                productSchedule: {
                    planSeq:'P2019086989',
                    productName: '滤波电容器',
                    planCount: '25986',
                    equipmentSeq:'DX3602',
                    startDate: '2019-07-30',
                    endDate:'2019-08-20',
                    flag: 0
                }
            };
        },
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 30px;
    }
</style>
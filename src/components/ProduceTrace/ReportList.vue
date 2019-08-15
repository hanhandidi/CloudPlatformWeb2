<!--
TODO:创建报工时，调度号不能随意填写，需要从调度表中选取
TODO:然后根据调度号获取设备编号、设备序号、工厂编号
TODO:能编辑的字段只有加工数量和报工状态
-->
<template>
    <div style="margin: 20px;">
        <el-button type="info" style="margin: 10px;">工单信息</el-button>
        <ul>
            <li>
                <div class="infoDiv"><el-tag >工单编号</el-tag><el-tag type="info">{{scheItem.scheduleSeq}}</el-tag></div>
                <div class="infoDiv"><el-tag >产品名称</el-tag><el-tag type="info">{{scheItem.productName}}</el-tag></div>
            </li>
            <li>
                <div class="infoDiv"><el-tag >计划编号</el-tag><el-tag type="info">{{scheItem.planSeq}}</el-tag></div>
                <div class="infoDiv"><el-tag >开始日期</el-tag><el-tag type="info">{{scheItem.startDate}}</el-tag></div>
            </li>
            <li>
                <div class="infoDiv"><el-tag >计划编号</el-tag><el-tag type="info">{{scheItem.planSeq}}</el-tag></div>
                <div class="infoDiv"><el-tag >结束日期</el-tag><el-tag type="info">{{scheItem.endDate}}</el-tag></div>
            </li>
        </ul>
        <div style="width: 100px; margin: 10px;">
            <el-button type="info">报工列表</el-button>
            <el-button type="info" style="margin: 0px; margin-top: 10px;" @click="handelCreate">新建报工</el-button>
        </div>
        <el-table :data="report" style="width: 100%">
            <el-table-column prop="reportSeq" label="报工序列" ></el-table-column>
            <el-table-column prop="precessNum" label="加工数量"></el-table-column>
            <el-table-column prop="passNum" label="合格数量"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
            <el-table-column label="操作" width="150px" >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle  @click="handelEdit(scope.row)" ></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog  width="30%" title="编辑报工" :visible.sync="editVisible" append-to-body>
            <el-form :model="updateItem"  ref="updateForm" label-width="100px" class="demo-ruleForm" :rules="updateRules">
                <el-form-item label="加工开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="updateItem.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="updateItem.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工数量" prop="numRule">
                    <el-input-number v-model="updateItem.workingCount" controls-position="right"  :min="min" ></el-input-number>
                </el-form-item>
                <el-form-item label="合格数量" >
                    <el-input-number v-model="updateItem.qualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="不合格数量">
                    <el-input-number v-model="updateItem.unqualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <!--还要完成Boolean到string的转换-->
                <el-form-item label="结束报工">
                    <el-switch v-model="updateItem.completeFlag" active-color="#13ce66" ></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="updateItem.bak"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUpdateSubmit('updateForm')"  ref="updateBtn">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog  width="30%" title="创建报工" :visible.sync="createVisible" append-to-body>
            <el-form :model="createItem"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="加工开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createItem.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createItem.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工数量">
                    <el-input-number v-model="createItem.workingCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="合格数量">
                    <el-input-number v-model="createItem.qualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="不合格数量">
                    <el-input-number v-model="createItem.unqualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <!--还要完成Boolean到string的转换-->
                <el-form-item label="结束报工">
                    <el-switch v-model="createItem.completeFlag" active-color="#13ce66" ></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="createItem.bak"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onCreateSubmit"  id="createBtn">创建报工</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            var checkNum = (rule, value, callback) => {
                if (this.updateItem.workingCount < this.updateItem.qualifiedCount + this.updateItem.unqualifiedCount) {
                    return callback(new Error('不能小于合格与未合格数量之和'));
                }
            };
            return {
                updateRules: {
                    numRule: [
                        { validator: checkNum, trigger: 'blur' }
                    ]
                },
                min:0,
                updateItem:{
                    id:'',
                    flag:'',
                    createTime:'',
                    createUserid:'',
                    updateTime:'',
                    updateUserid:'',
                    scheduleId:'',
                    equipmentId:'',
                    equipmentSeq:'',
                    startTime:'',
                    endTime:'',
                    workingCount:0,
                    qualifiedCount:0,
                    unqualifiedCount:0,
                    completeFlag:true,
                    factoryId:'',
                    bak:'',
                },
                createItem: {
                    id:'',
                    flag:'',
                    createTime:'',
                    createUserid:'',
                    updateTime:'',
                    updateUserid:'',
                    scheduleId:'',
                    equipmentId:'',
                    equipmentSeq:'',
                    startTime:'',
                    endTime:'',
                    workingCount:0,
                    qualifiedCount:0,
                    unqualifiedCount:0,
                    completeFlag:true,
                    factoryId:'',
                    bak:'',
                },
                scheItem: {
                    scheduleSeq: 'W2019086989',
                    planSeq: 'P2019086989',
                    scheduleStatus: 20,
                    productName: '滤波电容器',
                    planCount: '25986',
                    equipmentSeq: 'DX3602',
                    startDate: '2019-07-30',
                    endDate: '2019-08-20',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName: '周全',
                    updateTime: '2016-05-02',
                    updateUserName: '连文凯',
                },
                report: [
                    {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }, {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }, {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }],
                createVisible: false,
                editVisible: false,
            };
        },
        methods: {
            handelEdit(item) {
                this.updateItem = item;
                this.editVisible = true;
                this.min = this.updateItem.qualifiedCount + this.updateItem.unqualifiedCount
            },
            handelCreate(){
                this.createVisible = true;
            },
            onUpdateSubmit(updateForm){
                console.log(this.updateItem);
                this.$refs[updateForm].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.editVisible = false;
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onCreateSubmit(){
                console.log(this.createItem.endTime);
                this.createVisible = false;
            }
        }
    }
</script>

<style scoped>
    .infoDiv{
        margin: 10px;
    }
    li{
        list-style-type: none;
        margin: 10px;
        margin-bottom: 20px;
        float: left;
    }
</style>
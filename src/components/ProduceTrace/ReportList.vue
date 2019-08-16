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
                <div class="infoDiv"><el-tag >产品名称</el-tag><el-tag type="info" >{{proName }}</el-tag></div>
            </li>
            <li>
                <div class="infoDiv"><el-tag >设备编号</el-tag><el-tag type="info">{{scheItem.equipmentId}}</el-tag></div>
                <div class="infoDiv"><el-tag >开始日期</el-tag><el-tag type="info">{{scheItem.startDate}}</el-tag></div>
            </li>
            <li>
                <div class="infoDiv"><el-tag >计划编号</el-tag><el-tag type="info">{{scheItem.planId}}</el-tag></div>
                <div class="infoDiv"><el-tag >结束日期</el-tag><el-tag type="info">{{scheItem.endDate}}</el-tag></div>
            </li>
        </ul>
        <div style="width: 100px; margin: 10px;">
            <el-button type="info">报工列表</el-button>
            <el-button type="info" style="margin: 0px; margin-top: 10px;" @click="handelCreate">新建报工</el-button>
        </div>
        <el-table :data="report" style="width: 100%" height="290">
            <el-table-column prop="id" label="报工编号" ></el-table-column>
            <el-table-column prop="workingCount" label="加工数量"></el-table-column>
            <el-table-column prop="qualifiedCount" label="合格数量"></el-table-column>
            <el-table-column prop="startTime" label="开始日期"></el-table-column>
            <el-table-column prop="endTime" label="结束日期"></el-table-column>
            <el-table-column prop="bak" label="备注"></el-table-column>
            <el-table-column label="操作" width="150px" >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle  @click="handelEdit(scope.row)" ></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="handelDelete(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog  width="30%" title="编辑报工" :visible.sync="editVisible" append-to-body>
            <el-form :model="updateItem"  ref="updateForm" label-width="100px" class="demo-ruleForm" :rules="updateRules">
                <el-form-item label="加工开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="updateItem.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="updateItem.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工数量" prop="numRule">
                    <el-input-number v-model="updateItem.workingCount" controls-position="right"   :min="min"></el-input-number>
                </el-form-item>
                <el-form-item label="合格数量" >
                    <el-input-number v-model="updateItem.qualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="不合格数量">
                    <el-input-number v-model="updateItem.unqualifiedCout" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <!--还要完成Boolean到string的转换-->
                <el-form-item label="结束报工">
                    <el-switch v-model="updateItem.completeFlag" active-color="#13ce66" ></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="updateItem.bak"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUpdateSubmit()"  ref="updateBtn">提交</el-button>
                    <el-button @click="resetForm('updateForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog  width="30%" title="创建报工" :visible.sync="createVisible" append-to-body>
            <el-form :model="createItem"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="加工开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createItem.startTime" style="width: 100%;"></el-date-picker>
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
                console.log("update报工检验数字")
                if (this.updateItem.workingCount < this.updateItem.qualifiedCount + this.updateItem.unqualifiedCout) {
                    return callback(new Error('不能小于合格与未合格数量之和'));
                }else{
                    console.log("验证通过")
                    return true;
                }
            };
            return {
                myCompleteFlag:0,
                proName:'',
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
        mounted: function(){
            this.getData();
        },
        methods: {
            handelDelete(item){
                console.log("删除报工: ")
                console.log(item)
                this.$ajax.delete("/dailyWork/delete/"+item.id
                ).then(response=>{
                    this.$message({
                        message: '删除报工',
                        type: 'success'
                    });
                    console.log("删除报工完毕，打印返回数据：");
                    console.log(response.data);
                    this.getData();
                }).catch(function (error) {
                    console.log("请求失败:"+error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getData(){
                console.log("in reportlist")
                this.scheItem = this.$route.params.secheduleItem
                this.proName = this.$route.params.secheduleItem.tProductPlan.tProductOrder.tProduct.productName
                console.log(this.$route.params.secheduleItem)
                //根据工单（调度）id获取报工列表
                this.$ajax.post("/dailyWork/list",{
                        factoryId:1,
                        orderTrackId:1,
                    }
                ).then(response=>{
                    this.report = response.data.data;
                    console.log("查询报工");
                    console.log(response.data.data);
                    console.log(this.report);
                }).catch(function (error) {
                    console.log("请求失败:"+error);
                });
            },
            handelEdit(item) {
                this.updateItem = item;
                this.editVisible = true;
                this.min = this.updateItem.qualifiedCount + this.updateItem.unqualifiedCount
            },
            handelCreate(){
                this.createVisible = true;
            },
            onUpdateSubmit(){
                console.log("进入update")
                console.log(this.updateItem);
                if(this.updateItem.completeFlag==true)
                {
                    this.myCompleteFlag = 0
                }else{
                    this.myCompleteFlag = 1
                }
                console.log(this.myCompleteFlag)
                console.log(this.changeDate(this.updateItem.startTime))
                console.log(this.changeDate(this.updateItem.endTime))
                this.$ajax.put("/dailyWork/update",{
                        startTime:this.changeDate(this.updateItem.startTime),
                        endTime:this.changeDate(this.updateItem.endTime),
                        qualifiedCount:this.updateItem.qualifiedCount,
                        workingCount:this.updateItem.workingCount,
                        completeFlag:this.myCompleteFlag,
                        bak:this.updateItem.bak,
                        orderTrackId:this.updateItem.orderTrackId,
                        id:this.updateItem.id,
                    }
                ).then(response=>{
                    this.updateItem.startTime = (this.changeDate(this.updateItem.startTime))
                    this.updateItem.endTime = (this.changeDate(this.updateItem.endTime))
                    this.$message({
                        message: '修改报工',
                        type: 'success'
                    });
                    this.getData();
                    console.log("修改报工完毕，打印返回数据");
                    console.log(response.data);
                }).catch(function (error) {
                    console.log("请求失败:"+error);
                });
                this.editVisible = false;
            },
            onCreateSubmit(){
                console.log("creating item:")
                if(this.createItem.completeFlag==true)
                {
                    this.myCompleteFlag = 0
                }else{
                    this.myCompleteFlag = 1
                }
                this.createItem.startTime = (this.changeDate(this.createItem.startTime))
                this.createItem.endTime = (this.changeDate(this.createItem.endTime))
                console.log(this.createItem);
                console.log(this.myCompleteFlag);
                //创建
                this.$ajax.post("/dailyWork/add",{
                    startTime:this.changeDate(this.createItem.startTime),
                    endTime:this.changeDate(this.createItem.endTime),
                    qualifiedCount:this.createItem.qualifiedCount,
                    workingCount:this.createItem.workingCount,
                    completeFlag:this.myCompleteFlag,
                    bak:this.createItem.bak,
                    orderTrackId:1,
                    createUserid:1,
                    scheduleId:this.$route.params.secheduleItem.scheduleId,
                    factoryId:1,
                    }
                ).then(response=>{
                    this.$message({
                        message: '创建报工',
                        type: 'success'
                    });
                    this.getData();
                    console.log("创建报工完毕，打印返回数据：");
                    console.log(response.data);
                }).catch(function (error) {
                    console.log("请求失败:"+error);
                });
                this.createVisible = false;
            },
            changeDate(time){
                let date = new Date(time)
                let Str=date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() +' ' +
                    date.getHours() + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds()
                return Str
            },
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
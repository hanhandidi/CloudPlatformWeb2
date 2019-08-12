<template>
    <div>
        <div class="position">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.user" ></el-input>
                </el-form-item>
                <el-form-item label="有效标志">
                    <el-select style="width: 120px" v-model="formInline.region" placeholder="选择标志">
                        <el-option label="有效" value="shanghai"></el-option>
                        <el-option label="失效" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" round @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="更新计划" :visible.sync="dialogFormVisible">
            <el-form :model="productPlanU" >
                <el-form-item label="计划编号"  :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="productPlanU.planSeq" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="计划状态" :label-width="formLabelWidth">
                    <el-select v-model="productPlanU.planStatus">
                        <el-option label="未启动" value="10"></el-option>
                        <el-option label="已启动" value="20"></el-option>
                        <el-option label="已完成" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划开始日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="productPlanU.planStartDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="计划结束日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="productPlanU.planEndDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效标识" :label-width="formLabelWidth">
                    <el-radio-group v-model="productPlanU.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="planUpdate">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="productPlan" style="width: 100%">
            <el-table-column label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.createUserName }}</p>
                        <p>住址: {{ scope.row.productName }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.createUserName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="计划编号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.planSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单编号" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.orderSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="产品名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="产品数量" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.planCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="交货日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.deliveryDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="计划开始日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.planStartDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="计划结束日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.planEndDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="计划状态" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="showType(scope.row.planStatus)"
                            disable-transitions>{{showText(scope.row.planStatus)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="有效标识" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.flag === 0 ? 'success' : 'info'"
                            disable-transitions>{{scope.row.flag === 0 ? '有效' : '无效'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="上次修改时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.updateUserName }}</p>
                        <p>住址: {{ scope.row.productName }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.updateUserName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "PlanManagement",
        data() {
            return {
                productPlanU:{
                    planSeq:"",
                    planStatus:10,
                    planStartDate: "",
                    planEndDate:"",
                    flag: 0,
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                productPlan: [{
                    planSeq:'P2019086989',
                    orderSeq: 'O20190845452',
                    productName: '滤波电容器',
                    planCount: '25986',
                    deliveryDate: '2019-08-25',
                    planStartDate: '2019-07-30',
                    planEndDate:'2019-08-20',
                    flag: 0,
                    planStatus:10,
                    createTime: '2016-05-02',
                    createUserName:'黄启铭',
                    updateTime: '2016-05-02',
                    updateUserName:'张卫东',
                },{
                    planSeq:'P2019086989',
                    orderSeq: 'O20190845452',
                    productName: '电解电容器',
                    planCount: '25986',
                    deliveryDate: '2019-08-25',
                    planStartDate: '2019-07-30',
                    planEndDate:'2019-08-20',
                    flag: 0,
                    planStatus:10,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                },{
                    planSeq:'P2019086989',
                    orderSeq: 'O20190845452',
                    productName: '有机介质电容器',
                    planCount: '25986',
                    deliveryDate: '2019-08-25',
                    planStartDate: '2019-07-30',
                    planEndDate:'2019-08-20',
                    flag: 1,
                    planStatus:20,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                },{
                    planSeq:'P2019086989',
                    orderSeq: 'O20190845452',
                    productName: '空气介质电容器',
                    planCount: '25986',
                    deliveryDate: '2019-08-25',
                    planStartDate: '2019-07-30',
                    planEndDate:'2019-08-20',
                    flag: 0,
                    planStatus:30,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                },
                ],
                formInline: {
                    user: '',
                    region: ''
                }
            };
        },
        methods: {
            showType(type){
                if(type===10){
                    return 'info';
                }else if(type===20){
                    return '';
                }else {
                    return 'success';
                }
            },
            showText(text){
                if(text===10){
                    return '未启动';
                }else if(text===20){
                    return '已启动';
                }else {
                    return '已完成';
                }
            },
            handleEdit(index, row) {
                this.productPlanU.planSeq=row.planSeq;
                this.productPlanU.planStatus=row.planStatus.toString();
                this.productPlanU.planStartDate=row.planStartDate;
                this.productPlanU.planEndDate=row.planEndDate;
                this.productPlanU.flag=row.flag;
                this.dialogFormVisible = true;
            },
            planUpdate(){
                console.log(this.productPlanU);
                this.dialogFormVisible = false;
            },
            onSubmit() {
                console.log('submit!');
            },
        }
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 18%;
        margin-bottom: 20px;

    }
</style>
<template>
    <div>
        <div class="position">
                <el-collapse v-model="activeNames">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="zhouFont">订单基本信息</span>
                        </template>
                        <table class="zhouTable">
                            <tr>
                                <td>订单编号：{{order.orderSeq}}</td>
                                <td>订单来源：线下订单</td>
                                <td>产品名称：{{order.tProduct.productName}}</td>
                                <td>订单状态：{{showText(order.orderStatus)}}</td>
                            </tr>
                            <tr>
                                <td>产品数量：{{order.productCount}}</td>
                                <td>订单截止日期：{{order.endDate}}</td>
                                <td>创建时间：{{order.createTime}}</td>
                                <td>创建人编号：{{order.createUserid}}</td>
                            </tr>
                        </table>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <span class="zhouFont">接单信息</span>
                        </template>
                        <table class="zhouTable">
                            <tr>
                                <td>接单时间：{{acceptOrder(order.orderStatus)}}</td>
                                <td>操作员编号：{{order.updateUserid}}</td>
                            </tr>
                        </table>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <span class="zhouFont">拒单信息</span>
                        </template>
                        <table style="width: 50%;font-size: 15px">
                            <tr style="height: 85px">
                                <td>拒单时间：{{refuseOrder(order.orderStatus)}}</td>
                                <td>操作员编号：{{order.updateUserid}}</td>
                            </tr>
                            <tr style="height: 150px">
                                <td colspan="2">
                                    <div style="float: left;width: 18%">
                                        拒绝理由：
                                    </div>
                                    <div style="float: left;width: 82%">
                                        <textarea class="zhouText" disabled="disabled" v-model="order.bak"
                                                  readonly="readonly"></textarea>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                        <template slot="title">
                            <span class="zhouFont">生产计划安排</span>
                        </template>
                        <table class="zhouTable">
                            <tr>
                                <td>生产计划编号：{{productPlan.planSeq}}</td>
                                <td>生产产品：{{productPlan.productName}}</td>
                                <td>计划数量：{{productPlan.planCount}}</td>
                            </tr>
                            <tr>
                                <td>计划开始日期：{{productPlan.planStartDate}}</td>
                                <td>计划结束日期：{{productPlan.planEndDate}}</td>
                                <td>计划状态：{{productPlan.planStatus}}</td>
                            </tr>
                        </table>
                    </el-collapse-item>
                    <el-collapse-item name="5">
                        <template slot="title">
                            <span class="zhouFont">工单安排</span>
                        </template>
                        <el-table
                                :data="jobOrder"
                                style="width: 100%">
                            <el-table-column
                                    align="center" prop="scheduleSeq"
                                    label="工单编号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="equipmentSeq" align="center"
                                    label="设备序号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="scheduleCount" align="center"
                                    label="生产数量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="开始日期">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="结束日期">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="scheduleStatus" align="center"
                                    label="工单状态">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item name="6">
                        <template slot="title">
                            <span class="zhouFont">报工情况</span>
                        </template>
                        <el-table
                                :data="dailyWork"
                                style="width: 100%">
                            <el-table-column
                                    prop="scheduleSeq" align="center"
                                    label="工单编号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="equipmentSeq" align="center"
                                    label="设备序号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="scheduleCount" align="center"
                                    label="工单数量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="加工开始时间">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="加工结束时间">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="workingCount" align="center"
                                    label="加工数量">
                            </el-table-column>
                            <el-table-column
                                    prop="qualifiedCount" align="center"
                                    label="合格数量">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
        </div>

    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                activeNames: ['1'],
                order: {},
                productPlan: {
                    planSeq: 'P2019086989',
                    orderSeq: 'O20190845452',
                    productName: '滤波电容器',
                    planCount: '25986',
                    deliveryDate: '2019-08-25',
                    planStartDate: '2019-07-30',
                    planEndDate: '2019-08-20',
                    flag: 0,
                    planStatus: 10,
                    createTime: '2016-05-02',
                    createUserName: '黄启铭',
                    updateTime: '2016-05-02',
                    updateUserName: '张卫东',
                },
                jobOrder: [
                    {
                        scheduleSeq: "W2019086989",
                        equipmentSeq: "DX3602",
                        scheduleCount: 10,
                        startDate: "2016-05-02",
                        endDate: "2016-05-06",
                        scheduleStatus: 10
                    },
                ],
                dailyWork: [
                    {
                        scheduleSeq: "W2019086989",
                        equipmentSeq: "DX3602",
                        scheduleCount: 10,
                        startDate: "2016-05-02",
                        endDate: "2016-05-06",
                        workingCount: 10,
                        qualifiedCount: 8
                    }
                ]
            };
        },
        created() {
            if(this.$route.params.order===undefined){
                this.$router.push({
                    path:"orderManage",
                });
            }else {
                let acceptOrder = this.$route.params.order;
                this.order = acceptOrder;
            }
        },
        methods: {
            showText(text){
                let result="已完成";
                switch (text) {
                    case 10:
                        result = "待接单";
                        break;
                    case 20:
                        result = "已接单";
                        break;
                    case 30:
                        result = "已拒绝";
                        break;
                    case 40:
                        result = "生产中";
                        break;
                    case 50:
                        result = "已完成";
                        break;
                    default :
                        break;
                }
                return result;
            },
            acceptOrder(val){
              if(val===20){
                  return this.order.updateTime;
              }else {
                  return "该状态下无法查看";
              }
            },
            refuseOrder(val){
                if(val===30){
                    return this.order.updateTime;
                }else {
                    return "该状态下无法查看";
                }
            },
        }
    }
</script>

<style scoped>
    .position {
        margin-top: 30px;
        margin-left: 30px;
    }

    .zhouTable tr {
        height: 85px;
        font-size: 15px;
    }

    .zhouTable td {
        width: 20%;
    }

    .zhouFont {
        font-size: 20px;
        color: darkblue;
    }

    .zhouText {
        resize: none;
        height: 145px;
        font-size: large;
        width: 100%;
        border-color: black;
        background-color: #ffffff;
        padding: 5px;
    }
</style>

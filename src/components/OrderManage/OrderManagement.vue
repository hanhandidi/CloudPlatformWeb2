<template>
    <div>
        <div class="position">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.user" ></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-select v-model="formInline.region" placeholder="有效标志">
                        <el-option label="有效" value="shanghai"></el-option>
                        <el-option label="失效" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-circle-plus"
                    @click="dialogFormVisible = true">新建订单</el-button>
                </el-form-item>
            </el-form>
        </div>



        <el-dialog title="新建订单" :visible.sync="dialogFormVisible">
            <el-form :model="order">
                <el-form-item label="订单来源" :label-width="formLabelWidth">
                    <el-input v-model="order.resource" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                    <el-select v-model="order.name" placeholder="请选择要生产的产品">
                        <el-option label="三极管" value="三极管"></el-option>
                        <el-option label="电容器" value="电容器"></el-option>
                        <el-option label="电压表" value="电压表"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生产数量" :label-width="formLabelWidth">
                    <el-input v-model="order.count" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="截至日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="order.endDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="orderCreate">确 定</el-button>
            </div>
        </el-dialog>


        <el-table  border :data="productOrder" style="width: 100%;">
            <el-table-column align="center" label="订单编号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单来源" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.orderSource }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品数量" width="150">
                <template slot-scope="scope">
                    <span >{{ scope.row.productCount }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="已完成数量" width="150">
                <template slot-scope="scope">
                    <span >{{ scope.row.finishedCount }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单截止日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态" width="135">
                <template slot-scope="scope">
                    <el-tag effect="dark"
                            :type="showStatus(scope.row.orderStatus)"
                            disable-transitions>{{showText(scope.row.orderStatus)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="工厂产能" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.factoryYield }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.createUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.createUserName }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上次修改时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.updateUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.updateUserName }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column align="center" label="有效标识" width="135">
                <template slot-scope="scope">
                    <el-tag effect="dark"
                            :type="scope.row.flag === 0 ? 'success' : 'info'"
                            disable-transitions>{{scope.row.flag === 0 ? '有效' : '无效'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="240">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.orderStatus===10">
                        接单
                    </el-button>
                    <el-button size="mini" v-if="scope.row.orderStatus===10">
                        拒单
                    </el-button>
                    <el-button size="mini" v-if="scope.row.orderStatus===20">
                        转为生产计划
                    </el-button>
                    <el-button size="mini" v-if="scope.row.orderStatus===40">
                        完成订单
                    </el-button>
                <!--    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>-->
                    <el-button size="mini" round @click="handleEdit(scope.$index, scope.row)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "OrderManagement",
        data() {
            return {
                productOrder: [{
                    orderSeq: 'O20190803164530',
                    orderSource: '线下订单',
                    productName: '罐装豆豉鱼',
                    productCount: 589,
                    finishedCount:234,
                    endDate:'2016-05-02',
                    orderStatus: 10,
                    factoryYield:'280罐/天',
                    flag: 1,
                    createTime: '2019-08-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }, {
                    orderSeq: 'O20190803164530',
                    orderSource: '线上订单',
                    productName: '瓶装可口可乐',
                    productCount: 5589,
                    finishedCount:234,
                    endDate:'2016-05-02',
                    orderStatus: 20,
                    factoryYield:'536瓶/天',
                    flag: 1,
                    createTime: '2016-05-02',
                    createUserName:'马云',
                    updateTime: '2016-05-02',
                    updateUserName:'习近平',
                }, {
                    orderSeq: 'O20190803164530',
                    orderSource: '线下订单',
                    productName: 'BV_6A型号锂电池',
                    productCount: 9589,
                    finishedCount:234,
                    endDate:'2016-05-02',
                    orderStatus: 30,
                    factoryYield:'459块/天',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName:'雷军',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }, {
                    orderSeq: 'O20190803164530',
                    orderSource: '线下订单',
                    productName: '罐装豆豉鱼',
                    productCount: 589,
                    finishedCount:234,
                    endDate:'2016-05-02',
                    orderStatus: 40,
                    factoryYield:'280罐/天',
                    flag: 1,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                },{
                    orderSeq: 'O20190803164530',
                    orderSource: '线下订单',
                    productName: '罐装豆豉鱼',
                    productCount: 589,
                    finishedCount:234,
                    endDate:'2016-05-02',
                    orderStatus: 50,
                    factoryYield:'280罐/天',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }],
                formInline: {
                    user: '',
                    region: ''
                },
                dialogFormVisible: false,
                order: {
                    resource: '',
                    name: '',
                    count: '',
                    endDate: '',
                },
                formLabelWidth: '120px',
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({
                    name:"orderDetail",
                    params:{
                        order:row
                    }
                });
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            onSubmit() {
                console.log('submit!');
            },
            orderCreate(){
                this.dialogFormVisible = false;
                console.log(this.order);
            },
            showStatus(type){
                let result="success";
                switch (type) {
                    case 10:
                        result = "info";
                        break;
                    case 20:
                        result = "";
                        break;
                    case 30:
                        result = "danger";
                        break;
                    case 40:
                        result = "warning";
                        break;
                    case 50:
                        result = "success";
                        break;
                    default :
                        break;
                }
                return result;
            },
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
            }
        }
    }
</script>

<style scoped>
.position{
    margin-top: 30px;
    text-align: center;
    margin-bottom: 20px;

}
</style>
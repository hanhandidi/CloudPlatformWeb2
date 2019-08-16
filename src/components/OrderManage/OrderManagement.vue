<template>
    <div>
        <div class="position">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="订单状态">
                    <el-select v-model="orderStatus" @change="currentOpt" placeholder="状态查询">
                        <el-option label="全部状态" value="5"></el-option>
                        <el-option label="待接单" value="10"></el-option>
                        <el-option label="已接单" value="20"></el-option>
                        <el-option label="已拒绝" value="30"></el-option>
                        <el-option label="生产中" value="40"></el-option>
                        <el-option label="已完成" value="50"></el-option>
                    </el-select>
                </el-form-item>&emsp;&emsp;&emsp;
                <el-form-item>
                    <el-button type="primary" icon="el-icon-circle-plus"
                    @click="dialogFormVisible = true">新建订单</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog title="新建订单" :visible.sync="dialogFormVisible">
            <el-form :model="order">
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                    <el-select style="width: 40%" v-model="order.productId" placeholder="请选择要生产的产品">
                        <el-option v-for="(item,index) in products"
                                   :label="item.productName" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="生产数量" :label-width="formLabelWidth">
                    <el-input style="width: 40%" v-model="order.productCount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="截止日期" :label-width="formLabelWidth">
                    <el-date-picker style="width: 40%" v-model="order.endDate" type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效标识" :label-width="formLabelWidth">
                    <el-radio-group v-model="order.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="orderCreate">创 建</el-button>
            </div>
        </el-dialog>

        <el-table  border :data="productOrder" style="width: 100%;">
            <el-table-column align="center" label="订单编号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单来源" width="180">
                    <span >线下订单</span>
            </el-table-column>
            <el-table-column align="center" label="产品名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.tProduct.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品数量" width="150">
                <template slot-scope="scope">
                    <span >{{ scope.row.productCount }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="已完成数量" width="150">
                <template slot-scope="scope">
                    <span >{{ scope.row.finishedCount }}</span>
                </template>
            </el-table-column>-->
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
            <el-table-column align="center" label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
         <!--   <el-table-column align="center" label="创建人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.createUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.createUserName }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>-->
            <el-table-column align="center" label="上次修改时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
         <!--   <el-table-column align="center" label="修改人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.updateUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.updateUserName }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>-->
            <el-table-column align="center" label="有效标识" width="135">
                <template slot-scope="scope">
                    <el-tag effect="dark"
                            :type="scope.row.flag === 0 ? 'success' : 'info'"
                            disable-transitions>{{scope.row.flag === 0 ? '有效' : '无效'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="240">
                <template slot-scope="scope">
                    <el-button round type="primary" size="mini" @click="handleAccept(scope.$index,scope.row)"
                               v-if="scope.row.orderStatus===10">接单</el-button>
                    <el-button type="warning" round size="mini" @click="handleRefuse(scope.$index,scope.row)"
                               v-if="scope.row.orderStatus===10">拒单</el-button>
                    <el-button type="info" round  v-if="scope.row.orderStatus===20"
                               size="mini"  @click="handleChange(scope.$index,scope.row)">
                        转为生产计划
                    </el-button>
                    <el-button type="success" round size="mini" v-if="scope.row.orderStatus===40">
                        完成订单
                    </el-button>
                    <el-button type="primary" round plain size="mini"
                    @click="handleDetail(scope.$index, scope.row)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="position">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="4"
                    :total="totalSize">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "OrderManagement",
        data() {
            return {
                productOrder: [],
                dialogFormVisible: false,
                order: {
                    productId:"",
                    productCount:"",
                    endDate:"",
                    flag:0,
                    createUserid:2,
                    factoryId:1
                },
                orderStatus:"5",
                refuseReason:"",
                products:[],
                formLabelWidth: '120px',
                currentPage:1,
                totalSize:0
            }
        },
        created(){
            this.getProductList();
            this.getOrderList(1);
        },
        methods: {
            handleDetail(index, row) {//查看订单详情
                this.$router.push({
                    name:"orderDetail",
                    params:{
                        order:row
                    }
                });
            },
            handleChange(index, row) { // 点击转为生产计划按钮触发
                this.$router.push({
                    name:"addProductPlan",
                    params:{
                        order:row
                    }
                });
            },
            handleRefuse(index,row){ //拒单操作
                this.$prompt('请输入拒绝理由', '拒绝接单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S{5}/,
                    inputErrorMessage: "理由不充分"
                }).then(({ value }) => {
                    this.$ajax.post("/productOrder/refuse/"+row.id,{
                        bak:value
                    }).then(response=>{
                        let code = response.data.code;
                        let message=response.data.message;
                        if(code===200){
                            this.getOrderList(this.currentPage);
                        }else {
                            this.$message.error(message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                });

            },
            handleAccept(index,row){  //接单操作
                this.$ajax.post("/productOrder/accept/"+row.id).then(response=>{
                    let code = response.data.code;
                    let message=response.data.message;
                    if(code===200){
                        this.getOrderList(this.currentPage);
                    }else {
                        this.$message.error(message);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            orderCreate(){ //新建订单
                this.order.endDate= this.changeDate(this.order.endDate);
                this.dialogFormVisible = false;
                this.$ajax.post("/productOrder/add",this.order).then(response=>{
                    let code = response.data.code;
                    let message=response.data.message;
                    if(code===200){
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        this.order.productId="";
                        this.order.productCount="";
                        this.order.endDate="";
                        this.order.flag=0;
                    }else {
                        this.$message.error(message);
                    }
                }).catch(function (error) {
                    this.$message.error('添加失败');
                    console.log("添加失败："+error);
                });
            },
            handleCurrentChange(val) {  //分页查询
                this.currentPage=val;
                this.getOrderList(val);
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
            },
            changeDate(time){
                let year=time.getFullYear();
                let month=time.getMonth()+1;
                let day=time.getDate();
                let hour=time.getHours();
                let min=time.getMinutes();
                let second=time.getSeconds();
                let back=`${year}-${month}-${day} ${hour}:${min}:${second}`;
                return back;
            },
            getProductList(){//获取产品列表
                this.$ajax.post("/product/list",{
                    factoryId:1
                }).then(response=>{
                    this.products = response.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getOrderList(val){ //获取订单列表
                let status=this.orderStatus;
                if(status!=="5"){
                    this.$ajax.post("/productOrder/listPage/"+val,{
                        orderStatus:status,
                        factoryId:1
                    }).then(response=>{
                        this.productOrder = response.data.data.list;
                        this.totalSize=response.data.data.total;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }else {
                    this.$ajax.post("/productOrder/listPage/"+val,{
                        factoryId:1
                    }).then(response=>{
                        this.productOrder = response.data.data.list;
                        this.totalSize=response.data.data.total;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            },
            currentOpt(status){ //根据状态查询
                console.log(status);
                this.getOrderList(1);
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
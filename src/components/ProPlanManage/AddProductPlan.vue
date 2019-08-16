<template>
    <div>
        <div class="position">
            <el-form  :model="productPlan"  label-width="125px">
                <el-form-item label="订单编号">
                    <el-select v-model="productPlan.orderSeq" :disabled="onOff" @change="currentOpt" >
                        <el-option
                                v-for="(item,index) in productOrder"
                                :key="index"
                                :label="item.orderSeq"
                                :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input style="width: 30%" :disabled="true"  v-model="productPlan.tProduct.productName">
                    </el-input>
                </el-form-item>
                <el-form-item label="计划数量" >
                    <el-input style="width: 20%"  v-model="productPlan.productCount">
                    </el-input>
                </el-form-item>
                <el-form-item label="交货日期" >
                    <el-date-picker :disabled="true" v-model="productPlan.endDate"
                                    type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="计划开始日期" >
                    <el-date-picker v-model="newPlan.planStartDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="计划结束日期" >
                    <el-date-picker v-model="newPlan.planEndDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效标识">
                    <el-radio-group v-model="newPlan.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">创建计划</el-button>
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
                productPlan: {},
                newPlan:{
                    flag:0,
                    createUserid:2,
                    orderId:"",
                    productId:"",
                    planCount:"",
                    deliveryDate:"",
                    planStartDate:"",
                    planEndDate:"",
                    factoryId:1,

                },
                onOff:false,
                productOrder:[{}],
            };
        },
        created(){//如果是转计划就执行if否则执行else
          if(this.$route.params.order!== undefined){
              let acceptOrder=this.$route.params.order;
              console.log(acceptOrder);
              this.newPlan.orderId=acceptOrder.id;
              this.newPlan.productId=acceptOrder.productId;
              this.newPlan.deliveryDate=acceptOrder.endDate;
              this.productPlan=acceptOrder;
              this.onOff=true;
          }else {
              this.$ajax.post("/productOrder/getAll",{}).then(response=>{
                  this.productOrder = response.data.data;
                  console.log(this.productOrder);
              }).catch(function (error) {
                  console.log(error);
              });
          }
        },
        methods:{
            onSubmit(){
                console.log(this.productPlan);
                this.newPlan.planCount=this.productPlan.productCount;
                this.newPlan.planStartDate=this.changeDate(this.newPlan.planStartDate);
                this.newPlan.planEndDate=this.changeDate(this.newPlan.planEndDate);
                this.$ajax.post("/productPlan/add",this.newPlan).then(response=>{
                    let code = response.data.code;
                    let message=response.data.message;
                    if(code===200){
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        this.$router.push({
                            path:"orderManage",
                        });
                    }else {
                        this.$message.error(message);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            currentOpt(index){
                let productIndex=this.productOrder[index];
                this.productPlan.productName=productIndex.tProduct.productName;
                this.productPlan.planCount=productIndex.productCount;
                this.productPlan.deliveryDate=productIndex.endDate;
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
        }
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 30px;
    }
</style>
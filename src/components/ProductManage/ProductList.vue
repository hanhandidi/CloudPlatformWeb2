<!--
TODO：1-查询-可以根据产品名称查询
TODO：2-新增-要求同一工厂产品名不能相同
TODO：3-修改-要求同一工厂产品名不能相同
TODO：4-删除
TODO：数据接口名称说明
TODO：-后台接口名称-"tableData"-条件查询或者全部查询返回的数据
TODO：-前台内部数据名称-"id"-产品编号
TODO：-前台内部数据名称-"productName"-产品名称
TODO：-前台内部数据名称-"productNum"-产品数量
TODO：-前台内部数据名称-"flag"-产品状态标志-非必添-转义
TODO：-前台内部数据名称-"factoryName"-产品所属工厂-关联表
TODO：-前台内部数据名称-"productImgUrl"-产品图片保存的路径
TODO：-前台内部数据名称-"createTime"-产品创建时间
TODO：-前台内部数据名称-"createUserName"-产品创建者名称-关联表
TODO：-前台内部数据名称-"updateTime"-产品更新时间-非必添
TODO：-前台内部数据名称-"updateUserName"-产品更新者名称-关联表

-->
<template>
    <div>
        <!--按照商品名称查询商品-->
        <el-form :inline="true" :model="selectProduct" class="demo-form-inline">
            <el-form-item label="商品名">
                <el-input v-model="selectProduct.productName" placeholder="商品名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!--商品列表，显示关键信息，点击展开详细信息-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" style="color: #99a9bf;">
                        <el-form-item label="商品编号" style="width: 50%; ">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="商品名称" style="width: 50%; ">
                            <span>{{ props.row.productName }}</span>
                        </el-form-item>
                        <el-form-item label="商品数量" style="width: 50%; ">
                            <span>{{ props.row.productNum }}</span>
                        </el-form-item>
                        <el-form-item label="商品状态" style="width: 50%; ">
                            <el-tag v-if="props.row.flag!='0'" key="label1" type="success" effect="dark">有效</el-tag>
                            <el-tag v-if="props.row.flag=='0'" key="label2" type="danger" effect="dark">无效</el-tag>
                        </el-form-item>
                        <el-form-item label="所属工厂" style="width: 50%; ">
                            <span>{{ props.row.factoryId }}</span>
                        </el-form-item>
                        <el-form-item label="商品图片" style="width: 50%; ">
                            <!--<i class="el-icon-picture-outline"></i>-->
                            <img :src="`${globalurl}/${props.row.productImgUrl}`" width="60px;"/>
                            <!--<span>{{ props.row.productImgUrl}}</span>-->
                        </el-form-item>
                        <el-form-item label="创建时间" style="width: 50%; ">
                            <!--<i class="el-icon-time"></i>-->
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="创建者" style="width: 50%; ">
                            <!--<i class="el-icon-s-custom"></i>-->
                            <span>{{ props.row.createUserid }}</span>
                        </el-form-item>
                        <el-form-item label="最近修改" style="width: 50%; ">
                            <!--<i class="el-icon-time"></i>-->
                            <span>{{ props.row.updateTime }}</span>
                        </el-form-item>
                        <el-form-item label="修改者" style="width: 50%; ">
                            <!--<i class="el-icon-s-custom"></i>-->
                            <span>{{ props.row.updateUserid }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品编号"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="productName">
            </el-table-column>
            <el-table-column
                    label="商品数量"
                    prop="productNum">
            </el-table-column>
            <el-table-column
                    label="商品状态"
                    prop="flag">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.flag==1" key="label1" type="success" effect="dark">有效</el-tag>
                    <el-tag v-if="scope.row.flag==0" key="label2" type="danger" effect="dark">无效</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px;">
                <template slot-scope="scope">
                    <el-button
                            style="margin: 10px;"
                            size="mini"
                            @click="showDialog(scope.row)" >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>


            <!--<div>-->
            <!--<span th:text="第+${pageInfo.pageNum}+页"></span>-->
            <!--<span th:text="共+${pageInfo.pages}+页"></span>-->
            <!--<span th:text="共+${pageInfo.total}+条记录"></span>-->
            <!--<a href="javascript:void(0)" onclick="first(1)">首页</a>-->
            <!--<a href="javascript:void(0)" onclick="pre()" th:if="${!pageInfo.isFirstPage}">上一页</a>-->
            <!--<span th:if="${pageInfo.isFirstPage}">上一页</span>-->
            <!--<a href="javascript:void(0)" onclick="next()" th:if="${!pageInfo.isLastPage}">下一页</a>-->
            <!--<span th:if="${pageInfo.isLastPage}">下一页</span>-->
            <!--<a href="javascript:void(0)" onclick="end()">末页</a>-->
            <!--</div>-->



        </el-table>
        <div class="block">

            <el-pagination
                    background
                    :page-size=4
                    layout="prev, pager, next"
                    @current-change="res=>changePage(res)"
                    @prev-click="res=>changePage(res)"
                    @next-click="res=>changePage(res)"
                    :total="pageData.total">
            </el-pagination>
        </div>


        <!--修改产品信息的对话框-->
        <el-dialog title="修改产品" :visible.sync="dialogFormVisible" >
            <el-form  label-width="80px" :model="updateProduct">
                <el-form-item label="商品编号" style="width: 50%; " >
                    <!--<span>{{ updateProduct.id }}</span>-->
                    <el-input v-model= "updateProduct.productNum"  disabled id="proID"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" style="width: 50%; " >
                    <el-input v-model= "updateProduct.productName" clearable id="proName"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" style="width: 50%; " >
                    <el-input-number
                            id="proNum"
                            v-model="updateProduct.productNum"
                            controls-position="right"
                            @change="handleChange"
                            size="medium"
                            :min="1" >
                    </el-input-number>
                </el-form-item>
                <el-form-item label="商品状态" style="width: 50%; ">
                    <el-radio-group v-model="updateProduct.flag">
                        <el-radio  :label="1">有效</el-radio>
                        <el-radio  :label="0">无效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所属工厂" style="width: 50%; ">
                    <el-select v-model="updateProduct.factoryId" placeholder="请选择">
                        <el-option
                                v-for="factory in factories"
                                :key="factory.id"
                                :label="factory.factoryName"
                                :value="factory.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="商品图片" style="width: 50%; ">
                    <el-upload
                            class="avatar-uploader"
                            :action="`${this.MYGLOBAL.url}/upload`"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="updateProduct.productImgUrl"
                             :src="`${this.MYGLOBAL.url}/${updateProduct.productImgUrl}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <!--<i class="el-icon-picture-outline"></i>-->
                    <!--<img src="../../assets/logo.png" width="60px;"/>-->
                    <!--<span>{{ updateProduct.productImgUrl}}</span>-->
                </el-form-item>


                <el-form-item label="创建时间" style="width: 50%; ">
                    <!--<i class="el-icon-time"></i>-->
                    <span>{{ updateProduct.createTime }}</span>
                </el-form-item>
                <el-form-item label="创建者" style="width: 50%; ">
                    <!--<i class="el-icon-s-custom"></i>-->
                    <el-input v-model= "updateProduct.createUserid " disabled></el-input>
                </el-form-item>
                <el-form-item label="最近修改" style="width: 50%; ">
                    <!--<i class="el-icon-time"></i>-->
                    <span>{{ updateProduct.updateTime }}</span>
                </el-form-item>
                <el-form-item label="修改者" style="width: 50%; ">
                    <!--<i class="el-icon-s-custom"></i>-->
                    <el-input v-model= " updateProduct.updateUserid" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;1==1">取 消</el-button>
                <el-button type="primary" @click="update()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>

    export default {

        data() {
            return {
                factories:[],
                dialogFormVisible: false,

                updateProduct:{},
                globalurl:'',
                tableData:[],
                pageData: {},
                selectProduct: {
                    productName: '',
                },
                currentPage:'1'
            }
        },
        mounted:function(){
            this.getdatas(1);
            this.globalurl=this.MYGLOBAL.url
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(id) {
                this.$ajax.delete("/product/del/"+id).then(response=>{
                    console.log(response.data);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(function (error) {
                    console.log("添加失败："+error);
                });
            },
            onSubmit() {
                if(this.selectProduct.productName!=""){
                    this.$ajax.post("/product/listPage/1",this.selectProduct).then(response=>{
                        this.pageData= eval(response.data).data;
                        this.tableData=this.pageData.list;
                        console.log(response.data);
                        this.$message({
                            message: '产品列表',
                            type: 'success'
                        });
                    }).catch(function (error) {
                        console.log("添加失败："+error);
                    });
                }
                else(
                    this.getdatas(1)
                )

            },
            showDialog(pro){
                let p =Object.assign({},pro);
                this.updateProduct = p;

                console.log("beforeUpdate:")
                console.log(this.updateProduct)
                this.dialogFormVisible = true;
            },
            handleChange(value) {
                console.log(value);
            },
            handleAvatarSuccess(res) {
                this.updateProduct.productImgUrl = res.data;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            changePage(res)
            {
                this.getdatas(res)
            },
            update(){
                this.updateProduct.updateUserid = this.MYGLOBAL.userId
                console.log("afterUpdate:")
                console.log(this.updateProduct)
                this.$ajax.put("/product/update",this.updateProduct).then(response=>{
                    let message= eval(response.data);
                    // this.tableData=listdata;
                    console.log(message);
                    this.$message({
                        message: '产品列表',
                        type: 'success'
                    });
                    this.getdatas();
                }).catch(function (error) {
                    console.log(error);
                });
                this.getdatas(1)
                this.dialogFormVisible = false;
            },
            getdatas(currentPage){
                let a=currentPage
                if(a==null)
                    a=1
                this.$ajax.post("/product/listPage/"+a,{}).then(response=>{
                    this.pageData= eval(response.data).data;
                    // this.tableData=listdata;
                    console.log(this.pageData)
                    this.tableData=this.pageData.list
                    this.$message({
                        message: '产品列表',
                        type: 'success'
                    });
                }).catch(function (error) {
                    console.log("添加失败："+error);
                });
                this.$ajax.get("/factory/getAll").then(response=>{
                    this.factories = eval(response.data).data;
                    console.log(this.factories)
                }).catch(function (error) {
                    console.log("查询工厂信息失败："+error);
                });
            }

        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

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
        <el-form :inline="true" :model="queryInfo" style="margin: 15px;" class="demo-form-inline">
        <el-form-item label="商品名">
            <el-input v-model="queryInfo.proName" placeholder="商品名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onQuery()">查询</el-button>
        </el-form-item>
        </el-form>
        <!--商品列表，显示关键信息，点击展开详细信息-->
        <el-table
                :data="tableData"
                style="width: 100%" height="500">
            <el-table-column type="expand" >
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
                        <span>{{ props.row.factoryName }}</span>
                    </el-form-item>
                        <el-form-item label="商品图片" style="width: 50%; ">
                            <!--<i class="el-icon-picture-outline"></i>-->
                            <img src="../../assets/logo.png" width="60px;"/>
                            <!--<span>{{ props.row.productImgUrl}}</span>-->
                        </el-form-item>
                        <el-form-item label="创建时间" style="width: 50%; ">
                            <!--<i class="el-icon-time"></i>-->
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="创建者" style="width: 50%; ">
                            <!--<i class="el-icon-s-custom"></i>-->
                            <span>{{ props.row.createUserName }}</span>
                        </el-form-item>
                        <el-form-item label="最近修改" style="width: 50%; ">
                            <!--<i class="el-icon-time"></i>-->
                            <span>{{ props.row.updateTime }}</span>
                        </el-form-item>
                        <el-form-item label="修改者" style="width: 50%; ">
                            <!--<i class="el-icon-s-custom"></i>-->
                            <span>{{ props.row.updateUserName }}</span>
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
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--修改产品信息的对话框-->
        <el-dialog title="修改产品" :visible.sync="dialogFormVisible" >
            <el-form  label-width="80px" :rules="rules" ref="proItem" :model="proItem">
                <el-form-item label="商品编号" style="width: 50%; " >
                    <!--<span>{{ proItem.id }}</span>-->
                    <el-input v-model= "proItem.id"  disabled id="proID"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" style="width: 50%; " prop="productName">
                    <el-input v-model= "proItem.productName" clearable id="proName"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" style="width: 50%; " >
                    <el-input-number
                            id="proNum"
                            v-model="proItem.productNum"
                            controls-position="right"
                            @change="handleChange"
                            size="medium"
                            :min="1" >
                    </el-input-number>
                </el-form-item>
                <el-form-item label="商品状态" style="width: 50%; ">
                    <el-radio-group v-model="proItem.flag">
                        <el-radio :label="1">有效</el-radio>
                        <el-radio :label="0">无效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所属工厂" style="width: 50%; ">
                    <el-dropdown>
                        <span class="el-dropdown-link" >
                            {{proItem.factoryName}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item icon="el-icon-plus" v-for="(name,itemIndex) in factories" v-bind:key="itemIndex">
                                <span @click="changeFactoryName(name)" >{{name}}</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </el-form-item>
                <el-form-item label="商品图片" style="width: 50%; ">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!--<i class="el-icon-picture-outline"></i>-->
                    <!--<img src="../../assets/logo.png" width="60px;"/>-->
                    <!--<span>{{ proItem.productImgUrl}}</span>-->
                </el-form-item>
                <el-form-item label="创建时间" style="width: 50%; ">
                    <!--<i class="el-icon-time"></i>-->
                    <span>{{ proItem.createTime }}</span>
                </el-form-item>
                <el-form-item label="创建者" style="width: 50%; ">
                    <i class="el-icon-s-custom"></i>
                    <el-input v-model= "proItem.createUserName " disabled></el-input>
                </el-form-item>
                <el-form-item label="最近修改" style="width: 50%; ">
                    <!--<i class="el-icon-time"></i>-->
                    <span>{{ proItem.updateTime }}</span>
                </el-form-item>
                <el-form-item label="修改者" style="width: 50%; ">
                    <!--<i class="el-icon-s-custom"></i>-->
                    <el-input v-model= "proItem.updateUserName " disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;1==1">取 消</el-button>
                <el-button type="primary" @click="onUpdate('proItem')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                rules: {
                    productName: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1,  message: '至少一个字符', trigger: 'blur' }
                    ]
                },
                imageUrl: '../../assets/logo.png',
                factories:['动画梦工场','成都体育场','天安门广场'],
                dialogFormVisible: false,
                proItem:{},//传到更新页面的信息，更新时提交给后台的信息
                tableData: [
                    {
                        id: 0,
                        productName: '美国边境墙',
                        productNum: 340,
                        flag:1,
                        factoryName:'动画梦工场',
                        productImgUrl:'产品图片保存的路径',
                        createTime:'产品创建时间',
                        createUserName:'产品创建者名称-关联表',
                        updateTime:'产品更新时间-非必添',
                        updateUserName:'产品更新者名称-关联表'
                    },
                    {
                        id: 1,
                        productName: '特朗普宝宝',
                        productNum: 100,
                        flag:1,
                        factoryName:'动画梦工场',
                        productImgUrl:'产品图片保存的路径',
                        createTime:'产品创建时间',
                        createUserName:'产品创建者名称-关联表',
                        updateTime:'产品更新时间-非必添',
                        updateUserName:'产品更新者名称-关联表'
                    },
                    {
                        id: 2,
                        productName: '超级棒棒糖',
                        productNum: 20,
                        flag: 0,
                        factoryName:'产品所属工厂-关联表',
                        productImgUrl:'产品图片保存的路径',
                        createTime:'产品创建时间',
                        createUserName:'产品创建者名称-关联表',
                        updateTime:'产品更新时间-非必添',
                        updateUserName:'产品更新者名称-关联表'
                    }],
                queryInfo: {
                    proName: '',
                }
            }
        },
        mounted: function(){
            this.getData();
        },
        methods: {
            getData(){
                console.log("Getting data")
                this.$ajax.post("/product/list",{
                }).then(response=>{
                    // this.equipments = response.data.data;
                    console.log(response.data.data);
                    console.log(this.MYGLOBAL.url+"this.MYGLOBAL.url---");
                }).catch(function (error) {
                    console.log("请设备列表求失败:"+error);
                });
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            onQuery() {
                if(""===this.queryInfo.proName)
                {
                    console.log('query!Empty'+this.queryInfo.proName);
                }
                else
                {
                    console.log('query!'+this.queryInfo.proName);
                }
            },
            showDialog(pro){
                console.log(pro);
                this.proItem = pro;
                console.log(this.proItem.id)
                this.dialogFormVisible = true;
                console.log(this.dialogFormVisible);
                this.radio1 = this.proItem.flag.toString();
                console.log(this.radio1);
            },
            handleChange(value) {
                console.log(value);
            },
            changeFactoryName(name){

                console.log("in proName"+this.proItem.factoryName.toString() )
                this.proItem.factoryName = name;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
            onUpdate(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        console.log(this.proItem)
                        this.dialogFormVisible = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
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

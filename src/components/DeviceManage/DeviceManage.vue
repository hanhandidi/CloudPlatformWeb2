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

        <el-table stripe border :data="equipments" style="width: 100%">
            <el-table-column align="center" label="设备序号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.equipmentSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="设备名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.equipmentName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="设备图片" width="180">
                <template slot-scope="scope">
                    <img :src="contact(scope.row.equipmentImgUrl)" alt="暂无图片" class="image">
                </template>
            </el-table-column>
            <el-table-column align="center" label="可生产产品" width="180">
                <template slot-scope="scope">
                    <span v-for="(item,index) in scope.row.tEquipmentProducts" :key='index'>
                        {{ item.tProduct.productName }}&nbsp; </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="设备状态" width="135">
                <template slot-scope="scope">
                    <el-tag
                            :type="showType(scope.row.equipmentStatus)"
                            disable-transitions>{{showText(scope.row.equipmentStatus)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | DateFormat }}</span>
                </template>
            </el-table-column>
           <!-- <el-table-column align="center" label="创建人" width="130">
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
                    <span style="margin-left: 10px">{{ scope.row.updateTime | DateFormat }}</span>
                </template>
            </el-table-column>
           <!-- <el-table-column align="center" label="修改人" width="130">
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
                    <el-tag
                            :type="scope.row.flag === 0 ? 'success' : 'info'"
                            disable-transitions>{{scope.row.flag === 0 ? '有效' : '无效'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="180">
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
        name: "DeviceManage",
        data() {
            return {
                equipments: [{}],
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        created(){
            console.log("一次")
            this.$ajax.post("/equipment/getAll",{
                factoryId:1
            }).then(response=>{
                this.equipments = response.data.data;
                console.log(this.MYGLOBAL.url+"this.MYGLOBAL.url---"+this.equipments);
            }).catch(function (error) {
                console.log("请设备列表求失败:"+error);
            });
        },
        methods: {
            handleEdit(index, row) {  //编辑设备
                console.log(index, row);
                this.$router.push({
                    name:"updateDevice",
                    params:{
                        device:row
                    }
                });
            },
            contact(pic){  //拼接图片路径
                let url=this.MYGLOBAL.url+"/"+pic;
                return url;
            },
            handleDelete(index, row) {
                this.$ajax.delete("/equipment/delete/"+row.id).then(response=>{
                    console.log(response.data);
                    let code = response.data.code;
                    let message=response.data.message;
                    if(code===200){
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        this.equipments.splice(index,1);
                    }else {
                        this.$message.error(message);
                    }
                }).catch(function (error) {
                    console.log("请设备列表求失败:"+error);
                });

            },
            onSubmit() {
                console.log('submit!');
            },
            showType(type){  //设置设备不同状态不同的风格
                if(type===10){
                    return 'success';
                }else if(type===20){
                    return 'info';
                }else {
                    return 'danger';
                }
            },
            showText(text){  //将设备不同状态由数字转为文字
                if(text===10){
                    return '启用';
                }else if(text===20){
                    return '停用';
                }else {
                    return '故障';
                }
            },

        },
        filters:{
            DateFormat: function (timeStamp) {
                let temp=timeStamp.substr(0,10);
                return temp;
            }
        }


    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 18%;
        margin-bottom: 20px;

    }
    .image{
        height: 80px;
        width: 80px;
    }
</style>
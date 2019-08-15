<template>
    <div class="main_con">
        <div class="con_title">
            <p class="title1">销售人员</p>
            <p class="title2">销售人员拥有部分非安全性角色</p>
        </div>
        <div class="con_warp">
            <div class="warp_box">
                <div class="box_title">
                    <span>订单管理</span>
                </div>
                <div class="box_cont">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <div style="margin-top: 15px"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="con_warp">
            <div class="warp_box">
                <div class="box_title">
                    <span>订单管理</span>
                </div>
                <div class="box_cont">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <div style="margin-top: 15px"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="con_warp">
            <div class="warp_box">
                <div class="box_title">
                    <span>订单管理</span>
                </div>
                <div class="box_cont">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <div style="margin-top: 15px"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="con_warp">
            <div class="warp_box">
                <div class="box_title">
                    <span>订单管理</span>
                </div>
                <div class="box_cont">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <div style="margin-top: 15px"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermitView",
        data() {
            return {
                checkAll: false,
                checkedCities: [],
                cities: ['查看订单', '编辑订单'],
                isIndeterminate: true
            };
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>

<style scoped>
    .main_con {
        padding: 10px;
    }

    .con_title .title1 {
        font-size: 18px;
    }

    .con_title .title2 {
        margin-top: 3px;
        font-size: 12px;
    }

    .box_title {
        font-size: 15px;
        margin-top: 30px;
    }

    .box_cont {
        margin-left: 20px;
        margin-top: 40px;
    }

</style>

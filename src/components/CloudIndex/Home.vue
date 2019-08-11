<template>
    <el-container>
        <el-header style="background-color: #333333">
            <TopMenu :Collapse="Collapse"/>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '65px' : '250px'">
                <LeftMenu :isCollapse="isCollapse"/>
            </el-aside>
            <el-main>
                <!--        <Tags></Tags>-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import TopMenu from "./TopMenu";
    import LeftMenu from "./LeftMenu";

    export default {
        name: "home",
        components: {TopMenu, LeftMenu},
        data() {
            return {
                isCollapse: false,  //是否收起侧边栏
            }
        },
        computed: {},
        methods: {
            Collapse() {
                let isCollapse = this.isCollapse

                this.isCollapse = !isCollapse
            }
        }
    }
</script>

<style scoped>

</style>

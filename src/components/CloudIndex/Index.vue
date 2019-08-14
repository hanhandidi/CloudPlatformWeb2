<template>
    <div class="index">
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="order"  style="width: 400px;height: 400px;"></div>
    </div>
</template>
<script>
    export default {
        name: '',
        data () {
            return {
                charts: '',
                orderType:['未接单','已接单','已拒单','生产中','已完成'],
                orderData:[
                    {value:335, name:'未接单'},
                    {value:310, name:'已接单'},
                    {value:234, name:'已拒单'},
                    {value:135, name:'生产中'},
                    {value:1548, name:'已完成'}
                ],
                device:['开机率','故障率','运行率','综合效率'],
                deviceData:[
                    {value:20, name:'开机率'},
                    {value:20, name:'故障率'},
                    {value:20, name:'运行率'},
                    {value:20, name:'综合效率'},
                ],
            }
        },
        methods:{
            drawPie(id){
                this.charts = this.$echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a}<br/>{b}:{c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:this.device
                    },
                    series: [
                        {
                            name:'订单信息',
                            type:'pie',
                            radius:['50%','70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'blod'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.deviceData
                        }
                    ]
                })
            }
        },
        //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('order')
            })
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    #order{
        width: 350px;
        height: 330px;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0px;
        margin: 0px;
        border-width: 0px;
    }
</style>

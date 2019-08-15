<template>
    <div class="index">
        <span style="font-size: 16px;margin-left: 10px;color: white;">设备状况</span>
        <el-row>
            <el-col :span="6">
                <div id="open"></div>
                <!--为echarts准备一个具备大小的容器dom-->
            </el-col>
            <el-col :span="6">
                <div id="bad"></div>
            </el-col>
            <el-col :span="6">
                <div id="run"></div>
            </el-col>
            <el-col :span="6">
                <div id="all"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="orderPie"></div>
            </el-col>
            <el-col :span="12">
                <div id="orderBar"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                open:0,
                openData:[{
                    name:""
                }],
                charts: '',
                orderType: ['未接单', '已接单', '已拒单', '生产中', '已完成'],
                orderData: [
                    {value: 335, name: '未接单'},
                    {value: 310, name: '已接单'},
                    {value: 234, name: '已拒单'},
                    {value: 135, name: '生产中'},
                    {value: 1548, name: '已完成'}
                ],
            }
        },
        methods: {
            drawPie(id) {
                this.charts = this.$echarts.init(document.getElementById(id))
                let option = {
                    title: {
                        text: "工厂订单信息",
                        x: "center",
                        textStyle: {
                            color: "rgb(255, 255, 255)"
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: "vertical",
                        x: "left",
                        data: this.orderType,
                        textStyle: {
                            color: "rgb(255, 255, 255)"
                        }
                    },
                    toolbox: {
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: true
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: "订单状态",
                            type: "pie",
                            radius: "55%",
                            center: ["50%", "60%"],
                            data: this.orderData
                        }
                    ]
                }
                this.charts.setOption(option)
            },
            drawBar(id) {
                this.charts = this.$echarts.init(document.getElementById(id))
                let option = {
                    title: {
                        text: "每月订单数量",
                        textStyle: {
                            color: "rgb(255, 255, 255)"
                        }
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["订单数"],
                        textStyle: {
                            color: "rgb(255, 255, 255)"
                        }
                    },
                    toolbox: {
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: true
                            },
                            magicType: {
                                type: ["line", "bar"],
                                show: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: "category",
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "订单数",
                            type: "bar",
                            data: [200, 300, 400, 100, 236, 598, 777, 555, 655, 126, 111, 60]
                        }
                    ]
                }
                this.charts.setOption(option)
            },
            drawGauge(id) {
                this.charts = this.$echarts.init(document.getElementById(id));
                let open =this.open
                let option = {
                    series: [
                        {
                            type: "gauge",
                            name: "数据",
                            data: [
                                {
                                    value: open,
                                    name: "开机率"
                                }
                            ],
                            axisLine: {
                                lineStyle: {
                                    color: [[0.2, "rgb(137, 37, 34)"], [0.4, "rgb(255, 69, 0)"], [0.8, "rgb(0, 127, 63)"], [1, "rgb(0, 127, 255)"]]
                                }
                            },
                            detail: {
                                formatter: "{value}%"
                            }
                        }
                    ],
                    tooltip: {
                        formatter: "{a} <br>{b} : {c}%"
                    },
                    title: {
                        x: "center",
                        y: "top",
                        textAlign: "center",
                        text: "开机率",
                        textStyle: {
                            color: "rgb(255, 255, 255)",
                            fontSize: 16
                        }
                    }
                }

                this.charts.setOption(option);

            },

            Selectdevice() {
                console.log("进来了！！！！！")
                this.$ajax.post('/equipment/getAll', {
                    factoryId: 1
                }).then(res => {
                    let count = 0;
                    let device = res.data.data
                    console.log("device", device)
                    let all = device.length
                    console.log("all", all)
                    for (let i = 0; i < all; i++) {
                        if (device[i].equipmentStatus === 10) {
                            count++;
                        }
                    }
                    console.log("count",count)
                    let open = parseFloat(count) / all
                        this.open=open.toFixed(2)*100;
                    console.log("open",open)
                }).catch(res=>{console.log("cuowu")})
            }
        },
        created(){
            this.Selectdevice();
        },
        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawPie('orderPie')
                this.drawBar('orderBar')
                this.drawGauge('open')
                this.drawGauge('run')
                this.drawGauge('bad')
                this.drawGauge('all')
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

    .el-row {
        margin-bottom: 20px;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        text-align: center;
    }

    .index {
        padding-top: 20px;
        height: 100%;
        background-color: #222222;
    }

    #orderPie, #orderBar {
        width: 600px;
        height: 300px;
        background-color: #333333;
        border: solid 3px rgb(51, 51, 51);
        border-radius: 10px;
        user-select: none;
        margin: 0 auto 20px auto;
    }

    #bad, #run, #open, #all {
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background-color: rgb(51, 51, 51);
        /*边框*/
        border: solid 1px rgb(51, 51, 51);
        /*边角弧度*/
        border-radius: 10px;
        /*阴影*/
        -moz-box-shadow: 2px 2px 5px #333333;
        -webkit-box-shadow: 2px 2px 5px #333333;
        box-shadow: 1px 1px 3px #111111;

    }
</style>

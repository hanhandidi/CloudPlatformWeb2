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
                <div id="close"></div>
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
        data() {
            return {
                //存储设备信息
                deviceData:[],
                orderType: ['未接单', '已接单', '已拒单', '生产中', '已完成'],
                //订单饼图数据
                orderData: [],
                //订单柱状图数据
                orderBarData:[]
            }
        },
        methods: {
            //画饼图
            drawPie(id) {
                let charts = this.$echarts.init(document.getElementById(id))
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
                charts.setOption(option)
            },
            //画柱状图
            drawBar(id) {
                let charts = this.$echarts.init(document.getElementById(id))
                let option = {
                    title: {
                        text: "订单状态汇总",
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
                            data: this.orderType,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "rgb(229, 229, 229)"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "rgb(229, 229, 229)"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: "订单数",
                            type: "bar",
                            //data: [200, 300, 400, 100, 236],
                            data: this.orderBarData,
                            itemStyle: {
                                normal: {
                                    //每根柱子颜色设置
                                    color: function(params) {
                                        let colorList = [
                                            "#c23531",
                                            "#2f4554",
                                            "#61a0a8",
                                            "#d48265",
                                            "#76546d"
                                        ];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            //柱状图上显示数据
                            label: {
                                show: "true",
                                position: "top",
                                color: "#FFF",
                                fontWeight: "bolder",
                                backgroundColor: "auto",
                                fontSize: "20"
                            },
                        }
                    ]
                }

                charts.setOption(option)
            },
            //画仪表盘
            drawGauge(id,i) {
                let charts = this.$echarts.init(document.getElementById(id));
                let option = {
                    series: [
                        {
                            type: "gauge",
                            name: "数据",
                            data: [this.deviceData[i]],
                            axisLine: {
                                lineStyle: {
                                    color: [[0.2, "rgb(137, 37, 34)"], [0.4, "rgb(255, 69, 0)"], [0.8, "rgb(0, 127, 63)"], [1, "rgb(0, 127, 255)"]],
                                    width: 20,
                                    shadowColor: "rgb(34, 34, 34)",
                                    shadowBlur: 12,
                                    shadowOffsetX: 3,
                                    shadowOffsetY: 3
                                },
                                show:true
                            },
                            pointer: {
                                length: "50%",
                                width: 8
                            },
                            center: ["50%", "50%"],
                            detail: {
                                formatter: `${this.deviceData[i].value}%`
                            },
                            title: {
                                show: false
                            }
                        }
                    ],
                    tooltip: {
                        formatter: "{a} <br>{b} : {c}%"
                    },
                    title: {
                        x: "left",
                        y: "top",
                        textAlign: "left",
                        text: this.deviceData[i].name,
                        textStyle: {
                            color: "rgb(255, 255, 255)",
                            fontSize: 16
                        }
                    }
                }

                charts.setOption(option);

            },
            //查询设备
            selectDevice() {
                //console.log("进来了！！！！！")
                this.$ajax.post('/equipment/getAll', {
                    factoryId: 1
                }).then(res => {
                    let openCount=0
                    let closeCount=0
                    let badCount=0
                    let device = res.data.data
                    let all = device.length
                    for (let i = 0; i < all; i++) {
                        if (device[i].equipmentStatus === 10) {//启用
                            openCount++;
                        }else if(device[i].equipmentStatus === 20){//停用
                            closeCount++;
                        }else if(device[i].equipmentStatus === 30){//故障
                            badCount++
                        }
                    }
                   // console.log("openCount",openCount)
                    //console.log("closeCount",closeCount)
                    //console.log("badCount",badCount)
                    let openPercent = parseFloat(openCount) / all
                    let closePercent = parseFloat(closeCount) / all
                    let badPercent = parseFloat(badCount) / all
                    let allPercent =  Math.floor(Math.random()*40)+60;
                    let a = {value:openPercent.toFixed(2)*100,name:'开机率'}
                    let b = {value:closePercent.toFixed(2)*100,name:'停机率'}
                    let c = {value:badPercent.toFixed(2)*100,name:'故障率'}
                    let d = {value:allPercent,name:'综合效率'}
                    this.deviceData.push(a);
                    this.deviceData.push(b);
                    this.deviceData.push(c);
                    this.deviceData.push(d);
                    //console.log(this.deviceData)
                    this.drawGauge('open',0)
                    this.drawGauge('close',1)
                    this.drawGauge('bad',2)
                    this.drawGauge('all',3)
                }).catch(()=>{console.log("cuowu")})
            },
            //查询订单
            selectOrder(){
                this.$ajax.post('/productOrder/getAll',{
                    factoryId: 1
                }).then(res=>{
                    let Order = res.data.data
                    console.log("Order",Order)
                    let unreceived=0,received=0,refused=0,product=0,completed=0
                    for (let i = 0; i < Order.length; i++) {
                       switch (Order[i].orderStatus) {
                           case 10:
                               unreceived++;//未接单数量
                               break;
                           case 20:
                               received++;//已接单数量
                               break;
                           case 30:
                               refused++;//已拒单数量
                               break;
                           case 40:
                               product++;//生产中数量
                               break;
                           case 50:
                               completed++;//已完成数量
                               break;
                       }
                    }
                    console.log("unreceived="+unreceived,"received="+received,
                        "refused="+refused,"product="+product,"completed="+completed)
                    this.orderData = [
                        {
                            value: unreceived,
                            name: "未接单"
                        },
                        {
                            value: received,
                            name: "已接单"
                        },
                        {
                            value: refused,
                            name: "已拒单"
                        },
                        {
                            value: product,
                            name: "生产中"
                        },
                        {
                            value: completed,
                            name: "已完成"
                        }
                    ];
                    this.orderBarData = [unreceived,received,refused,product,completed]
                    this.drawPie('orderPie')
                    this.drawBar('orderBar')
                })
            }
        },
        created(){
            this.selectDevice();
            this.selectOrder();
        },
        //调用
        mounted() {
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

    #bad, #close, #open, #all {
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

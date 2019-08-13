module.exports = [{
    title: '设备管理',
    index: '1',
    icon: 'el-icon-s-operation',
    subs: [
        {
            index: 'deviceManage',
            title: '设备列表'
        },
        {
            index: 'addDevice',
            title: '添加设备'
        },
    ]
},
    {
        title: '产品管理',
        index: '2',
        icon: 'el-icon-s-goods',
        subs: [
            {
                index: 'productList',
                title: '产品列表'
            },
            {
                index: 'addProduct',
                title: '添加产品'
            },
        ]
    },
    {
        title: '订单管理',
        index: '3',
        icon: 'el-icon-s-order',
        subs: [
            {
                index: 'orderManage',
                title: '订单列表'
            },
        ]
    },
    {
        title: '生产管理',
        index: '4',
        icon: 'el-icon-s-cooperation',
        subs: [
            {
                title: '生产计划管理',
                index: '4-1',
                subs: [
                    {
                        index: 'addProductPlan',
                        title: '添加生产计划'
                    },
                    {
                        index: 'planList',
                        title: '生产计划列表'
                    },
                ]
            },
            {
                title: '生产调度管理',
                index: '4-2',
                subs: [
                    {
                        index: 'addProductSchedule',
                        title: '添加生产调度'
                    },
                    {
                        index: 'scheduleList',
                        title: '生产调度列表'
                    },
                ]
            },
            {
                title: '生产跟踪管理',
                index: '4-3',
                subs: [
                    {
                        index: 'reportList',
                        title: '报工列表'
                    },
                    {
                        index: 'traceList',
                        title: '生产跟踪列表'
                    }
                ]
            },
        ]
}]

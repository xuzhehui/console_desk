<template>
    <div>
        <FullPage 
        title='家装工装生产订单列表' 
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" ghost  style="margin-right:10px;">批量派工单</Button>
                <Button type="primary" ghost>打印清单</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a style="color:#32C800">派工单</a>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            logList:[{title:'系统单号',value:'10998765'}],
            list:[
                {title:'工序分类',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'产品',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'位置',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'部件',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'小区',align:'center',key:'type'},
                {title:'楼幢',align:'center'},
                {title:'单元',align:'center'},
                {title:'楼层',align:'center'},
                {title:'房间号',align:'center'},
                {title:'产品',align:'center'},
                {title:'位置',align:'center'},
                {title:'部件',align:'center'},
                {title:'部件是否贴标签',align:'center'},
                {title:'贴标签零部件',align:'center'},
                {title:'工序分类',align:'center'},
                {title:'工序',align:'center'},
                {title:'测量尺寸',align:'center'},
                {title:'标签单位',align:'center'},
                {title:'数量',align:'center'},
                {title:'二维码',align:'center'},
                {title:'芯片编号',align:'center',},
                {title:'实际测量时间',align:'center',},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){

        },
        searchData(row){

        },
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
<template>
    <div>
        <FullPage 
        title='工装订单列表（测量订单）' 
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
                <Button type="primary" style="margin-right:10px;" ghost>批量下生产</Button>
                <Button type="primary" ghost>批量导出</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a style="margin:0 5px;" @click="goPage">编辑</a>
                   <a style="margin:0 5px;" @click="goPage">详情</a>
                   <a style="margin:0 5px;">下生产</a>
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
                {title:'按房号',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'订单状态',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'下单编号',align:'center',key:'type'},
                {title:'订单号',align:'center',key:'type'},
                {title:'小区',align:'center',key:'type'},
                {title:'楼幢',align:'center'},
                {title:'单元',align:'center'},
                {title:'楼层',align:'center'},
                {title:'房间号',align:'center'},
                {title:'订单状态',align:'center'},
                {title:'测量开始时间',align:'center'},
                {title:'测量结束时间',align:'center'},
                {title:'实际完成时间',align:'center'},
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
        goPage(row){
            this.$router.push({
                path:'/cms/measurementordermannage/edit'
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
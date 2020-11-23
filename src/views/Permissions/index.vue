<template>
    <div>
        <FullPage 
        @init='init'
        :list='list'
        @searchData='init'
        :title='$route.query.type == 1 ? "工厂套餐列表" : ($route.query.type == 2 ? "供应商套餐列表" : "经销商套餐列表")'
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="goDetails(null,1)">新增套餐</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <Button size='small' class="map-margin" @click="goDetails(row,3)">详情</Button>
                    <Button size='small' type='primary' class="map-margin" @click="goDetails(row,2)">编辑</Button>
                    <Button size='small' type='error' class="map-margin" @click="delItems(row)">删除</Button>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {name:'Input',title:'权限名称',value:'',serverName:'title',placeholder:'请输入权限名称'},
            ],
            tableColums:[
                {title:'套餐名称',align:'center',key:'title',width:200,fixed:'left'},
                {title:'套餐价格',align:'center',key:'price',minWidth:100},
                {title:'套餐时间',align:'center',key:'time',minWidth:100},
                {title:'添加时间',align:'center',key:'create_time',minWidth:100},
                {title:'最后操作人',align:'center',key:'last_user',minWidth:100},
                {title:'操作时间',align:'center',key:'update_time',minWidth:100},
                {title:'是否启用',align:'center',key:'state',minWidth:100,
                    render:(h,params)=>h('i-switch',{
                        props:{
                            value:params.row.state,
                            'true-value':1,
                            'false-value':0,
                        },
                        on:{
                            'on-change':(check)=>this.tableData[params.index].state = check
                        }
                    })
                },
                {title:'操作',align:'center',slot:'set',width:'180',fixed:'right'},
            ],
            tableData:[
                {
                    title:'套餐1',price:123,state:1,id:1,time:'2020-11-22',create_time:'2020-11-23'
                }
            ],
            loading:false,
            pageIndex:1,
            pageSize:10,
            total:10,
            proxyObj:{},
            show:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex
            row.page_size = this.pageSize
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/notice_message/list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data||res.data.data;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/notice_message/del',{id:row.id}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg||'操作成功')
                            this.getData(this.proxyObj)
                        }
                    })
                }
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj);
        },
        goDetails(row,type){
            const op = type == 1 ? 'add' : (type == 2 ? 'edit' : 'see')
            const id = row&&row.id ? row.id : ''
            this.$router.push({
                path:'/cms/permissions/edit',
                query:{type:this.$route.query.type,op:op,id:id,}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
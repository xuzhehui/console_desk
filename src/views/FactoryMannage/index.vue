<template>
    <div>
        <FullPage 
        @init='init'
        :list='list'
        @searchData='init'
        title='工厂列表'
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="goDetails(null,1)">新增消息</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <Button size='small' class="map-margin" @click="goDetails(row,3)">重置密码</Button>
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
                {name:'Input',title:'工厂名称',value:'',serverName:'title',placeholder:'请输入工厂名称'},
            ],
            tableColums:[
                {title:'工厂名称',align:'center',key:'title',width:'100',fixed:'left'},
                {title:'负责人',align:'center',key:'user',minWidth:100},
                {title:'手机号',align:'center',key:'mobile',minWidth:100},
                {title:'地址',align:'center',key:'address',minWidth:100},
                {title:'套餐类型',align:'center',key:'type',minWidth:100},
                {title:'到期时间',align:'center',key:'end_time',minWidth:100},
                {title:'添加时间',align:'center',key:'create_time',minWidth:100},
                {title:'套餐类型',align:'center',key:'update_time',minWidth:100},
                {title:'业务员',align:'center',key:'update_time',minWidth:100},
                {title:'最后操作人',align:'center',key:'update_time',minWidth:100},
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
                {title:'操作',align:'center',slot:'set',width:'250',fixed:'right'},
            ],
            tableData:[
                {
                    title:'内定',type:'123',state:1,id:1,
                }
            ],
            loading:false,
            pageIndex:1,
            pageSize:10,
            total:10,
            proxyObj:{},
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
        goDetails(row,type){ //type：1新增 2编辑 3详情
            const id = row&&row.id ? row.id : ''
            this.$router.push({
                path:'/cms/notice/message/edit',
                query:{
                    title:type == 1 ? '新增消息' : (type == 2 ? '编辑消息' : '查看消息'),
                    type:type,
                    id:id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
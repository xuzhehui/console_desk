<template>
    <div>
        <FullPage 
        @init='init'
        :list='list'
        @searchData='init'
        title='工厂权限列表'
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="show = true">新增工厂权限</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <Button size='small' class="map-margin">详情</Button>
                    <Button size='small' type='primary' class="map-margin" @click="goDetails(row,2)">编辑</Button>
                    <Button size='small' type='error' class="map-margin" @click="delItems(row)">删除</Button>
                </div>
            </template>

            <Modal title='权限选择' v-model="show" class-name="vertical-center-modal">
                正在维护中.....

            </Modal>

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
                {title:'权限名称',align:'center',key:'title',minWidth:200},
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
                {title:'操作',align:'center',slot:'set',width:'180',},
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
    }
}
</script>

<style lang="scss" scoped>
</style>
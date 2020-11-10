<template>
    <div>
        <FullPage 
        title='操作日志'
        :list='list' 
        @init='init' 
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <div>
                    <span>清除记录：</span>
                    <DatePicker v-model="clearData"  size='small' placeholder="请选择清除日期" style="width: 150px"></DatePicker>
                    <Button @click="clareHistory" style="margin-left:10px;" size='small'  type="primary">确定</Button>
                </div>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'操作人员',name:'Select',filterable:true,value:'',serverName:'user_id',placeholder:'请选择人员名称',
                    option:[]
                },
                {title:'操作日期',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'编号',align:'center',key:'id',width:'100'},
                {title:'操作者',align:'center',key:'user'},
                {title:'操作日期',align:'center',key:'date',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.crt_time))
                },
                {title:'IP地址',align:'center',key:'ip',},
                {title:'操作记录',align:'center',key:'info'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            proxyObj:{},
            loading:false,
            user:[],
            clearData:'',
        }
    },
    created(){
        this.axios('/api/user').then(res=>{
            const data = res.data.data.map(v=>{
                v.label=v.nickname;
                v.value=v.id
                return v
            })
            this.list[0].option = data;
        })
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/log_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
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
        clareHistory(){
            if(this.clearData){
                const time = new Date(this.clearData).toLocaleDateString().replace(/\//g,"-")
                this.confirmDelete({
                    title:'清除记录',
                    content:'确认清除'+time+'的记录么？',
                    then:()=>{
                        this.axios.post('/api/clear_log',{date:time})
                        .then(res=>{
                            if(res.code == 200){
                                this.$Message.success(res.msg||'清除成功')
                                this.getData(this.proxyObj)
                            }
                        })
                    }
                })
            }else{
                this.$Message.warning('请选择清除日期')
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>
<template>
    <div>
        <FullPage 
        title='部件详情' 
        :logList='logList'
        :list='list'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :showbtn='false'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" >打印清单</Button>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:null,
            list:[],
            logList:[],
            order_no:null,
            tableColums:[
                {title:'部件',align:'center',key:'part_title',fixed:'left',width:'200'},
                {title:'工艺路线',align:'center',key:'route_title',minWidth:100},
                {title:'指导报价(元)',align:'center',key:'price',minWidth:100},
                {title:'单位',align:'center',key:'company',minWidth:100},
                {title:'预估工期',align:'center',key:'predict_time',fixed:'right',width:'150'},
            ],
            list:[
                {title:'产品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品名称'},
                {title:'长',name:'Input',value:'',serverName:'long',placeholder:'请输入长度'},
                {title:'宽',name:'Input',value:'',serverName:'wide',placeholder:'请输入宽度'},
                {title:'高',name:'Input',value:'',serverName:'high',placeholder:'请输入高度'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false,
            a_list:[
                {
                    title:'门套',
                    child:[
                        {title:'工艺1',id:1,show:false},
                        {title:'工艺2',id:2,show:false}
                    ]
                },
                {
                    title:'门套1',
                    child:[
                        {title:'工艺1',id:1,show:false},
                        {title:'工艺2',id:2,show:false}
                    ]
                }
            ],
        }
    },
    created(){
        if(this.$route.query.type){this.type = this.$route.query.type;}
        if(this.type == 'produce'){
            let _this = this;
            this.tableColums.map(v=>{
                if(v.title=='工艺路线'){
                    v.render = function(h,params){
                        return h('a',{
                            props:{

                            },
                            on:{
                                'click':(e)=>{
                                    let obj = {
                                        order_no:_this.order_no,
                                        product_id:params.row.product_id,
                                        parts_id:params.row.parts_id
                                    }
                                    _this.selectProcessRouter({
                                        params:obj,
                                        then(data){
                                            
                                        }
                                    })
                                    
                                }
                            }
                        },'选择工艺路线')
                    }
                }
            })
        }
        
    },
    mounted(){
        this.getData(this.$route.query)
    },
    // components:{SelectRoute},
    methods:{
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_product_parts_list',{params:row}).then(res=>{
                this.loading = false
                this.logList = res.data.detail;
                this.order_no = res.data.order_no
                this.tableData = res.data.list;
                res.data.top.map(v=>{v.width='200';this.tableColums.splice(1,0,v)})
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
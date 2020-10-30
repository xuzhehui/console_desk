<template>
    <div>
        <FullPage 
        title='工装家装订单详情' 
        :showTopSearch='false'
        :logList='logList'
        :loading='loading'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button type="primary" @click="postData">打印清单</Button>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a @click="goPage(row.row)">查看部件</a>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            house_id:this.$route.query.house_id,
            logList:[],
            tableColums:[
                {title:'产品类型',align:'center',key:'type',fixed:'left',minWidth:100,key:'basics_title'},
                {title:'产品名称',align:'center',key:'product_title',minWidth:150},
                {title:'产品型号',align:'center',key:'model',minWidth:100},
                {title:'测量数据',align:'center',key:'measurement',minWidth:200},
                {title:'位置',align:'center',key:'address',key:'position',minWidth:100},
                {title:'图号',align:'center',key:'address',key:'url_number',minWidth:100
                    
                },
                {title:'图纸',align:'center',key:'address',key:'url',minWidth:120,
                    render:(h,params)=>{
                        return h('a',{
                            attrs:{
                                href:this.$store.state.ip+params.row.url,
                                target:'_blank'
                            }
                        },
                            [
                                h('img',{
                                    attrs:{
                                        src:this.$store.state.ip+params.row.url,
                                        style:'max-width:30px;max-height:30px;position:relative;top:3px;',
                                    }
                                })
                            ]
                        )
                    }
                },
                {title:'预估产品工期',align:'center',minWidth:150,
                    render:(h,params)=>h('span',{},`${params.row.predict_working}小时`)
                },
                {title:'操作',align:'center',slot:'set',fixed:'right',minWidth:100},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false
        }
    },
    created(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
    },
    mounted(){
        this.getData(this.$route.query)
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_product_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.list;
                this.logList = res.data.detail;
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/partsdetails',
                query:{
                    order_product_id:row.order_product_id,
                }
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}

</style>
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
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" @click="postData">打印清单</Button>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            list:[],
            logList:[],
            tableColums:[],
            list:[
                {title:'产品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品名称'},
                {title:'长',name:'Input',value:'',serverName:'long',placeholder:'请输入长度'},
                {title:'宽',name:'Input',value:'',serverName:'wide',placeholder:'请输入宽度'},
                {title:'高',name:'Input',value:'',serverName:'high',placeholder:'请输入高度'},
                {title:'左/右式',name:'Select',value:'',serverName:'title',placeholder:'请选择',
                    option:[
                        {label:'左式',value:1},
                        {label:'右式',value:2},
                    ]
                },
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false,
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
            this.axios('/api/order_parts_list',{params:row}).then(res=>{
                this.loading = false
                this.logList = res.data.detail;
                this.tableData = res.data.part;
                this.tableColums = this.func.objtoArray(res.data.parts_top)
                this.logList.map(v=>{
                    this.list.map(k=>{
                        if(v.key == k.title){
                            k.value = v.value;
                            k.disabled = true;
                            v.value == '左' ? k.value = 1 : k.value = 2
                        }
                    })
                })
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
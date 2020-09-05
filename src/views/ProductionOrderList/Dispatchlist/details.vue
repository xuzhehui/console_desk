<template>
    <div>
        <FullPage 
        title='派工单详情' 
        :showTopSearch='false'
        @changePage='changePage'
        @selectTable='selectTable'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" ghost>打印派工单</Button>
                <Button @click="finish(selectIds)" type="success" ghost>批量完成</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                   <a style="color:#32C800" @click="finish(row)">完成</a>
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
            tableColums:[
                {type:'selection',fixed:'left',width:'60'},
                {title:'小区',align:'center',key:'type',width:'200'},
                {title:'产品',align:'center',width:'150'},
                {title:'部件',align:'center',width:'150'},
                {title:'包装码',align:'center',width:'150'},
                {title:'部件是否贴标签',align:'center',width:'150'},
                {title:'贴标签零部件',align:'center',width:'150'},
                {title:'工序分类',align:'center',width:'150'},
                {title:'工序',align:'center',width:'150'},
                {title:'测量尺寸',align:'center',width:'150'},
                {title:'单位',align:'center',width:'100'},
                {title:'二维码',align:'center',width:'150'},
                {title:'芯片编号',align:'center',width:'150'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[{type:'123',id:99},{type:'123',id:99}],
            pageIndex:1,
            total:100,
            selectIds:[],
        }
    },
    mounted(){
        this.getData({id:this.$route.query.id})
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.axios('/api/orders_dispatch_detail',{params:row}).then(res=>{
                if(res.code == 200){
                    this.tableData = res.data.data;
                    this.getData({id:this.$route.query.id})
                }
            })
        },
        postData(data){
            console.log(data)
            this.axios.post('/api/orders_dispatch_confirm',data).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg);

                }
            })
        },
        changePage(e){},
        finish(row){
            if(!row||row.length<1){return this.$Message.warning('请至少选择一项')}
            let str = Array.isArray(row) ? row.join(',') : row.id
            console.log(str)
            this.confirmDelete({
                content:'是否手动操作此订单生产完成',
                title:'生产完成',
                type:'primary',
                then:()=>{
                    this.postData({id:str})
                },
                cancel:()=>{}
            })
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(v.id));
            this.selectIds = result;
        }
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
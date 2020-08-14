<template>
    <div>
        <FullPage 
        title='工装订单详情' 
        :showTopSearch='false'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" @click="postData">打印清单</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
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
            type:1,
            logList:[{title:'系统单号',value:'10998765'}],
            tableColums:[
                {title:'产品类型',align:'center',key:'type'},
                {title:'材质',align:'center'},
                {title:'工艺',align:'center'},
                {title:'颜色',align:'center'},
                {title:'左/右式',align:'center'},
                {title:'产品名称',align:'center'},
                {title:'产品型号',align:'center'},
                {title:'测量数据',align:'center'},
                {title:'位置',align:'center'},
                {title:'出库时间',align:'center'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/partsdetails'
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
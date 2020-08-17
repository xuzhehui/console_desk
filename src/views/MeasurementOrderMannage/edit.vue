<template>
    <div>
        <Toptitle title='编辑订单'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" style="margin-right:10px;" @click="postData">保存</Button>
            <Button type="primary" @click="postData">下生产</Button>
        </Toptitle>
        <div class="log-list">
            <div class="log-item" v-for="(item,index) of logList" :key="index">
                <span>{{item.title}}：</span>
                <span>{{item.value}}</span>
            </div>
        </div>
        <Table border stripe :columns="tableColums" :data="tableData">

        </Table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            logList:[{title:'系统单号',value:'10998765'}],
            tableColums:[
                {title:'产品名称',align:'center',key:'type'},
                {title:'产品型号',align:'center'},
                {title:'长',align:'center'},
                {title:'宽',align:'center'},
                {title:'高',align:'center'},
                {title:'单位',align:'center'},
                {title:'左式',align:'center'},
                {title:'右式',align:'center'},
                {title:'图号',align:'center'},
                {title:'图纸',align:'center'},
                {title:'位置',align:'center'},
                {title:'测量数据',align:'center'},
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
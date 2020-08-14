<template>
    <div>
        <FullPage 
        title='派工单详情' 
        :showTopSearch='false'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" ghost>打印派工单</Button>
                <Button type="success" ghost>批量完成</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a style="color:#32C800">完成</a>
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
                {title:'小区',align:'center',key:'type'},
                {title:'产品',align:'center'},
                {title:'部件',align:'center'},
                {title:'包装码',align:'center'},
                {title:'部件是否贴标签',align:'center'},
                {title:'贴标签零部件',align:'center'},
                {title:'工序分类',align:'center'},
                {title:'工序',align:'center'},
                {title:'测量尺寸',align:'center'},
                {title:'单位',align:'center'},
                {title:'二维码',align:'center'},
                {title:'芯片编号',align:'center'},
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
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>
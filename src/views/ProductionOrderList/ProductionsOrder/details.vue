<template>
    <div>
        <FullPage 
        title='编辑订单' 
        :showTopSearch='false'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" @click="postData">打印图纸</Button>
                <Button type="primary" @click="postData">下生产计划</Button>
            </div>

            <div slot='text-list' >
                <div>
                    <Form inline :label-width="80" >
                        <FormItem label="产品名称" label-position='left'>
                            <Input></Input>
                        </FormItem>
                        <FormItem label="长">
                            <Input style="width:36px"></Input>
                        </FormItem>
                        <FormItem label="宽">
                            <Input style="width:36px"></Input>
                        </FormItem>
                        <FormItem label="高">
                            <Input style="width:36px"></Input>
                        </FormItem>
                        <FormItem label="左/右式">
                            <Input style="width:36px"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div class="log-list">
                    <div class="log-item" v-for="(item,index) of logList" :key="index">
                        <span>{{item.title}}：</span>
                        <span>{{item.value}}</span>
                    </div>
                </div>
                
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a>打印图纸</a>
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
            logList:[{title:'订单编号',value:'10998765'}],
            tableColums:[
                {title:'部件',align:'center',key:'type'},
                {title:'材质',align:'center'},
                {title:'颜色',align:'center'},
                {title:'工艺',align:'center'},
                {title:'工艺路线',align:'center'},
                {title:'指导报价 (元)',align:'center'},
                {title:'测量数据',align:'center'},
                {title:'图号',align:'center'},
                {title:'图纸',align:'center'},
                {title:'预估工期',align:'center'},
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
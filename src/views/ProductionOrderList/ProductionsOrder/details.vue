<template>
    <div>
        <FullPage 
        title='编辑订单' 
        :list='list'
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
            list:[
                {name:'Input',title:'产品名称',value:'',placeholder:'请输入产品名称'},
                {name:'Input',title:'长',value:'',width:50},
                {name:'Input',title:'宽',value:'',width:50},
                {name:'Input',title:'高',value:'',width:50},
                {name:'Select',title:'左/右式',value:'',
                    option:[
                        {label:'左式',value:1},
                        {label:'右式',value:1},
                    ]
                }
            ],
            logList:[{title:'订单编号',value:'10998765'}],
            tableColums:[
                {title:'部件',align:'center',key:'type',fixed:'left'},
                {title:'材质',align:'center',width:'200'},
                {title:'颜色',align:'center',width:'200'},
                {title:'工艺',align:'center',width:'200'},
                {title:'工艺路线',align:'center',width:'200'},
                {title:'指导报价 (元)',align:'center',width:'200'},
                {title:'测量数据',align:'center',width:'200'},
                {title:'图号',align:'center',width:'200'},
                {title:'图纸',align:'center',width:'200'},
                {title:'预估工期',align:'center',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'120'},
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
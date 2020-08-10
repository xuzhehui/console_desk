<template>
    <div>
        <FullPage 
        title='木材'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='navButton'>
                <Button @click="goDetial(1)" type="primary" ghost icon='md-add'>新增物料</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goDetial(2)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',serverName:'id',placeholder:'请输入ID',value:''},
                {title:'材质',name:'Input',serverName:'id',placeholder:'请输入材质',value:''}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',fixed:'left',},
                {title:'材料分类名称',align:'center',key:'id',width:'150'},
                {title:'材质',align:'center',key:'id',width:'150'},
                {title:'库存',align:'center',key:'id'},
                {title:'单位',align:'center',key:'id'},
                {title:'预警值',align:'center',key:'id'},
                {title:'单价(元)',align:'center',key:'id'},
                {title:'长',align:'center',key:'id'},
                {title:'宽',align:'center',key:'id'},
                {title:'厚',align:'center',key:'id'},
                {title:'公式',align:'center',key:'id'},
                {title:'描述',align:'center',key:'id'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'100'},
            ],
            tableData:[
                {id:'1',title:'222'}
            ],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){

        },
        searchData(row){

        },
        changePage(e){

        },
        goDetial(n,row){// n = 1 新增 2 编辑 3 查看 
            
            this.$router.push({
                name:'MaterialMannageEdit',
                params:{
                    title:n==1 ? '新增物料' : (n == 2 ? '编辑物料' : '查看物料'),
                    // id:row.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
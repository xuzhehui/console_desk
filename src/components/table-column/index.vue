<template>
    <div style="background:#fff;">
        <Table :columns="tableColums" :data='tableDatas'>
             <template slot='set' slot-scope='{row}'>
                <div>
                    <Icon size='20' @click="addItems(row,1,null)" style="margin-right:20px;color:green;cursor:pointer" type="ios-add-circle" />
                    <Icon size='20' @click="addItems(row,2,1)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' @click="delItems(row)" style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>
        </Table>
        <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增工序分类': '编辑工序分类'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
            <Form :label-width="90">
                <FormItem label="ID：">
                    <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                </FormItem>
                <FormItem label="分类名称：">
                     <Input placeholder="请输入分类名称" v-model="classInfo.title"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
        tableDatas:Array,
        default:null,
    },
    data(){
        return {
            tableColums:[
                {title:'展开',type:'expand',width:'70',align:'center',slot:'costom',
                    render(h,params){
                        return h('Tables',{
                            props:{
                                tableDatas:params.row.child
                            }
                        })
                    }
                },
                {title:'ID',key:'',align:'center',key:'id'},
                {title:'工序分类名称',key:'',align:'center',key:'title'},
                {title:'操作',key:'',align:'center',slot:'set'},
            ],
            classInfo:{},
            showType:1,
            showModal:false,
        }
    },
    methods:{
         addItems(obj,type,edit){
            this.showModal = true
            this.showType = type;
            this.classInfo.id = obj.id;
            this.classInfo.title = edit == 1 ? obj.title : '';
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_procedure_add' : '/api/basics_procedure_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.searchObj)
                    this.undata_navData()
                }  
            })
        },
        vivibleModal(e){
            if(!e){
                this.classInfo = {
                    id:null,
                    title:''
                }
            }
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_procedure_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data;
                this.total = res.data.total;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
/deep/ .expanded-cell{padding:0 20px!important}
</style>
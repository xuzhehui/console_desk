<template>
    <div style="background:#fff;">
        <Table class="over-columns" :columns="tableColums" :data='tableDatas'>
             <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <svg  @click="addItems(row,1,null)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxinzengshuxing"></use>
                    </svg>

                    <svg style="font-size:20px" color='#3764FF' @click="addItems(row,2,1)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
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
                <FormItem label='类型：'>
                    <Select v-model="classInfo.type">
                        <Option :value='1'>生产</Option>
                        <Option :value='2'>运输</Option>
                        <Option :value='3'>安装</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props:{
        tableDatas:{
            type:Array,
            default:null,
        },
    },
    data(){
        let vm = this
        return {
            tableColums:[
                {title:'展开',type:'expand',width:'70',align:'center',slot:'costom',
                    render(h,params){
                        return h('Tables',{
                            props:{
                                tableDatas:params.row.child||[]
                            },
                            on:{
                                updataTables:(array)=>{vm.$emit('updataTables',array)}
                            }
                        })
                    }
                },
                {title:'ID',key:'',align:'center',key:'id'},
                {title:'工序分类名称',key:'',align:'center',key:'title'},
                {title:'操作',key:'',align:'center',slot:'set',width:'150'},
            ],
            classInfo:{},
            showType:1,
            showModal:false,
            tableData:[],
        }
    },
    methods:{
        ...mapActions(['undata_navData']),
         addItems(obj,type,edit){
            this.showModal = true
            this.showType = type;
            this.classInfo.id = obj.id;
            this.classInfo.title = edit == 1 ? obj.title : '';
            this.classInfo.type = obj.type || 1;
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_procedure_add' : '/api/basics_procedure_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData()
                    this.undata_navData()
                }  
            })
        },
        vivibleModal(e){
            if(!e){
                this.classInfo = {
                    id:null,
                    title:'',
                    type:null,
                }
            }
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_procedure_index').then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
                this.$emit('updataTables',this.tableData)
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_procedure_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData()
                            this.undata_navData()
                        } 
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
/deep/ .expanded-cell{padding:0 20px!important}
/deep/ .over-columns .ivu-table-header{display: none!important;}
/deep/ td .ivu-table-expanded-cell{padding:15px 10px!important}
</style>

<style lang="scss">
td.ivu-table-expanded-cell{padding:15px 10px;}
</style>
<template>
    <div style="background:#fff;">
        <Table class="over-columns" :columns="tableColums" :data='tableDatas'>
             <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <svg  @click="addItems(row,1,0)" class="icon icon-nav" aria-hidden="true">
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
        <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增产品分类': '编辑产品分类'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
            <Form :label-width="120">
                <FormItem label="ID：">
                    <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                </FormItem>
                <FormItem label="产品分类名称：">
                    <Input placeholder="请输入产品分类名称" v-model="classInfo.title"/>
                </FormItem>
                <FormItem label="基础测量字段：">
                    <CheckboxGroup v-model="classInfo.measure_id">
                        <Checkbox style="margin-right:10px;margin-bottom:10px;" v-for="item of measureList" :key="item.id" :label="item.id" border>
                            {{item.title+'('+ item.e_title +')'}}
                        </Checkbox>
                    </CheckboxGroup>
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
                        return h('ProductTables',{
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
                {title:'产品分类名称',key:'',align:'center',key:'title'},
                {title:'操作',key:'',align:'center',slot:'set',width:'150'},
            ],
            
            tableData:[],
            showModal:false,
            showType:1,
            classInfo:{
            },
            measureList:[],//测量字段列表
        }
    },
    created(){
        this.getMeasure()
    },
    methods:{
        ...mapActions(['undata_navData']),
        addItems(obj,type,edit){
            this.showModal = true;
            this.showType = type
            if(edit==1){
                this.getDetails(obj.id)
            }else if(edit == 0){
                this.classInfo.id = obj.id;
            }
        },
        getMeasure(){//获取基础测量字段列表
            this.axios('/api/basics_measure_index').then(res=>{
                this.measureList = res.data.data;
            })
        },
        getDetails(id){
            this.axios('/api/basics_product_detail',{params:{id:id}}).then(res=>{
                let result = [];
                res.data.measure_id.map(v=>result.push(v*1))
                this.classInfo = res.data;
                this.classInfo.measure_id = result;
            })
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_product_add' : '/api/basics_product_edit',post_data={
                id:this.classInfo.id,
                title:this.classInfo.title,
                measure_id:this.classInfo.measure_id.join(',')||'',
            }
            this.axios.post(post_url,post_data).then(res=>{
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
                    title:''
                }
            }
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_product_index',{params:row}).then(res=>{
                this.loading = false,
                this.tableData = res.data.data;
                this.$emit('updataTables',this.tableData)
            })
        },
         delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_product_del',{id:row.id,state:0}).then(res=>{
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
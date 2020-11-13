<template>
    <div>
        <FullPage 
        title='芯片列表'
        :list='list' 
        @init='init' 
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <a @click="chipDetails(row)" class="map-margin">绑定详情</a>
                    <a v-if="row.status!=2" @click="unBind(row)" class="map-margin">解绑</a>
                    <a @click="delItems(row)" class="map-margin">删除</a>
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" title="芯片详情" v-model="showModal" :width="380" @on-visible-change='vivibleModal'>
                    <Form :label-width="130">
                        <FormItem label="项目地址：">{{classInfo.address}}</FormItem>
                        <FormItem label="房间号：">{{classInfo.house}}</FormItem>
                        <FormItem label="产品：">{{classInfo.product_title}}</FormItem>
                        <FormItem label="位置：">{{classInfo.position}}</FormItem>
                        <FormItem label="部件名称：">{{classInfo.part_title}}</FormItem>
                        <FormItem label="是否绑定部件：">{{classInfo.label == 1 ? '是' : '否'}}</FormItem>
                        <FormItem label="零部件名称：">{{classInfo.sub_label}}</FormItem>
                        <FormItem label="是否绑定零部件：">{{classInfo.sub_is_tag == 1 ? '是' : '否'}}</FormItem>
                    </Form>
                    <div slot="footer"></div>
                </Modal>

                <!-- <Modal class-name="vertical-center-modal" v-model="add_chip" :width="300">
                    <Form>
                        <FormItem label='芯片编号'>
                            <Input></Input>
                        </FormItem>
                    </Form>
                </Modal> -->
                
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'是否绑定',name:'Select',value:'',serverName:'status',
                    option:[
                        {label:'是',value:1},
                        {label:'否',value:0}
                    ]
                },
                {title:'芯片编号',name:'Input',value:'',serverName:'tag',placeholder:'请输入芯片编号'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'芯片编号',align:'center',key:'tag'},
                {title:'是否绑定',align:'center',key:'pr_id',
                    render:(h,params)=>h('span',params.row.status == 0 ? '未绑定' : (params.row.status == 1 ? '已绑定' : '已解绑'))
                },
                {title:'操作',align:'center',slot:'set',width:'200'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            showModal:false,
            showType:1,
            classInfo:{},
            proxyObj:{},
            loading:false,
            add_chip:true,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/tag_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj);
        },
        chipDetails(obj){
            this.showModal = true;
            this.axios('/api/tag_detail',{params:{id:obj.id}})
            .then(res=>{
                if(res.code == 200){
                    this.classInfo = res.data
                }
            })
        },
        postInfo(){
            
        },
        vivibleModal(e){
            if(!e){this.classInfo = {};}
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/tag_del',{tag:row.tag,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        },
        addChip(){
            this.add_chip = true;
        },
        unBind(row){
            this.confirmDelete({
                content:'确认解绑么？',
                type:'primary',
                then:()=>{
                    this.axios.post('/api/tag_unbind',{tag:row.tag,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>
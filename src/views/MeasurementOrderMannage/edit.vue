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
        <div>
            <Table class="overflow-table" border stripe :columns="tableColums" :data="tableData">

            </Table>
        </div>
        
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
                {title:'左右式',align:'center',width:'100',
                    render: (h, params) => {
                        return h('Select', {
                            props:{
                                value:1,
                            },
                        on:{
                            'on-change':(e) =>console.log(e)
                        },
                        },
                        [
                        h('Option',{
                            props: {
                                 value:1
                            }
                            },'左式'),
                        h('Option',{
                            props: {
                                value:2
                            }
                        },'右式')
                        ]);
                    },
                },
                {title:'图号',align:'center',width:'150',
                    render(h){
                        return h('Input',{
                            attrs:{
                                placeholder:'请输入图号'
                            }
                        })
                    }
                },
                {title:'图纸',align:'center',
                    render(h){
                        return h('Upload',{
                            props:{
                                'show-upload-list':false
                            },
                            attrs:{
                                action:'//jsonplaceholder.typicode.com/posts/'
                            }
                        },[
                            h('a',{
                                attrs:{
                                    style:'position:relative;'
                                }
                            },'上传')
                        ])
                    }
                },
                {title:'位置',align:'center'},
                {title:'测量数据',align:'center'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
        }
    },
    created(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        this.getData(this.id)
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        getData(id){
            this.axios('/api/order_oa_list',{params:{id:id}}).then(res=>console.log(res))
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
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
</style>
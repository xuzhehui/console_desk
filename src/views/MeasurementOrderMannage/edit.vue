<template>
    <div>
        <Toptitle :title='type == 2 ? "编辑订单" : "查看订单" '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button :disabled='type == 3 ? true : false' type="primary" style="margin-right:10px;" @click="postData">保存</Button>
            <Button :disabled='type == 3 ? true : false' type="primary">下生产</Button>
        </Toptitle>

        <div class="page-edit">
            <div class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.key}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
            <div>
                <Table class="overflow-table" border stripe :columns="tableColums" :data="tableData">
                    <template slot-scope="{ row,index }" slot="img_number">
                        <Input :disabled='type == 3 ? true : false' v-model="tableData[index].url_number" placeholder="请输入图号"></Input>
                    </template>
                    <template slot-scope="{ row,index }" slot="leftOrright">
                        <Select :disabled='type == 3 ? true : false' v-model="tableData[index].type">
                            <Option label="左式" :value='1'></Option>
                            <Option label="右式" :value='2'></Option>
                        </Select>
                    </template>
                    <template slot-scope="{row,index}" slot="up-load">
                        <div>
                            <Upload :disabled='type == 3 ? true : false' :headers="headers" :on-success='successUpload' :show-upload-list='false' :action="$store.state.ip+'/api/upload_pic'">
                                <a v-if="!row.url" @click="mapRow(index)">上传</a>
                                <img @click="mapRow(index)" style="max-width:50px;max-height:50px;position:relative;top:3px" v-if="row.url" :src="$store.state.ip+row.url" alt="">
                            </Upload>
                        </div>
                    </template>
                </Table>
            </div>
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
                {title:'产品名称',align:'center',key:'product_title'},
                {title:'产品型号',align:'center',key:'model'},
                {title:'长',align:'center',key:'long'},
                {title:'宽',align:'center',key:'wide'},
                {title:'高',align:'center',key:'high'},
                {title:'单位',align:'center',key:'unit'},
                {title:'左右式',align:'center',width:'100',slot:'leftOrright',},
                {title:'图号',align:'center',width:'150',slot:'img_number',},
                {title:'图纸',align:'center',slot:'up-load',},
                {title:'位置',align:'center'},
                {title:'测量数据',align:'center'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
            logList:[],
            headers:{'Authorization':sessionStorage.getItem('token')},
            currentIndex:0,
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
            let postInfo = JSON.stringify(this.tableData)
            this.axios.post('/api/orders_save_measure',{data:postInfo}).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg);
                }
            })
        },
        getData(id){
            this.axios('/api/orders_measure_product_list',{params:{id:id}}).then(res=>{
                this.tableData = res.data.product;
                this.logList = res.data.detail
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/partsdetails'
            })
        },
        successUpload(event){
            let url = event.data.url;
            this.tableData[this.currentIndex].url = url
        },
        mapRow(n){
            this.currentIndex = n;
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
</style>
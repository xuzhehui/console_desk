<template>
    <div >
        <Toptitle :title='type == 1 ? "新增产品" : (type == 2 ? "编辑产品" : "查看产品") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <div class="product-img">
                <span>产品图片</span>
                <div class="product-add">
                    <div class="items" v-for='(item,index) of info.img' :key="index">
                        <img :src="$store.state.ip+item" alt="">
                        <Icon size='20' @click="delItems(index,info.img)" class="delete-img" type="ios-close-circle" />
                    </div>

                    <div class="add-items">
                        <Icon size='100' type="ios-add" />
                        <span>支持jpg/png格式</span>
                        <input @change="changeIpt" type="file" class="ipt"/>
                    </div>
                </div>
            </div>

            <Form inline style="width:700px;">
                <FormItem label="产品分类">
                    <Select style="width:300px" v-model="info.bp_id">
                        <Option v-for="item of productFiled" :key="item.id" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="型号" >
                    <Input v-model="info.model" style="width:300px" placeholder="请输入产品型号"></Input>
                </FormItem>
                <FormItem label="计量单位" >
                    <Input v-model="info.unit" style="width:300px" placeholder="请输入计量单位"></Input>
                </FormItem>
                <FormItem label="产品名称" >
                    <Input v-model="info.title" style="width:300px" placeholder="请输入产品名称"></Input>
                </FormItem>
            </Form>

            <div class="custom">
                <span class="custom-title">产品自定义属性</span>
                <div class="custom-item" v-for='(item,index) of info.remark' :key="index">
                    <span>属性:</span>
                    <Input v-model="item.style" style="width:150px;"></Input>
                    <span style="margin-left:20px;">属性内容:</span>
                    <Input v-model="item.explain" style="width:300px;"></Input>
                </div>
                <Button style="width:150px;margin:10px 0;" type="primary" @click="openCustom" ghost>新增自定义属性</Button>
            </div>

            <div class="view-filed">
                <span>基础测量字段</span>
                <div class="filed-item">
                    <div v-for='item of measureList' :key="item.id">{{item.title}}({{item.e_title}})</div>
                </div>
            </div>

            <div class="table-log">
                <div>
                    <span>部件添加：</span>
                    <Button type="primary" ghost @click="goPage(1)">新增部件</Button>
                </div>
                <span>计算公式请使用英文字母参与公式运算，详细请参考例)</span>
            </div>

            <Table style="margin-bottom:40px;" stripe border :columns="tableColums" :data="info.part">
                <template slot-scope="{ row,index }" slot="set">
                    <a @click="delItems(index,info.part)" style="color:red;">删除</a>
                </template>
            </Table>

            <Modal class-name="vertical-center-modal" title='新增自定义属性' v-model="showCustom" :width='867'>
                <div class="modal-custom">
                    <div class="modal-custom-item" v-for="(item,index) of info.remark" :key="index">
                        <div class="left">
                            {{'自定义属性:'+(index+1)}}
                        </div>
                        <div class="right">
                            <Input v-model="item.title" style="width:200px;" placeholder="请输入属性名称"></Input>
                            <Input v-model="item.content" style="width:400px;" placeholder="请输入属性内容"></Input>
                        </div>
                        <Icon @click="delItems(index,info.remark)" size='20' class="delete-img" type="ios-close-circle" />
                    </div>
                    <div class="modal-custom-add">
                        <Icon @click="addCustom" size='50' type="ios-add" />
                        <span>添加自定义属性</span>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            addImgList:[],//上传图片列表
            customList:[],//自定义属性列表
            customInfo:{},//自定义属性对象
            productFiled:[],
            measureList:[],//基础测量展示字段(仅展示)
            tableColums:[
                {title:'部件名称',align:'center',key:'part_name'},
                {title:'长(L)',align:'center',key:'formula_l'},
                {title:'宽(W)',align:'center',key:'formula_w'},
                {title:'高(H)',align:'center',key:'formula_h'},
                {title:'产值比例(%)',align:'center',key:'ratio'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            showCustom:false,//
            info:{
                mode:'',//类型
                bp_id:'',//产品类型
                title:'',//名称
                unit:'',//单位
                img:[],//图片列表
                part:[],//部件,
                remark:[],//自定义属性列表
                id:'',
            }
        }
    },
    mounted(){
        this.type = this.$route.query.type||1;
        this.id = this.$route.query.id||null;
        if(this.id){
            this.getData(this.id)
        }
        if(this.$route.params.info){
            this.info = this.$route.params.info
        }
        this.getProductFiledData();
        this.getMeasureList()
    },
    methods:{
        postData(){
            this.type == 1 ? this.info.op = 'add' : this.info.op = 'edit'
            let data = JSON.parse(JSON.stringify(this.info));
            data.img = JSON.stringify(data.img)
            data.part = JSON.stringify(data.part)
            data.remark = JSON.stringify(data.remark)
            this.axios.post('/api/product',data).then(res=>{
                if(res.data.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        },
        back(){
            this.$router.push({
                name:'Products'
            })
        },
        goPage(n,row){
            let id = row ? row.id : ''
            this.$router.push({
                name:'ProductsEditParts',
                params:{
                    info:this.info
                }
            })
        },
        openCustom(){
            this.showCustom = true;
        },
        delItems(n,arr){
            arr.splice(n,1)
        },
        addCustom(){//添加自定义属性
            this.info.remark.push({style:'',explain:''})
        },
        postImg(file){
            let formData = new FormData()
            formData.append('file',file)
            this.axios.post('/api/upload_pic',formData).then(res=>{
                console.log(res)
                this.info.img.push(res.data.url)
            })
        },
        changeIpt(e){
            if(this.info.img.length>=3){
                return this.$Message.warning('图片最多上传3张')
            }
            let file = e.target.files[0];
            this.postImg(file)
            e.target.value = null
        },
        getProductFiledData(){
            this.axios('/api/basics_product_index').then(res=>{
                this.productFiled = res.data;
            })
        },
        getMeasureList(){
            this.axios('/api/basics_measure_index').then(res=>{
                this.measureList = res.data;
                console.log(this.measureList)
            })
        },
        getData(row){
            
            this.axios('/api/product',{params:{id:row}}).then(res=>{
                this.info = res.data;
                this.$loading.hide()
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;}
.product-img{padding-top:10px;}
.product-add{padding:10px 0;display:flex;flex-wrap:wrap;
    .ipt{position:absolute;width:100%;height:100%;opacity:0;cursor: pointer;outline: none;top:0;left:0;}
    .add-items{width:240px;height:240px;border:1px dotted #E7E7E7;border-radius:5px;display: flex;justify-content: center;align-items: center;overflow: hidden;position:relative;flex-direction: column;
        
    }
    .items{width:240px;height:240px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;background:#E7E7E7;margin-right:10px;border-radius:5px;position:relative;
        img{max-width:208px;max-height:208px;;}
        
    }
}
.delete-img{position:absolute;right:10px;top:10px;color:red;}
.custom{display: flex;flex-direction: column;
    .custom-item{display: flex;align-items:center;padding:10px 0;}
}
.table-log{display: flex;justify-content: space-between;align-items: center;padding:10px 0;}
.vertical-center-modal{
    display: flex;
     align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
.modal-custom{width:100%;padding:20px;
    .modal-custom-item{display: flex;height:80px;padding:10px 0;align-items:center;position:relative;
        .left{width:110px;}
        .right{width:100%;background:#DEDEDE;border-radius:5px;display: flex;justify-content: space-around;padding:20px 0;}
    }
    .modal-custom-add{display: flex;justify-content: center;align-items: center;flex-direction: column;height:109px;border:1px dotted #E7E7E7}
}
.view-filed{padding:10px 0;
    .filed-item{padding:10px 0;display:flex;
        div{padding:10px 10px;
            &:after{content:'|';margin-left:20px;color:#DEDEDE;}
            &:last-child{
                &:after{content: '';}
            }
        }
    }
}
</style>
<template>
    <div >
        <Toptitle :title='type == 1 ? "新增产品" : (type == 2 ? "编辑产品" : "查看产品") '>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="handleSubmit('Info')">保存</Button>
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
                        <div class="item">
                            <Icon size='50' type="ios-add" />
                        </div>
                        
                        <span>支持jpg/png格式</span>
                        <input @change="changeIpt($event,info.img)" type="file" class="ipt"/>
                    </div>
                </div>
            </div>

            <div class="product-img">
                <span>图纸</span>
                <div class="product-add">
                    <div class="items" v-for='(item,index) of info.url' :key="index">
                        <img :src="$store.state.ip+item" alt="">
                        <Icon size='20' @click="delItems(index,info.url)" class="delete-img" type="ios-close-circle" />
                    </div>

                    <div class="add-items">
                        <div class="item">
                            <Icon size='50' type="ios-add" />
                        </div>
                        
                        <span>支持jpg/png格式</span>
                        <input @change="changeIpt($event,info.url)" type="file" class="ipt"/>
                    </div>
                </div>
            </div>

            <Form inline ref='Info' :model="info" :rules='rules'>
                <FormItem label="产品分类" prop='bp_id'>
                    <Select style="width:300px" v-model="info.bp_id" @on-change="changeProduct">
                        <Option v-for="item of productFiled" :key="item.id" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="型号" prop='model'>
                    <Input v-model="info.model" style="width:300px" placeholder="请输入产品型号"></Input>
                </FormItem>
                <FormItem label="计量单位" prop='unit'>
                    <Input v-model="info.unit" style="width:300px" placeholder="请输入计量单位"></Input>
                </FormItem>
                <FormItem label="产品名称" prop='title'>
                    <Input v-model="info.title" style="width:300px" placeholder="请输入产品名称"></Input>
                </FormItem>
                <FormItem label="图号" prop='title'>
                    <Input v-model="info.url_number" style="width:300px" placeholder="请输入图号"></Input>
                </FormItem>
                <FormItem label="是否加锁">
                    <div style="display:flex;min-width:300px;">
                        <RadioGroup v-model="info.lucy_type">
                            <Radio :label="1">是</Radio>
                            <Radio :label="0">否</Radio>
                        </RadioGroup>

                        <Select v-model="info.luck" v-if="info.lucy_type == 1" style="width:150px;">
                            <Option v-for="item of lucks" :key="item.id" :value='item.id'>{{item.title }}</Option>
                        </Select>
                    </div>
                </FormItem>
            </Form>

            <div class="custom">
                <span class="custom-title">产品自定义属性
                    <Button style="margin:10px;margin-left:20px;" size='small' type="primary" @click="addCustom" ghost>
                        新增自定义属性
                    </Button>
                </span>
                <div class="modal-custom">
                    <div class="modal-custom-item" v-for="(item,index) of info.remark" :key="index">
                        <div class="left">
                            {{'自定义属性:'+(index+1)}}
                        </div>
                        <div class="right">
                            <div class="radio">
                                <RadioGroup v-model="item.type">
                                    <Radio :label="1">输入框</Radio>
                                    <Radio :label="2">单选框</Radio>
                                </RadioGroup>
                            </div>

                            <div class="attr">
                                <Input v-model="item.title" style="width:180px;" placeholder="请输入属性名称"></Input>
                                <Input v-if="item.type == 1" v-model="item.content" style="width:360px;" placeholder="请输入属性内容"></Input>
                                <Select v-else style="width:360px;" v-model="item.content">
                                    <Option :value='1'>是</Option>
                                    <Option :value="0">否</Option>
                                </Select>
                            </div>
                            
                        </div>
                        <Icon @click="delItems(index,info.remark)" size='20' class="delete-img" type="ios-close-circle" />
                    </div>
                </div>
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
                    <Button type="primary" size='small' ghost @click="addPart">新增部件</Button>
                </div>
                <span>计算公式请使用英文字母参与公式运算，详细请参考例)</span>
            </div>

            <Table  class="overflow-table" style="margin-bottom:40px;" stripe border :columns="tableColums" :data="info.part">
                <template slot='title' slot-scope='{index}'>
                    <div>
                        <Select clearable v-model="info.part[index].part_id">
                            <Option v-for="(item,key) of parts" :key="key" :value='item.id' :label="item.title"></Option>
                        </Select>
                    </div>
                </template>
                <template slot='formula_l' slot-scope='{index}'>
                    <div>
                        <Input @on-focus="openKey(index,'formula_l')" clearable placeholder="请在输入公式" v-model="info.part[index].formula_l"></Input>
                    </div>
                </template>
                <template slot='formula_w' slot-scope='{index}'>
                    <div>
                        <Input @on-focus="openKey(index,'formula_w')" clearable placeholder="请在输入公式" v-model="info.part[index].formula_w"></Input>
                    </div>
                </template>
                <template slot='formula_h' slot-scope='{index}'>
                    <div>
                        <Input @on-focus="openKey(index,'formula_h')" clearable placeholder="请在输入公式" v-model="info.part[index].formula_h"></Input>
                    </div>
                </template>
                <template slot='ratio' slot-scope='{index}'>
                    <div>
                        <Input clearable placeholder="请输入产值比例" v-model="info.part[index].ratio"></Input>
                    </div>
                </template>
                <template slot='del' slot-scope='{index}'>
                    <div>
                        <a @click="delPart(info.part,index)">删除</a>
                    </div>
                </template>
            </Table>
            <Modal v-model="showKey" :width="1250" :mask-closable='false' :closable='false'>
                <div>
                    <KeyBoard :rightData='measureList' @cancel='successKey' @success='successKey' class='key-co'/>
                </div>
                <div slot='footer'></div>
            </Modal>
        </div>
    </div>
</template>

<script>
import KeyBoard from '../../components/keyboard/index'
import {mapState,mapMutations} from 'vuex'
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
            lucks:[],
            tableColums:[
                {title:'部件名称',align:'center',key:'title',slot:'title'},
                {title:'长(L)',align:'center',key:'formula_l',slot:'formula_l'},
                {title:'宽(W)',align:'center',key:'formula_w',slot:'formula_w'},
                {title:'高(H)',align:'center',key:'formula_h',slot:'formula_h'},
                {title:'产值比例(%)',align:'center',key:'ratio',slot:'ratio'},
                {title:'操作',align:'center',slot:'del'}
            ],
            showCustom:false,//
            info:{
                model:'',//类型
                bp_id:'',//产品类型
                title:'',//名称
                unit:'',//单位
                img:[],//图片列表
                part:[],//部件,
                remark:[],//自定义属性列表
                lock:0,
                lucy_type:0,
                id:'',
                url:[],
                url_number:'',
            },
            rules:{
                bp_id:[
                    {required: true,message:' ',}
                ],
                model:[
                    {required: true,message:' ',trigger:'blur'}
                ],
                title:[
                    {required: true,message:' ',trigger:'blur'}
                ],
                unit:[
                    {required: true,message:' ',trigger:'blur'}
                ],
            },
            addObj:{
                title:'',
                formula_l:'',
                formula_w:'',
                formula_h:'',
                ratio:'',
                url:'',
                url_number:'',
            },
            parts:[],
            showKey:false,
            attrindex:null,
            attrName:'',
            headers:{'Authorization':localStorage.getItem('token')},
        }
    },
    mounted(){
        this.getPartsData(this.$route.query.back_id)
        this.type = this.$route.query.type||1;
        this.id = this.$route.query.id||null;
        this.info.bp_id = this.type == 1 ?  this.$route.query.back_id*1 : this.info.bp_id;
        if(this.id){
            this.getData(this.id)
        }
        this.getProductFiledData();
        this.changeProduct(this.$route.query.back_id)
        this.getLocks()
    },
    components:{
        KeyBoard,
    },
    methods:{
        postData(){
            this.type == 1 ? this.info.op = 'add' : this.info.op = 'edit'
            let data = JSON.parse(JSON.stringify(this.info));
            data.img = JSON.stringify(data.img)
            data.url = JSON.stringify(data.url)
            data.part = JSON.stringify(data.part)
            data.remark = JSON.stringify(data.remark)
            this.axios.post('/api/product',data).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/cms/product/index',
                            query:{
                                title:this.$route.query.title||this.$route.params.title,
                                id:this.$route.query.back_id||this.$route.params.back_id
                            },
                        })
                    },500)   
                }
            })
        },
        back(){
            this.$router.push({
                path:'/cms/product/index',
                query:{
                    id:this.$route.query.back_id ? this.$route.query.back_id : '',
                    title:this.$route.query.title||this.$route.query.title||''
                }
            })
        },
        goPage(n,row){
            this.$router.push({
                name:'PageEdit',
                params:{
                   title:this.info.part.length>=1 ? '编辑部件' : '新增部件',
                   list:this.list,
                   type:'部件'
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
            if(!this.info.remark){
                this.info.remark = [];
            }
            this.info.remark.push({title:'',content:'',type:1})
        },
        postImg(file,row){
            let formData = new FormData()
            formData.append('file',file)
            this.axios.post('/api/upload_pic',formData).then(res=>{
                row.push(res.data.url)
            })
        },
        changeIpt(e,row){
            if(this.info.img.length>=3){
                return this.$Message.warning('图片最多上传3张')
            }
            let file = e.target.files[0];
            this.postImg(file,row)
            e.target.value = null
        },
        getProductFiledData(id){
            this.axios('/api/basics_product_index').then(res=>{
                this.productFiled = res.data.data;
            });
        },
        getData(row){
            this.axios('/api/product',{params:{id:row}}).then(res=>{
                this.info = res.data;
                if(!this.info.url){
                    this.info.url = []
                }
            })
        },
        getPartsData(id){
            this.axios('/api/parts_index',{params:{bp_id:id}}).then(res=>{
                this.parts = res.data.data;
            })
        },
        addPart(){
            let add = JSON.parse(JSON.stringify(this.addObj))
            this.info.part.push(add)
        },
        delPart(row,n){
            row.splice(n,1)
        },
        openKey(row,attr){
            this.showKey = true;
            this.attrindex = row;
            this.attrName = attr;
        },
        successKey(str){
            this.info.part[this.attrindex][this.attrName] = str;
            this.showKey = false;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        changeProduct(e){
            this.axios('/api/basics_product_list',{params:{id:e}}).then(res=>{
                if(res.code==200){
                    this.productFiled = res.data;
                    this.measureList = res.data[0].measure
                }
            });
            this.getPartsData(e)
        },
        uploadSuccess(e){
            this.info.url = e.data.url;
        },
        getLocks(){
            this.axios('/api/lock_list').then(res=>{
                if(res.code == 200){
                    this.lucks = res.data;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;}
.product-img{padding-top:10px;}
.product-add{padding:10px 0;display:flex;flex-wrap:wrap;
    .ipt{position:absolute;width:100%;height:100%;opacity:0;cursor: pointer;outline: none;top:0;left:0;}
    .add-items{width:120px;height:120px;border:1px dotted #E7E7E7;
    border-radius:5px;display: flex;justify-content: center;align-items: center;overflow: hidden;position:relative;flex-direction: column;background:#F4F5F7;
        .item{width:46px;height:46px;background:#3764FF;opacity: .6;display: flex;justify-content: center;align-items: center;border-radius:50%;color:#fff;}
    }
    .items{width:120px;height:120px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;background:#E7E7E7;margin-right:10px;border-radius:5px;position:relative;
        img{max-width:108px;max-height:108px;;}
        
    }
}
.delete-img{position:absolute;right:10px;top:10px;color:red;}
.custom{display: flex;flex-direction: column;
    .custom-item{display: flex;align-items:center;padding:10px 0;}
}
.table-log{display: flex;justify-content: space-between;align-items: center;padding:10px 0;}
.modal-custom{width:100%;padding:10px 0;display:flex;flex-wrap: wrap;
    .modal-custom-item{width:600px;align-items:center;position:relative;border-radius:5px;margin-right:20px;margin-bottom:20px;
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
        border-color: transparent;
        position: relative;
        .left{width:100%;padding:10px;background:#F4F8FF;}
        .right{width:100%;border-radius:5px;;padding:10px;
            .attr{display: flex;justify-content: space-between;margin:5px;}
        }
    }
    .modal-custom-add{display: flex;justify-content: center;align-items: center;flex-direction: column;height:109px;border:1px dotted #E7E7E7;margin-top:10px;}
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
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
// .key-co{transform: scale(.9);}
</style>
<template>
  <div>
        <Toptitle :title='$route.query.type == 1 ? "新增订单" : "编辑订单"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="handleSubmit('infoOrder')">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form ref='infoOrder' inline :label-width="100" :model="info" style="padding:10px 0;" :rules="infoRules">
                <FormItem label="订单类型:" prop='renovation_type'>
                    <RadioGroup v-model="info.renovation_type" class="auto-width">
                        <Radio :label="1">楼栋(工装)</Radio>
                        <Radio :label="2">单户(家装)</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="订单编号:">
                    <Input disabled v-model="info.order_no" class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="小区名称:" prop='residential_name'>
                    <Input v-model="info.residential_name" class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="客户姓名:" prop='client_name'>
                    <Input v-model="info.client_name" class="auto-width" placeholder="请输入客户姓名"></Input>
                </FormItem>

                <FormItem label="紧急程度:" prop='warning_state'>
                    <Select class="auto-width" v-model="info.warning_state">
                        <Option label='不急' :value='0'></Option>
                        <Option label='比较急' :value='1'></Option>
                        <Option label='紧急' :value='2'></Option>
                        <Option label='非常急' :value='3'></Option>
                    </Select>
                </FormItem>

                <FormItem label="业务员:">
                    <Select disabled v-model="info.salesman" class="auto-width"></Select>
                </FormItem>

                <FormItem label="收款:" prop='pay_state'>
                    <RadioGroup v-model="info.pay_state" class="auto-width">
                        <Radio :label="0">未收款</Radio>
                        <Radio :label="1">已收款</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="详细地址:" prop='address'>
                    <Input v-model="info.address" class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="手机号:" prop='mobile'>
                    <Input v-model="info.mobile" class="auto-width" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="开始日期:" prop='start_time'>
                    <DatePicker v-model="info.start_time" type="date" placeholder="开始日期" class="auto-width"></DatePicker>
                </FormItem>

                <FormItem label="交付日期:" prop='end_time'>
                    <DatePicker v-model="info.end_time" type="date" placeholder="交付日期" class="auto-width"></DatePicker>
                </FormItem>

                <FormItem label="产品总价:">
                    <Input disabled v-model="info.predict_price" class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="预估工期:">
                    <Input disabled v-model="info.predict_working" class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="预估交付日期:">
                    <Input disabled v-model="info.predict_time" class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="订单备注:">
                    <Input v-model="info.remark" class="auto-width" placeholder="请输入订单备注"></Input>
                </FormItem>
            </Form>
            <div class="items" v-for="(item,index) of info.house" :key="index">
                <div class="items-header">
                    <div class="header-left">
                        <Badge :count="index+1" type="primary"></Badge>
                        <span>户型{{index+1}}</span>
                    </div>
                    <div class="header-right">
                        <Button v-if="index<1" type="success" style="margin-right:10px;" ghost shape="circle" @click="addHours(info.house)">添加</Button>
                        <Button v-if="index>0" type="error" ghost shape="circle" @click="delItems(info.house,index)">删除</Button>
                    </div>
                </div>

                <div class="form-item">
                    <Form inline :label-width="80">
                        <FormItem label="楼幢(楼号)">
                            <Input v-model="item.house" placeholder="请输入楼幢(楼号)"></Input>
                        </FormItem>

                        <FormItem label="楼单元">
                            <Input v-model="item.unit" placeholder="请输入楼单元"></Input>
                        </FormItem>

                        <FormItem label="楼层">
                            <Input v-model="item.layer" placeholder="请输入楼层"></Input>
                        </FormItem>

                        <FormItem label="房间号">
                            <Input v-model="item.number" placeholder="请输入房间号"></Input>
                        </FormItem>

                        <FormItem label="选择产品">
                            <Button @click="selectProducts(1,item)" type="primary" style="margin-right:10px;" ghost>选择产品</Button>
                            <span>(已选2，点击按钮可再次编辑)</span>
                        </FormItem>
                    </Form>
                </div>

                <div class="items-table">
                    <Table :style="'width:'+tableWidth+'px'" border :columns="tableColumns" :data="item.product">
                        <template slot='img_number' slot-scope='{row,index}'>
                            <div>
                                <Input placeholder="请输入图号" @on-change="changeS(row,item,index)" v-model="row.url_number"></Input>
                            </div>
                            
                        </template>
                        <template slot='set' slot-scope='row'>
                            <div>
                                <Icon @click="selectProducts(2,item)"  size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                                <Icon @click="selectProducts(3,item)" size='20' style="margin-right:10px;color:#32C800;cursor:pointer" type="ios-paper-outline" />
                                <Icon @click="delItems(row.row)"  size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                            </div>
                        </template>
                    </Table>
                </div>
            </div>
            <div class="original-part">
                <Table border :span-method="handleSpan" :columns="originalTableColumns" :data="originalData">

                </Table>
            </div>
        </div>

        

        <Modal :width="1200" class-name="vertical-center-modal" title="选择产品" v-model="showProduct" @on-ok="tapProduct">
            <div class="modal-items" v-for="(item,idx) in modalArray" :key="idx">
                <Form inline :label-width="80">
                    <FormItem label="选择产品">
                        <Select size='small' :disabled='productType == 3 ? true : false' v-model="item.product_id" @on-change='changeProduct($event,idx)' style="width:186px;">
                            <Option v-for="item of productList" :tag='item.img_url' :key="item.id" :label="item.title" :value='item.id'></Option>
                        </Select>
                    </FormItem>

                    <FormItem label="产品图">
                        <img v-if="item.img" style="max-width:50px;max-height:50px;"  :src="$store.state.ip+item.img">
                    </FormItem>

                    <FormItem label="产品价格">
                        <span>{{item.price}}</span>
                    </FormItem>

                    <FormItem label="议价">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.real_price" placeholder="请输入议价"></Input>
                    </FormItem>
                    <FormItem label="长">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.long" placeholder="请输入长"></Input>
                    </FormItem>
                    <FormItem label="宽">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.wide" placeholder="请输入宽"></Input>
                    </FormItem>
                    <FormItem label="高">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.high" placeholder="请输入高"></Input>
                    </FormItem>
                    <FormItem label="计量单位">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.unit" placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="位置">
                        <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.position" placeholder="请输入位置"></Input>
                    </FormItem>
                    <FormItem label="左右式">
                        <Select size='small' :disabled='productType == 3 ? true : false' style="width:186px;" v-model="item.type">
                            <Option label='左式' :value='1'></Option>
                            <Option label='右式' :value='2'></Option>
                        </Select>
                    </FormItem>
                </Form>
                <Table stripe border :columns="item.part_top" :data="item.product">
                    <template slot='set' slot-scope='{row,index}'>
                        <div>
                            <Select :disabled='productType == 3 ? true : false' v-model="row.route_id" @on-change="changeSelect($event,item,row,index)">
                                <Option v-for="_item of row.child" :key="_item.id" :value='_item.id' :label="_item.title"></Option>
                            </Select>
                        </div>
                    </template>
                </Table>

                <div class="modal-footer-button">
                    <Button v-if="idx<1" @click="addParts(item)" type="success" style="margin-right:10px;" ghost shape="circle">添加</Button>
                    <Button v-if="idx>0" @click="delItems(modalArray,idx)" type="error" ghost shape="circle">删除</Button>
                </div>
            </div>

            <div slot="footer">
                <Button @click="cancelModal">取消</Button>
                <Button @click="saveParts" type="primary">确定</Button>
            </div>
        </Modal> 
    
  </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:this.$route.query.id,
            modalArray:[],
            productList:[],
            tableWidth:null,
            currentIndex:null,
            proxyObj:{},
            productType:1,
            originalTableColumns:[
                {title:'原材料名称',align:'center',key:'title'},
                {title:'原材料库存',align:'center',key:'stock'},
                {title:'所需原材料数量',align:'center',key:'num'},
                {title:'原材料单价',align:'center',key:'price'},
                {title:'规格型号',align:'center'},
                {title:'原材料单位',align:'center',key:'unit'},
                {title:'原材料预估费用',align:'center',key:'num_price'},
            ],
            originalData:[],
            tableColumns:[
                {title:'产品类型',align:'center',key:'product_id',width:'100',fixed:'left'},
                {title:'指导价格(元)',align:'center',key:'price',width:'120'},
                {title:'议价(元)',align:'center',key:'real_price',width:'100'},
                {title:'产品名称',align:'center',key:'title',width:'150'},
                {title:'长',align:'center',key:'long',width:'100'},
                {title:'宽',align:'center',key:'wide',width:'100'},
                {title:'高',align:'center',key:'high',width:'100'},
                {title:'产品型号',align:'center',key:'model',width:'100'},
                {title:'测量数据',align:'center',key:'',width:'100'},
                {title:'位置',align:'center',key:'position',width:'100'},
                {title:'图号',align:'center',key:'url_number',width:'150',slot:'img_number',},
                {title:'图纸',align:'center',key:'',width:'80',

                    render(h,params){
                        return h('Upload',{
                            props:{
                                'show-upload-list':false,        
                                headers:{'Authorization':localStorage.getItem('token')},
                                'on-success':(e)=>{
                                    let src = e.data.url;
                                    params.row.url = src;
                                    return h('img',{
                                        attrs:{
                                            src:'http://121.41.102.225:82'+params.row.url,
                                            style:'max-width:50px;max-height:50px;position:relative;top:5px;'
                                        },
                                    })
                                }
                            },
                            attrs:{
                                action:`http://121.41.102.225:82/api/upload_pic`
                            },
                        },[
                            params.row.url ? h('img',{
                                attrs:{
                                    src:'http://121.41.102.225:82'+params.row.url,
                                    style:'max-width:50px;max-height:50px;position:relative;top:5px;'
                                },
                            }) : h('a',{
                                attrs:{
                                    style:'position:relative;'
                                }
                            },'上传')
                        ])
                    }
                },
                {title:'预估工期',align:'center',key:'',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            showProduct:false,
            infoRules:{
                residential_name:[{required: true,message:' ',trigger:'blur'}],
                client_name:[{required: true,message:' ',trigger:'blur'}],
                warning_state:[{required: true,message:' '}],
                pay_state:[{required: true,message:' '}],
                address:[{required: true,message:' ',trigger:'blur'}],
                mobile:[{required: true,message:' ',trigger:'blur'}],
                start_time:[{required: true,message:' '}],
                end_time:[{required: true,message:' '}],  
                renovation_type:[{required: true,message:' '}]
            },
            info:{
                residential_name:'',//小区名称
                order_no:'',//订单号
                renovation_type:null,//订单类型
                client_name:'',//客户名称
                address:'',//
                mobile:'',//手机号
                start_time:'',//开始时间
                end_time:'',//结束时间
                pay_state:'',//是否支付
                warning_state:0,//是否紧急
                predict_time:'',//预估交付日期
                salesman:null,//业务员
                predict_price:null,//预估工价,
                predict_working:null,//预估工期
                
                house:[
                    {
                        house:null,
                        unit:null,
                        layer:null,
                        number:null,
                        product:[
                            {
                                product_id:null,
                                price:'',
                                real_price:'',
                                long:'',
                                wide:'',
                                high:'',
                                type:null,
                                unit:'',
                                img:'',
                                model:'',
                                url_number:'',
                                url:'',
                                route_id:'',
                            }
                        ],
                    },
                ]
            },
        }
    },
    created(e){
        this.tableWidth = window.innerWidth-300;
        
    },
    destroyed(){
    },
    mounted(){
        this.type = this.$route.query.type
        if(this.id){
            this.getDate(this.id)
        }
        this.getProducts()
        window.addEventListener('resize',(e)=>{this.tableWidth = e.target.innerWidth - 300;this.$forceUpdate()})
        
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){
            let sendData = JSON.parse(JSON.stringify(this.info));
            let op = this.type == 1 ? 'add' : 'edit';
            try{
                sendData.start_time = new Date(sendData.start_time).toLocaleDateString().replace(/\//g,"-")
                sendData.end_time = new Date(sendData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            sendData.house.map(v=>{
                v.product.map(k=>{
                    if(k.part_top){
                        delete k.part_top
                    }
                    k.product.map(t=>{
                        for(let i in t){
                            i == 'route_id' ? '' : delete t[i]
                        }
                    })
                })
            })
            let params = {op:op,detail:sendData}
            console.log(params)
            this.axios.post('/api/order_save',params).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.back()
                }
            })
        },
        getDate(id){
            this.axios('/api/order_detail',{params:{id:id}}).then(res=>{
                this.info = res.data;
                this.tapProduct()
            })
        },
        selectProducts(n,row){
            this.productType = n;
            this.showProduct = true;
            this.proxyObj = row;
            this.modalArray = row.product;
        },
        delItems(row,n){
            row.splice(n,1)
        },
        addHours(row){
            row.push({
                house:null,
                unit:null,
                layer:null,
                number:null,
                product:[
                    {
                        
                    }
                ],
            })
        },
        getProducts(){
            this.axios('/api/product').then(res=>this.productList = res.data.data)
        },
        changeProduct(row,n){
            
            this.axios('/api/order_product_detail',{params:{id:row}}).then(res=>{
                console.log(res)
                if(res.code == 200){
                    let data = res.data.product;
                    for(let i in data){
                        if(i!='product_id'){
                            this.modalArray[n][i] = data[i]
                        }
                    }
                    this.modalArray[n].part_top = res.data.part_top;
                    this.modalArray[n].product = res.data.list;
                    this.$forceUpdate()
                }
            })
        },
        addParts(row){
            this.modalArray.push({
                product_id:null,
                price:'',
                real_price:'',
                long:'',
                wide:'',
                high:'',
                type:null,
                unit:'',
                img:'',
            })
        },
        changeSelect(e,item,row,n){
            this.axios('/api/parts_routes_detail',{params:{product_id:item.product_id,route_id:e}}).then(res=>{
                for(let i in res.data){
                    if(i!='route_id'){
                        row[i] = res.data[i]
                        item.product[n][i] = res.data[i]
                    }else{
                        item.product[n]['route_id'] = e
                    }
                    
                }
                this.$forceUpdate()
            })

        },
        saveParts(){
            this.proxyObj.product = this.modalArray;
            this.showProduct = false;
            this.tapProduct()
            
        },
        cancelModal(){
            this.showProduct = false;
        },
        changeS(row,sign,n){
            sign.product[n] = row;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        tapProduct(){
            let str = [];
            this.info.house.map(v=>{
                v.product.map(k=>{
                    console.log(k)
                    if(k.product_id){
                        str.push(k.product_id)
                    }
                })
            })
            this.axios('/api/house_detail_material',{params:{product_id:str.length>=1 ? str.join(',') : ''}}).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.originalData = res.data.data;
                    this.originalData.push({end:true,stock:res.data.num,title:'合计'})
                }
            })
        },
        handleSpan ({ row, column, rowIndex, columnIndex }) {
            if(row.end){
                return [1,6]
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;padding-bottom: 20px;;}
.auto-width{width:200px;}
.items{box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;position: relative;border-radius:5px;margin-top:20px;
    .items-header{padding:10px 20px;display:flex;justify-content: space-between;align-items: center;border-bottom:1px solid #F4F4F4;
        .header-left{span{margin-left:10px;}}
    }
    .form-item{padding:20px;}
}
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
.modal-items{border-radius:5px;border:1px solid #DEDEDE;padding:20px;}
.modal-footer-button{display: flex;justify-content:flex-end;padding:10px 0;}
.items-table{width:100%;overflow-x: scroll;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
.original-part{padding-top:20px;}
</style>
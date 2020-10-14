<template>
  <div>
        <Toptitle :title='$route.query.type == 1 ? "新增订单" : "编辑订单"'>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="handleSubmit('infoOrder')">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <!-- 表单项 -->
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
                    <Select clearable class="auto-width" v-model="info.warning_state">
                        <Option label='不急' :value='0'></Option>
                        <Option label='比较急' :value='1'></Option>
                        <Option label='紧急' :value='2'></Option>
                        <Option label='非常急' :value='3'></Option>
                    </Select>
                </FormItem>

                <FormItem label="业务员:">
                    <Select clearable filterable v-model="info.salesman" class="auto-width">
                        <Option v-for="item of users" :key="item.id" :label="item.nickname" :value="item.id"></Option>
                    </Select>
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

            <!-- 户型选择 -->
            <div class="items" v-for="(item,index) of info.house" :key="index">
                <div class="items-header">
                    <div class="header-left">
                        <Badge :count="index+1" type="primary"></Badge>
                        <span>户型{{index+1}}</span>
                    </div>
                    <div class="header-right">
                        <Button v-if="index == info.house.length-1" type="success" style="margin-right:10px;" ghost shape="circle" @click="addHours(info.house)">添加</Button>
                        <Button v-if="index<info.house.length-1" type="error" ghost shape="circle" @click="delItems(info.house,index)">删除</Button>
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
                            <span>(已选{{item.product.length||0}}，点击按钮可再次编辑)</span>
                        </FormItem>
                    </Form>
                </div>

                <div class="items-table">
                    <Table :style="'width:'+tableWidth+'px'" border :columns="item.product_top" :data="item.product">
                        <template slot='url' slot-scope='{row}'>
                            <div>
                               <img style="max-width:50px;max-height:50px;" v-if="row.url" :src="$store.state.ip+row.url" alt="">
                            </div>
                        </template>
                        <template slot='set' slot-scope='{index}'>
                            <div class="table-set">
                                <svg style="font-size:20px" color='#3764FF'  @click="selectProducts(2,item,index)" class="icon icon-nav" aria-hidden="true">
                                    <use xlink:href="#iconbianji"></use>
                                </svg>

                                <svg style="font-size:20px" color='green' @click="selectProducts(3,item,index)" class="icon icon-nav" aria-hidden="true">
                                    <use xlink:href="#iconxiangqing"></use>
                                </svg>

                                <svg  @click="delItems(item.product,index)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                                    <use xlink:href="#iconshanchu"></use>
                                </svg>
                            </div>
                        </template>
                    </Table>
                </div>
            </div>
            <!-- 原材料 -->
            <div class="original-part">
                <Table border :span-method="handleSpan" :columns="originalTableColumns" :data="originalData">

                </Table>
            </div>
        </div>

        
        <!-- 选择产品弹层 -->
        <Modal :width="1200" class-name="vertical-center-modal" title="选择产品" v-model="showProduct" @on-ok="tapProduct">
            <div class="modal-scroll">
                <div class="modal-items" v-for="(item,idx) in modalArray" :key="idx">
                    <Form inline >
                        <FormItem label="选择产品">
                            <Select filterable clearable label-in-value size='small' :disabled='productType == 3 ? true : false' v-model="item.product_id" @on-change='changeProduct($event,idx)' style="width:186px;">
                                <Option v-for="item of productList" :tag='item.img_url' :key="item.id" :label="item.title" :value='item.id'></Option>
                            </Select>
                        </FormItem>

                        <FormItem label="议价(元)">
                            <Input type="number" size='small' :disabled='productType == 3 ? true : false' v-model="item.real_price" placeholder="请输入议价"></Input>
                        </FormItem>
                        <FormItem label="计量单位">
                            <Input size='small' disabled v-model="item.unit" placeholder="请输入计量单位"></Input>
                        </FormItem>
                        <FormItem label="位置">
                            <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.position" placeholder="请输入位置"></Input>
                        </FormItem>
                        <FormItem label='图号'>
                            <Input v-model="item.url_number" :disabled='productType == 3 ? true : false' size="small" placeholder="请输入图号"></Input>
                        </FormItem>
                        <FormItem label='上传图纸'>
                            <Upload :disabled='productType == 3 ? true : false'  :headers="headers" :on-success='successUpload' :show-upload-list='false' :action="$store.state.ip+'/api/upload_pic'">
                                <Button size='small' v-if="!item.url" @click="mapRow(idx)" icon="ios-cloud-upload-outline">上传</Button>
                                <img @click="mapRow(idx)" style="max-width:30px;max-height:30px;position:relative;top:3px" v-if="item.url" :src="$store.state.ip+item.url" alt="">
                            </Upload>
                        </FormItem>

                        <FormItem v-for="(measuring,measuring_key) in item.measuring" :label="measuring.title" :key="measuring_key+11">
                            <Input :disabled='productType == 3 ? true : false' :placeholder="'请输入'+measuring.title" size='small' v-model="item[measuring.key]"/>
                        </FormItem>

                        <FormItem v-for="(outh,outh_key) in item.outh" :label="outh.title" :key="outh_key+21">
                            <a v-if="outh.key=='img'" target="_blank" :href="$store.state.ip+outh.value">
                                <img  style="max-width:30px;max-height:30px;top:0px;position:relative;cursor:pointer;"  :src="$store.state.ip+outh.value">
                            </a>
                            <Input v-if="outh.key!='img'" disabled placeholder="自动生成" size='small' v-model="outh.value"/>
                        </FormItem>

                        <FormItem v-for="(remake,remake_key) in item.product_remake" :label="remake.title" :key="remake_key+31">
                            <Input  placeholder="请输入" size='small' v-model="item[remake.title]"/>
                        </FormItem>

                    </Form>
                    <Table stripe border :columns="item.parts_top" :data="item.parts">
                        <template slot='set' slot-scope='{row,index}'>
                            <div>
                                <Select :disabled='productType == 3 ? true : false' v-model="row.route_id" @on-change="changeSelect($event,item,row,index)">
                                    <Option v-for="_item of row.child" :key="_item.id" :value='_item.id' :label="_item.title"></Option>
                                </Select>
                            </div>
                        </template>
                    </Table>

                    <div class="modal-footer-button">
                        <Button v-if="idx == modalArray.length-1" @click="addParts(item)" type="success" style="margin-right:10px;" ghost shape="circle">添加</Button>
                        <Button v-if="idx<modalArray.length-1" @click="delItems(modalArray,idx)" type="error" ghost shape="circle">删除</Button>
                    </div>
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
        const validateMobile = function(rule,value,fn){
            if(!(/^1[3456789]\d{9}$/.test(value))){ 
                fn(new Error(' '))
                return false
            }
            fn()
        };
        return {
            type:1,
            id:this.$route.query.id,
            modalArray:[],
            productList:[],
            tableWidth:null,
            currentIndex:null,
            proxyObj:{},
            _proxyObj:{},
            productType:1,
            partTableColumns:[],
            users:[],
            headers:{'Authorization':localStorage.getItem('token')},
            originalTableColumns:[
                {title:'原材料名称',align:'center',key:'title'},
                {title:'原材料库存',align:'center',key:'stock'},
                {title:'所需原材料数量',align:'center',key:'num'},
                {title:'原材料单价',align:'center',key:'price'},
                {title:'规格型号',align:'center'},
                {title:'原材料单位',align:'center',key:'unit'},
                {title:'原材料预估费用',align:'center',key:'num_price'},
            ],
            Top:[],
            originalData:[],
            tableColumns:[
                {title:'产品类型',align:'center',key:'product_type',minWidth:100,fixed:'left'},
                {title:'产品名称',align:'center',key:'title',minWidth:150},
                {title:'产品型号',align:'center',key:'model',minWidth:100},
                {title:'测量数据',align:'center',key:'',minWidth:100},
                {title:'位置',align:'center',key:'position',minWidth:100},
                {title:'图纸',align:'center',minWidth:80,key:'url',slot:'url'},
                {title:'图号',align:'center',key:'url_number',minWidth:150},
                {title:'指导价格(元)',align:'center',key:'price',minWidth:150},
                {title:'议价(元)',align:'center',key:'real_price',minWidth:100},
                {title:'预估工期',align:'center',key:'limit_time',minWidth:200},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            showProduct:false,
            infoRules:{
                residential_name:[{required: true,message:' ',trigger:'blur'}],
                client_name:[{required: true,message:' ',trigger:'blur'}],
                warning_state:[{required: true,message:' '}],
                pay_state:[{required: true,message:'请选择'}],
                address:[{required: true,message:' ',trigger:'blur'}],
                mobile:[{required: true,validator: validateMobile, trigger: 'blur'}],
                start_time:[{required: true,message:' '}],
                end_time:[{required: true,message:' '}],  
                renovation_type:[{required: true,message:'请选择订单类型'}]
            },
            info:{
                residential_name:'',//小区名称
                order_no:'',//订单号
                renovation_type:1,//订单类型
                client_name:'',//客户名称
                address:'',//
                mobile:'',//手机号
                start_time:'',//开始时间
                end_time:'',//结束时间
                pay_state:'',//是否支付
                warning_state:0,//是否紧急
                predict_time:'',//预估交付日期
                salesman:this.$store.state.userInfo.id||null,//业务员
                predict_price:null,//预估工价,
                predict_working:null,//预估工期
                remark:'',
                house:[
                    {
                        house:null,
                        unit:null,
                        layer:null,
                        number:null,
                        product_top:[],
                        product:[
                            {
                                product_id:null,
                                product_name:'',
                                price:'',
                                real_price:'',
                                long:'',
                                width:'',
                                high:'',
                                type:null,
                                unit:'',
                                img:'',
                                model:'',
                                url_number:'',
                                url:'',
                                route_id:'',
                                limit_time:null,

                                parts:[
                                    {

                                    }
                                ]
                            }
                        ],
                    },
                ]
            },
        }
    },
    
    created(e){
        this.tableWidth = window.innerWidth-300;
        this.getUsers()
        this.type = this.$route.query.type
        
    },
    destroyed(){
    },
    mounted(){
        if(this.id){
            if(this.id){
                this.info = {}
            }
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
            let params = {op:op,detail:sendData}
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
        selectProducts(n,row,q){
            this.productType = n;
            this.showProduct = true;
            this.proxyObj = row;
            this.modalArray = JSON.parse(JSON.stringify(row.product));
            this.modalArray.map((v,i)=>{
                v.value = v.product_id||this.productList[0].id;
                v.parts = []
                this.changeProduct(v,0,1)
                setTimeout(()=>v.parts = row.product[i].parts)
            })
            if(this.partTableColumns){
                this.modalArray.map(v=>v.parts_top = this.partTableColumns)
            }
            
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
        changeProduct(row,n,ext){
            let id = row ? row.value : this.productList[0].id
            this.axios('/api/order_product_detail',{params:{id:id}}).then(res=>{
                let _this = this;
                let modalData = this.modalArray[n]
                modalData.product_type = res.data.detail.product_type||''
                modalData.unit = res.data.detail.unit||''
                modalData.model = res.data.detail.model || ''
                if(res.code == 200){
                    if(!ext){
                        if(row){modalData.title = row.label||''}
                        modalData.measuring = res.data.measuring;
                        modalData.outh = res.data.outh;
                        modalData.product_remake = res.data.product_remake;
                        this.Top = res.data.product_top;
                    }else{
                        this.Top = res.data.product_top;
                    }
                    modalData.parts_top = res.data.intermediate.parts_top
                    if(this.func.isType(res.data.intermediate.parts)!='Array'){
                        return this.$Message.error('parts must be Array got Object')
                    }
                    if(!ext){
                        res.data.intermediate.parts.map(v=>{
                            v.maber_time = 0
                            v.price = 0
                        })
                        modalData.parts = res.data.intermediate.parts
                    }
                    res.data.intermediate.parts_top.map(v=>{
                        if(v.state){
                            let render = function(h,params){
                                const rows = params.row;
                                const columns = params.column;
                                let key = columns.key;
                                return h('Select',{
                                    
                                    props:{
                                        value:rows[key] ? rows[key].attr_id : '',
                                        filterable:true, 
                                        clearable:true,
                                    },
                                    on:{
                                        'on-change':(event) => {
                                            let columnsData = modalData.parts[params.index]
                                            columnsData[key].attr_id = event;
                                            let sendParams = {
                                                part_id:columnsData.id,
                                                ids:[],
                                            };
                                            for(let i in columnsData){
                                                if(_this.func.isType(columnsData[i])==='Object'){
                                                    columnsData[i].attr_id ? sendParams.ids.push(columnsData[i].attr_id) : ''
                                                } 
                                            }
                                            sendParams.ids = sendParams.ids.join(',')
                                            _this.axios('/api/get_route',{params:sendParams}).then(res=>{
                                                if(res.code == 200){
                                                    Object.assign(columnsData,res.data)
                                                    _this.$forceUpdate()
                                                }
                                            })
                                         }
                                    },
                                },
                                rows[key]&&rows[key].child.length>0 ? rows[key].child.map((item) =>{
                                      return h('Option', {
                                          props: {
                                              value: item.id,
                                              label: item.title
                                          }
                                      })
                                  }) : ''
                                )
                            }
                            v.render = render
                        }
                    })
                    this.partTableColumns = modalData.parts_top;
                    this.$forceUpdate()
                }
            })
        },
        addParts(row){
            this.modalArray.push({
                // product_id:null,
                // price:'',
                // real_price:null,
                // long:'',
                // width:'',
                // high:'',
                // type:null,
                // unit:'',
                // img:'',
                // limit_time:null,
                // model:'',
                // product_type:'',
                // parts:[]
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
            let _this = this;
            this.modalArray.map(v=>{//计算预估工期，指导报价
                let t = 0,p = 0;
                v.parts.map(k=>{
                     t += k.maber_time ? k.maber_time : 0
                     p += k.price ? k.price : 0
                })
                v.limit_time = t
                v.price = p
            })
            this.proxyObj.product = this.modalArray;
            this.Top[0].fixed='left'
            this.proxyObj.product_top = this.Top;
            this.proxyObj.product_top.map(v=>{v.width=200,v.align = 'center'})
            this.$forceUpdate()
            this.tapProduct()
            this.showProduct = false;
            
        },
        cancelModal(){
            this.showProduct = false;
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
                    if(k.product_id){
                        str.push(k.product_id)
                    }
                })
            })
            this.axios('/api/house_detail_material',{params:{product_id:str.length>=1 ? str.join(',') : ''}}).then(res=>{
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
        },
        mapRow(n){
            this.currentIndex = n;
        },
        successUpload(responce){
            let url = responce.data.url;
            this.modalArray[this.currentIndex].url = url
        },
        getUsers(){
            this.axios('/api/user').then(res=>this.users = res.data.data)
        },
                                    
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
.modal-scroll{height:600px;overflow: scroll;}
.modal-items{border-radius:5px;border:1px solid #DEDEDE;padding:0px 10px;margin-bottom:10px;}
.modal-footer-button{display: flex;justify-content:flex-end;padding:10px 0;}
.items-table{width:100%;overflow-x: scroll;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
.original-part{padding-top:20px;}
</style>
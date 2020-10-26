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
                    <Input disabled v-model="info.order_no" class="auto-width" placeholder="自动生成"/>
                </FormItem>

                <FormItem label="小区名称:" prop='residential_name'>
                    <Input v-model="info.residential_name" class="auto-width" placeholder="请输入小区名称"/>
                </FormItem>

                <FormItem label="客户姓名:" prop='client_name'>
                    <Input v-model="info.client_name" class="auto-width" placeholder="请输入客户姓名"/>
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
                    <Input v-model="info.address" class="auto-width" placeholder="请输入小区名称"/>
                </FormItem>

                <FormItem label="手机号:" prop='mobile'>
                    <Input v-model="info.mobile" class="auto-width" placeholder="请输入手机号"/>
                </FormItem>
                <FormItem label="开始日期:" prop='start_time'>
                    <DatePicker v-model="info.start_time" type="date" placeholder="开始日期" class="auto-width"></DatePicker>
                </FormItem>

                <FormItem label="交付日期:" prop='end_time'>
                    <DatePicker v-model="info.end_time" type="date" placeholder="交付日期" class="auto-width"></DatePicker>
                </FormItem>

                <FormItem label="产品总价:">
                    <Input disabled v-model="info.predict_price" class="auto-width" placeholder="自动生成"/>
                </FormItem>

                <FormItem label="预估工期:">
                    <Input disabled v-model="info.predict_working" class="auto-width" placeholder="自动生成"/>
                </FormItem>

                <FormItem label="预估交付日期:">
                    <Input disabled v-model="info.predict_time" class="auto-width" placeholder="自动生成"/>
                </FormItem>

                <FormItem label="订单备注:">
                    <Input v-model="info.remark" class="auto-width" placeholder="请输入订单备注"/>
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
                            <InputNumber clearable v-if='info.renovation_type == 2' style="width:186px" placeholder="请输入楼幢(楼号)" v-model="item.house"></InputNumber>
                            <Input v-else  v-model="item.house" placeholder="请输入楼幢(楼号)"/>
                        </FormItem>

                        <FormItem label="楼单元">
                            <InputNumber clearable v-if='info.renovation_type == 2' style="width:186px" placeholder="请输入楼单元" v-model="item.unit"></InputNumber>
                            <Input v-else v-model="item.unit" placeholder="请输入楼单元"/>
                        </FormItem>

                        <FormItem label="楼层">
                            <InputNumber clearable v-if='info.renovation_type == 2' style="width:186px" placeholder="请输入楼层" v-model="item.layer"></InputNumber>
                            <Input v-else v-model="item.layer" placeholder="请输入楼层"/>
                        </FormItem>

                        <FormItem label="房间号">
                            <InputNumber clearable v-if='info.renovation_type == 2 ' style="width:186px" placeholder="请输入房间号" v-model="item.number"></InputNumber>
                            <Input v-else v-model="item.number" placeholder="请输入房间号"/>
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

                                <svg v-if="index!=0"  @click="delItems(item.product,index)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                                    <use xlink:href="#iconshanchu"></use>
                                </svg>
                            </div>
                        </template>
                    </Table>
                </div>
            </div>
            <!-- 原材料 -->
            <div class="original-part">
                <Table border :span-method="handleSpan" :columns="originalTableColumns" :data="originalData"></Table>
            </div>
        </div>       
        <!-- 选择产品弹层 -->
        <Modal :width="1200" class-name="vertical-center-modal" title="选择产品" v-model="showProduct" @on-ok="tapProduct">
            <div class="modal-scroll">
                <div class="modal-items" v-for="(item,idx) in modalArray" :key="idx">
                    <Form inline :model="item" :rules="productRules" ref='productModel'>
                        <FormItem label="选择产品" prop='product_id'>
                            <Select filterable clearable label-in-value size='small' :disabled='productType == 3 ? true : false' v-model="item.product_id" @on-change='changeProduct($event,idx)' style="width:186px;">
                                <Option v-for="item of productList" :tag='item.img_url' :key="item.id" :label="item.title" :value='item.id'></Option>
                            </Select>
                        </FormItem>

                        <FormItem label="议价(元)" prop='real_price'>
                            <Input type="number" size='small' :disabled='productType == 3 ? true : false' v-model="item.real_price" placeholder="请输入议价"/>
                        </FormItem>

                        <FormItem label='产品价格'>
                            <Input size='small' disabled v-model="item.price" placeholder="自动生成"/>
                        </FormItem>
                        
                        <FormItem label="计量单位">
                            <Input size='small' disabled v-model="item.unit" placeholder="请输入计量单位"/>
                        </FormItem>
                        <FormItem label="位置" prop='position'>
                            <Input size='small' :disabled='productType == 3 ? true : false' v-model="item.position" placeholder="请输入位置"/>
                        </FormItem>

                        <FormItem v-for="(measuring,measuring_key) in item.measuring" :label="measuring.title" :key="measuring_key+11" :prop='measuring.key'>
                            <Input @on-blur="blurMeasur(item,idx)" :disabled='productType == 3 ? true : false' :placeholder="'请输入'+measuring.title" size='small' v-model="item[measuring.key]"/>
                        </FormItem>

                        <FormItem v-for="(outh,outh_key) in item.outh" :label="outh.title" :key="outh_key+21">
                            <a v-if="outh.key=='img'||outh.key=='url'" target="_blank" :href="$store.state.ip+outh.value">
                                <img  style="max-width:30px;max-height:30px;top:0px;position:relative;cursor:pointer;"  :src="$store.state.ip+outh.value">
                            </a>
                            <Input v-if="outh.key!='img'&&outh.key!='url'&&outh.key!='lock'" disabled placeholder="自动生成" size='small' v-model="outh.value"/>

                            <Select label-in-value @on-change="changeLock($event,item,idx)"  size="small" clearable style="width:186px;" v-if="outh.key=='lock'" v-model="item[outh.key]">
                                <Option v-for="luck of lock_list" :key='luck.id' :tag='luck.price' :value="luck.id" :label="luck.title"></Option>
                                <Option :value="0" label="无"></Option>
                            </Select>
                        </FormItem>

                        <FormItem v-for="(remake,remake_key) in item.product_remake" :label="remake.title" :key="remake_key+31">
                            <Input  placeholder="请输入" size='small' v-model="item[remake.title]"/>
                        </FormItem>

                    </Form>
                    <Table stripe border :columns="parts_Columns" :data="item.parts">
                        <template slot='ProcessCombination' slot-scope="{row,index}">
                            <div>
                                <ul>
                                    <li class="column-li" v-for="column of row.route_list" :key="column.id">
                                        <span>{{column.title}}</span>
                                        <Button @click="get_router_Date(column,row,idx,index)" size='small' :type="column.select ? 'success' : 'primary'">{{column.select ? '已选择' : '确认'}}</Button>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template slot='Costum' slot-scope="{row}">
                            <div>
                                <span v-for="(column,_key) of row.custom_route" :key="column.id">{{column.title+(_key==row.custom_route.length-1 ? '' : '/')}}</span>
                            </div>
                        </template>
                        <template slot='set' slot-scope='{row,index}'>
                            <div>
                                <Poptip :ref='"popTip"+idx+index' placement="left-start" @on-popper-hide='popperHide'>
                                    <Button type='primary' size='small'>自定义工艺属性</Button>
                                    <div slot="content">
                                        <div class="hierarchy" v-for="item of coumstList" :key="item.id">
                                            <span>{{item.name||item.title}}(单选)：</span>
                                            <div class="radio-g">
                                                <div @click="setRadioChange(item,_item,row)" :class="['radio-us',_item.show ? 'radio-us-foc' : '']" v-for='_item of item.cld' :key="_item.id">{{_item.title}}</div>
                                            </div>
                                        </div>
                                        <div class="pop-footer">
                                            <Button @click="cancelCoustom(index,idx)" style='margin-right:10px'>取消</Button>
                                            <Button @click="saveCosutom(row,index,item,idx)" style='margin-left:10px' type='primary'>确定</Button>
                                        </div>
                                    </div>
                                </Poptip>
                            </div>
                        </template>
                    </Table>
                    <div class="modal-footer-button">
                        <Button @click="copyProduct(modalArray,idx)" type="warning" style="margin-right:10px;" ghost shape="circle">复制产品</Button>
                        <Button  @click="addParts(item)" type="success" style="margin-right:10px;" ghost shape="circle">添加</Button>
                        <Button v-if='idx!=0' @click="delItems(modalArray,idx)" type="error" ghost shape="circle">删除</Button>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="cancelModal">取消</Button>
                <Button @click="handleProductSubmit('productModel')" type="primary">确定</Button>
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
            coumstList:[],
            tableWidth:null,
            currentIndex:null,
            proxyObj:{},
            _proxyObj:{},
            productType:1,
            watchComputed:null,
            users:[],
            coustomArray:[],
            lock_list:[],
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
            parts_Columns:[
                {title:'部件',key:'title',align:'center'},
                {title:'工艺组合名称',key:'title',align:'center',slot:'ProcessCombination',minWidth:100},
                {title:'自定义组合名称',key:'',align:'center',slot:'Costum',minWidth:100},
                {title:'指导报价',key:'price',align:'center'},
                {title:'部件测量数据',key:'measur',align:'center'},
                {title:'预估工期',key:'maber_time',align:'center'},
                {title:'操作',key:'title',align:'center',slot:'set'},
            ],
            originalData:[],
            tableColumns:[
                {title:'产品类型',align:'center',key:'product_type',minWidth:100,fixed:'left'},
                {title:'产品名称',align:'center',key:'title',minWidth:150},
                {title:'产品型号',align:'center',key:'model',minWidth:100},
                {title:'测量数据',align:'center',key:'measure',minWidth:100},
                {title:'位置',align:'center',key:'position',minWidth:100},
                {title:'图纸',align:'center',minWidth:80,key:'url',slot:'url'},
                {title:'图号',align:'center',key:'url_number',minWidth:150},
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
            productRules:{
                L:[{required: true,message:' ',trigger:'blur'}],
                K:[{required: true,message:' ',trigger:'blur'}],
                H:[{required: true,message:' ',trigger:'blur'}],
                position:[{required: true,message:' ',trigger:'blur'}],
                real_price:[{required: true,message:' ',trigger:'blur'}],
                product_id:[{required: true,message:' ',}]
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
                                measure:'',
                                price:'',
                                real_price:'',
                                type:null,
                                unit:'',
                                img:'',
                                model:'',
                                url_number:'',
                                url:'',
                                route_id:'',
                                limit_time:null,
                                parts:[]
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
        this.getCoumstList()  
        this.getLockList()
    },
    mounted(){
        if(this.id){
            if(this.id){
                this.info = {}
            }
            this.getDate(this.id)
        }
        this.getProducts()
        addEventListener('resize',(e)=>{
            this.tableWidth = e.target.innerWidth - 300;
            this.$forceUpdate()
        })
        
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
                product:[{}],
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
                modalData.price = modalData.price ? modalData.price : 0;
                if(res.code == 200){
                    if(!ext){
                        if(row){modalData.title = row.label||''}
                        modalData.measuring = res.data.measuring;
                        modalData.outh = res.data.outh;
                        modalData.product_remake = res.data.product_remake;
                        res.data.intermediate.parts.map(v=>{
                            v.maber_time = 0
                            v.price = 0
                            v.measur = 0;
                            v.route_list.map(q=>q.select=false)
                        })
                        modalData.parts = res.data.intermediate.parts  
                    }
                    this.Top = res.data.product_top;
                    this.$forceUpdate()
                }
            })
        },
        addParts(row){
            this.modalArray.push({
                product_id:null,
                product_name:'',
                measure:'',
                price:'0',
                real_price:'',
                type:null,
                unit:'',
                img:'',
                model:'',
                url_number:'',
                url:'',
                route_id:'',
                limit_time:null,
                parts:[]
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
                v.parts.map(k=>{t += k.maber_time ? k.maber_time : 0})
                v.limit_time = t
                try{
                    v.measure = v.measure.reduce((pre,cur)=>pre+=(cur+=v[cur]+'*'),'')
                    v.measure = v.measure.substr(0,v.measure.length-1,'')
                }catch(e){}
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
        handleProductSubmit(name){
            for(let i = 0;i<this.$refs[name].length;i++){
                this.$refs[name][i].validate((valid) => {
                    if(valid){
                        this.saveParts()  
                    }
                })
            }
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
        get_router_Date(row,father,idx,index){
            this.axios('/api/get_route_select',{params:{route_id:row.id}})
            .then(res=>{
                if(res.code == 200){
                    Object.assign(father,res.data)
                    if(row.select){return false}
                    father.route_list.map(v=>v.select = false)
                    row.select = true;
                    this.modalArray[idx].parts[index] = father;
                    this.modalArray[idx].price = this.modalArray[idx].parts.reduce((pre,cur)=>pre+(parseInt(cur.price)),0)+(this.modalArray[idx].old_lock_price||0)
                    this.modalArray[idx].price.toFixed(2)
                    father.custom_route = [];
                    this.$forceUpdate()
                }
            })
        },
        getCoumstList(){
            this.axios('/api/bpp_list').then(res=>{
                res.data.map(v=>{
                    if(v.select){
                        v.cld.map(z=>{
                            v.select.map(k=>{
                                z.show = k == z.id ? true : false
                            })
                        })
                    }else{
                        v.cld.map(v=>v.show = false)
                    }
                })
                this.coumstList = res.data;
            })
        },
        setRadioChange(parent,child,rows){
            parent.cld.map(v=>v.show = false)
            if(parent.select == child.id){
                child.show = false;
                parent.select = '';
                let curIndex = this.coustomArray.findIndex((v)=>v.id == child.id);
                if(curIndex!=-1){
                    this.coustomArray.splice(curIndex,1)
                } 
            }else{
                parent.select = child.id;
                child.show = true;
                this.coustomArray.push(child)
            }
            this.$forceUpdate()
        },

        popperHide(e){
            this.coustomArray = []
            this.getCoumstList()
        },
        saveCosutom(row,index,item,idx){
            row.route_list.map(v=>v.select=false)
            row.custom_route = JSON.parse(JSON.stringify(this.coustomArray));
            row.maber_time = 0;
            let removePrice = row.price;
            row.price = 0;
            this.$refs[('popTip'+idx+index)][0].cancel()
            this.modalArray[idx].parts[index] = row;
            this.modalArray[idx].price = parseInt(this.modalArray[idx].price) - removePrice
            this.$forceUpdate()

        },
        cancelCoustom(index,idx){
            this.$refs[('popTip'+idx+index)][0].cancel()
        },
        blurMeasur(row,idx){
            const mapReds = Object.values(row.measuring)
            const result = mapReds.reduce((pre,cur)=>pre.concat(cur.key),[])
            this.modalArray[idx].measure = result;
            this.$forceUpdate()
            row.parts.map(v=>{
               const asy = result.reduce((pre,cur)=>pre.replace(cur,(cur+=(row[cur]||'0'))),v.formula)
               const lettersReg = /[a-z,A-Z]/g
               const notLetterReg = /[^a-z,A-Z]/g
               let valus = asy.split('*')
               let mapresult = ''
               valus.map(item=>{
                   let letters = eval(item.replace(lettersReg,''))
                   let not_l = item.replace(notLetterReg,'')
                   mapresult+=`${not_l}${letters}*`
               })
               v.measur = mapresult.substr(0,mapresult.length-1,'')
            })
        },
        copyProduct(maprows,item){
            let rows = JSON.parse(JSON.stringify(maprows[item]));
            maprows.push(rows)
        },
        getLockList(){
            this.axios('/api/lock_list').then(res=>this.lock_list = res.data)
        },
        changeLock(value,row,idx){
            if(row.old_lock_price){
                row.price = parseInt(row.price) - row.old_lock_price
            }
            row.old_lock_price = parseInt(value.tag||'0');
            row.price = parseInt(row.price)+parseInt(value.tag||'0')
            this.modalArray[idx] = row;
            this.$forceUpdate()
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
.modal-scroll{height:600px;overflow: scroll;}
.modal-items{border-radius:5px;border:1px solid #DEDEDE;padding:0px 10px;margin-bottom:10px;}
.modal-footer-button{display: flex;justify-content:flex-end;padding:10px 0;}
.items-table{width:100%;overflow-x: scroll;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
.original-part{padding-top:20px;}
.column-li{display: flex;justify-content: space-between;align-items: center;padding: 2px 5px;}
.hierarchy{
    .radio-g{padding:10px 0;display:flex;
        .radio-us{background: #F4F5F7;;padding:5px 20px;margin-right:18px;color:#999999;border-radius:15px;border:1px solid #DEDEDE;cursor:pointer;}
        .radio-us-foc{color:#3764FF;background:#fff;border:1px solid #3764FF;}
    }
}
</style>
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
                <FormItem label="楼幢:" prop='house'>
                    <Input v-model="info.house" class="auto-width" placeholder="请输入楼幢"/>
                </FormItem>
                <FormItem label="楼单元:" prop='layer'>
                    <Input v-model="info.layer" class="auto-width" placeholder="请输入楼单元"/>
                </FormItem>
                <FormItem label="楼层:" prop='unit'>
                    <Input v-model="info.unit" class="auto-width" placeholder="请输入楼层"/>
                </FormItem>
                <FormItem label="房间号:" prop='number'>
                    <Input v-model="info.number" class="auto-width" placeholder="请输入房间号"/>
                </FormItem>

                <FormItem label="订单备注:">
                    <Input v-model="info.remark" class="auto-width" placeholder="请输入订单备注"/>
                </FormItem>
            </Form>

            <!-- 产品选择 -->
            <div class="items" v-for="(item,index) of info.product" :key="index">
                <div class="items-header">
                    <div class="header-left">
                        <Badge :count="index+1" type="primary"></Badge>
                        <span>产品{{index+1}}</span>
                    </div>
                    <div class="header-right">
                        <Button v-if="index == info.product.length-1" type="success" style="margin-right:10px;" ghost shape="circle" @click="addHours(info.product)">添加</Button>
                        <Button v-if="index<info.product.length-1" type="error" ghost shape="circle" @click="delItems(info.product,index)">删除</Button>
                    </div>
                </div>

                <div class="form-item">
                    <Form inline :label-width="80">
                        <FormItem label="选择产品">
                            <Select style="width:186px" v-model="item.product_id" @on-change="changeProduct($event,item)">
                                <Option v-for="item of products" :label="item.title" :value="item.id" :key="item.id"></Option>
                            </Select>
                        </FormItem>
                        <FormItem label="单位">
                            <Input v-model="item.unit" disabled placeholder="自动生成"/>
                        </FormItem>
                        <FormItem label="议价">
                            <Input v-model="item.real_price" placeholder="请输入议价"/>
                        </FormItem>

                        <FormItem v-for="(outh,outh_key) of item.outh" :key="outh_key+40" :label="outh.title">
                            <Input v-if="outh.key!='img'" disabled v-model="outh.value" placeholder="自动生成"/>
                            <img style="max-width:30px;max-height:30px;" v-if="outh.key=='img'" :src="$store.state.ip+outh.value" alt="">
                        </FormItem>

                        <FormItem v-for="(measuring,measuring_key) of item.measuring" :key="measuring_key" :label="measuring.title">
                            <Input v-model="measuring.value" :placeholder="'请输入'+measuring.title"/>
                        </FormItem>

                        <FormItem v-for="(product_remake,product_remake_key) of item.product_remake" :key="product_remake_key+121" :label="product_remake.title">
                            <Input v-model="product_remake.value" :placeholder="'请输入'+product_remake.title"/>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    
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
            tableWidth:null,
            users:[],
            products:[],
            infoRules:{
                residential_name:[{required: true,message:' ',trigger:'blur'}],
                client_name:[{required: true,message:' ',trigger:'blur'}],
                warning_state:[{required: true,message:' '}],
                pay_state:[{required: true,message:'请选择'}],
                address:[{required: true,message:' ',trigger:'blur'}],
                mobile:[{required: true,validator: validateMobile, trigger: 'blur'}],
                start_time:[{required: true,message:' '}],
                end_time:[{required: true,message:' '}],  
                renovation_type:[{required: true,message:'请选择订单类型'}],
                house:[{required: true,message:' ',trigger:'blur'}],
                layer:[{required: true,message:' ',trigger:'blur'}],
                unit:[{required: true,message:' ',trigger:'blur'}],
                number:[{required: true,message:' ',trigger:'blur'}],
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
                house:'',//楼幢
                unit:'',//楼单元
                layer:'',//楼层
                number:'',//房间号
                remark:'',
                product:[
                    {
                       product_id:null,
                       unit:'',
                       real_price:null,
                    },
                ]
            },
        }
    },
    
    created(e){
        this.tableWidth = window.innerWidth-300;
        this.getUsers()
        this.getProduct()
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
        window.addEventListener('resize',(e)=>{this.tableWidth = e.target.innerWidth - 300;this.$forceUpdate()})
        
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){
            console.log(this.info)
            let sendData = JSON.parse(JSON.stringify(this.info));
            let op = this.type == 1 ? 'add' : 'edit';
            try{
                sendData.start_time = new Date(sendData.start_time).toLocaleDateString().replace(/\//g,"-")
                sendData.end_time = new Date(sendData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            let params = {op:op,detail:sendData}
            this.axios.post('/api/supplier_order_save',params).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.back()
                }
            })
        },
        getDate(id){
            this.axios('/api/order_detail',{params:{id:id}}).then(res=>{
                this.info = res.data;
            })
        },
        delItems(row,n){
            row.splice(n,1)
        },
        addHours(row){
            row.push({
                product_id:null,
                unit:'',
                real_price:null,
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        getUsers(){
            this.axios('/api/user').then(res=>this.users = res.data.data)
        },
        getProduct(){
            this.axios('/api/product').then(res=>this.products = res.data.data)
        },
        changeProduct(id,row){
            this.axios('/api/order_product_detail',{params:{id:id}})
            .then(res=>{
                if(res.code == 200){
                    row.unit = res.data.detail.unit;
                    row.measuring = res.data.measuring;
                    row.product_remake = res.data.product_remake;
                    row.outh = res.data.outh
                }
            })
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
</style>
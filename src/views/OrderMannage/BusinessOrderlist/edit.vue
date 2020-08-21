<template>
  <div>
        <Toptitle :title='type == 1 ? "新增订单" : "编辑订单"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form inline :label-width="100" style="padding:10px 0;">
                <FormItem label="订单类型:">
                    <RadioGroup v-model="info.type" class="auto-width">
                        <Radio :label="1">楼栋(工装)</Radio>
                        <Radio :label="2">单户(家装)</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="订单编号:">
                    <Input disabled v-model="info.order_no" class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="小区名称:">
                    <Input v-model="info.address" class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="客户姓名:">
                    <Input v-model="info.client_name" class="auto-width" placeholder="请输入客户姓名"></Input>
                </FormItem>

                <FormItem label="紧急程度:">
                    <Select class="auto-width" v-model="info.warning_state">
                        <Option label='不急' :value='0'></Option>
                        <Option label='比较急' :value='1'></Option>
                        <Option label='紧急' :value='2'></Option>
                        <Option label='非常急' :value='3'></Option>
                    </Select>
                </FormItem>

                <FormItem label="业务员:">
                    <Select v-model="info.salesman" class="auto-width"></Select>
                </FormItem>

                <FormItem label="收款:">
                    <RadioGroup v-model="info.pay_state" class="auto-width">
                        <Radio :label="0">未收款</Radio>
                        <Radio :label="1">已收款</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="详细地址:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="手机号:">
                    <Input v-model="info.mobile" class="auto-width" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="开始日期:">
                    <DatePicker v-model="info.start_time" type="date" placeholder="开始日期" class="auto-width"></DatePicker>
                </FormItem>

                <FormItem label="交付日期:">
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
                    <Input v-model="info.remark" class="auto-width" placeholder="请输入小区名称"></Input>
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
                            <Button @click="selectProducts(item)" type="primary" style="margin-right:10px;" ghost>选择产品</Button>
                            <span>(已选2，点击按钮可再次编辑)</span>
                        </FormItem>
                    </Form>
                </div>

                <div class="items-table">
                    <Table border :columns="tableColumns" :data="tableData"></Table>
                </div>
            </div>
        </div>

        <Modal :width="1200" class-name="vertical-center-modal" title="选择产品" v-model="showProduct">
            <div class="modal-items" v-for="(item,index) of modalArray" :key="index">
                <Form inline :label-width="80">
                    <FormItem label="选择产品">
                        <Select v-model="item.product_id" @on-change='changeProduct($event,index)' style="width:186px;">
                            <Option v-for="item of productList" :tag='item.img_url' :key="item.id" :label="item.title" :value='item.id'></Option>
                        </Select>
                    </FormItem>

                    <FormItem label="产品图">
                        <img style="max-width:50px;max-height:50px;"  :src="$store.state.ip+item.img">
                    </FormItem>

                    <FormItem label="产品价格">
                        <span>{{item.price}}</span>
                    </FormItem>

                    <FormItem label="议价">
                        <Input v-model="item.real_price" placeholder="请输入议价"></Input>
                    </FormItem>
                    <FormItem label="长">
                        <Input v-model="item.long" placeholder="请输入长"></Input>
                    </FormItem>
                    <FormItem label="宽">
                        <Input v-model="item.wide" placeholder="请输入宽"></Input>
                    </FormItem>
                    <FormItem label="高">
                        <Input v-model="item.high" placeholder="请输入高"></Input>
                    </FormItem>
                    <FormItem label="计量单位">
                        <Input v-model="item.unit" placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="左右式">
                        <Select style="width:186px;" v-model="item.type">
                            <Option label='左式' :value='1'></Option>
                            <Option label='右式' :value='2'></Option>
                        </Select>
                    </FormItem>
                </Form>
                <Table stripe border :columns="modalTableColums"></Table>

                <div class="modal-footer-button">
                    <Button type="success" style="margin-right:10px;" ghost shape="circle">添加</Button>
                    <Button type="error" ghost shape="circle">删除</Button>
                </div>

            </div>
        </Modal> 
    
  </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            modalArray:[],
            productList:[],
            tableColumns:[
                {title:'产品类型',align:'center',key:'type'},
                {title:'材质',align:'center'},
                {title:'工艺',align:'center'},
                {title:'颜色',align:'center'},
                {title:'指导价格(元)',align:'center'},
                {title:'议价(元)',align:'center'},
                {title:'产品名称',align:'center'},
                {title:'长',align:'center'},
                {title:'宽',align:'center'},
                {title:'高',align:'center'},
                {title:'产品型号',align:'center'},
                {title:'测量数据',align:'center'},
                {title:'位置',align:'center'},
                {title:'图号',align:'center'},
                {title:'图纸',align:'center'},
                {title:'预估工期',align:'center'},
                {title:'操作',align:'center'},
            ],
            modalTableColums:[
                {title:'部件',align:'center'},
                {title:'材质',align:'center'},
                {title:'颜色',align:'center'},
                {title:'工艺',align:'center'},
                {title:'指导价(元)',align:'center'},
                {title:'测量数据',align:'center'},
                {title:'预估工期',align:'center'},
            ],
            tableData:[{type:'123'}],
            showProduct:false,
            info:{
                order_no:'',//订单号
                type:null,//订单类型
                client_name:'',//客户名称
                address:'',//小区
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
                        house:1,
                        unit:2,
                        layer:3,
                        number:4,
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
                                productsInfo:[]
                            }
                        ],
                    },
                ]
            }
        }
    },
    mounted(){
        this.getProducts()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){
            console.log(this.info)
        },
        selectProducts(row){
            this.showProduct = true;
            this.modalArray = row.product;
        },
        delItems(row,n){
            console.log(row)
            row.splice(n,1)
        },
        addHours(row){
            row.push({
                house:1,
                unit:2,
                layer:3,
                number:4,
                product:[
                    {
                        productsInfo:[]
                    }
                ],
            })
        },
        getProducts(){
            this.axios('/api/product').then(res=>this.productList = res.data)
        },
        changeProduct(row,n){
            console.log(row)
            this.axios('/api/order_product_detail',{params:{id:row}}).then(res=>{
                if(res.code == 200){
                    let data = res.data.product;
                    this.modalArray[n].img = data.img;
                    this.modalArray[n].price = data.price;
                    this.modalArray[n].unit = data.unit;
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
</style>
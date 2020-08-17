<template>
  <div>
        <Toptitle :title='type == 1 ? "新增订单" : "编辑订单"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form inline :label-width="100" style="padding:10px 0;">
                <FormItem label="订单类型:">
                    <RadioGroup class="auto-width" v-model="animal">
                        <Radio label="楼栋(工装)"></Radio>
                        <Radio label="单户(家装)"></Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="订单编号:">
                    <Input class="auto-width" placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="小区名称:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="客户姓名:">
                    <Input class="auto-width" placeholder="请输入客户姓名"></Input>
                </FormItem>

                <FormItem label="紧急程度:">
                    <Select class="auto-width"></Select>
                </FormItem>

                <FormItem label="业务员:">
                    <Select class="auto-width"></Select>
                </FormItem>

                <FormItem label="收款:">
                    <RadioGroup class="auto-width" v-model="animal">
                        <Radio label="未收款"></Radio>
                        <Radio label="已收款"></Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="详细地址:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="手机号:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>
                <FormItem label="开始日期:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="交付日期:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="产品总价:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="预估工期:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="预估交付日期:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>

                <FormItem label="订单备注:">
                    <Input class="auto-width" placeholder="请输入小区名称"></Input>
                </FormItem>
            </Form>
            <div class="items">
                <div class="items-header">
                    <div class="header-left">
                        <Badge :count="5" type="primary"></Badge>
                        <span>户型1</span>
                    </div>
                    <div class="header-right">
                        <Button type="success" style="margin-right:10px;" ghost shape="circle">添加</Button>
                        <Button type="error" ghost shape="circle">删除</Button>
                    </div>
                </div>

                <div class="form-item">
                    <Form inline :label-width="80">
                        <FormItem label="楼幢(楼号)">
                            <Input placeholder="请输入楼幢(楼号)"></Input>
                        </FormItem>

                        <FormItem label="楼单元">
                            <Input placeholder="请输入楼单元"></Input>
                        </FormItem>

                        <FormItem label="楼层">
                            <Input placeholder="请输入楼层"></Input>
                        </FormItem>

                        <FormItem label="房间号">
                            <Input placeholder="请输入房间号"></Input>
                        </FormItem>

                        <FormItem label="选择产品">
                            <Button @click="selectProducts" type="primary" style="margin-right:10px;" ghost>选择产品</Button>
                            <span>(已选2，点击按钮可再次编辑)</span>
                        </FormItem>
                    </Form>
                </div>

                <div class="items-table">
                    <Table :columns="tableColumns" :data="tableData"></Table>
                </div>
            </div>
        </div>

        <Modal :width="1200" class-name="vertical-center-modal" title="选择产品" v-model="showProduct">
            <div class="modal-items">
                <Form inline :label-width="80">
                    <FormItem label="选择产品">
                        <Select></Select>
                    </FormItem>

                    <FormItem label="产品图">
                        <Select></Select>
                    </FormItem>

                    <FormItem label="产品价格">
                        <span>2088元</span>
                    </FormItem>

                    <FormItem label="议价">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="长">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="宽">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="高">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="计量单位">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="左右式">
                        <Select></Select>
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
            postInfo:{
                house:[
                    {
                        products:[
                            {
                                productsInfo:[]
                            }
                        ],
                    }
                ]
            }
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        selectProducts(){
            this.showProduct = true;
        }
    }
}
</script>

<style lang='scss' scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;padding-bottom: 20px;;}
.auto-width{width:200px;}
.items{box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;position: relative;border-radius:5px;
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
<template>
    <div>
        <Toptitle :title='type == 1 ? "新增商品" : (type == 2 ? "编辑商品" : "查看商品") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="product-add">
            <div class="items" v-for='(item,index) of addImgList' :key="index">
                <img :src="item" alt="">
            </div>
        </div>

        <Form inline>
            <FormItem label='商品名称'>
                <Select :disabled='this.type == 3 ? true : false' @on-change="changeSelect" v-model="info.product_id" style="width:300px;" placeholder="请选择商品名称">
                    <Option v-for="item of productList" :key='item.id' :label="item.title" :value="item.id"></Option>
                </Select>
            </FormItem>
            <FormItem label='通用销售价格'>
                <Input :disabled='this.type == 3 ? true : false' v-model="info.price" style="width:300px;"  placeholder="请选择商品名称"></Input>
            </FormItem>
        </Form>

        <div class='factor'>
            <span>代理商</span>
            <RadioGroup v-model="showAgent" >
                <Radio :disabled='this.type == 3 ? true : false' :label="1">选择代理商</Radio>
                <Radio :disabled='this.type == 3 ? true : false' :label="2">不选择代理商</Radio>
            </RadioGroup>
        </div>

        <div class="agent" v-if="showAgent == 1 ? true : false">
            <div class='agent-item' v-for="(item,index) of info.agent" :key="index">
                <Form>
                    <FormItem label='姓名'>
                        <Select v-model="item.id">
                            <Option v-for="item of agentNames" :key="item.id" :value="item.id" :label="item.nickname"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label='代理价格'>
                        <Input v-model="item.price" placeholder="请输入代理商价格"></Input>
                    </FormItem>
                </Form>
            </div>

            <div class="agent-add">
                <Icon @click="addAgent" size='100' type="ios-add" />
                <span>添加代理商</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            productList:[],
            addImgList:[],
            agentNames:[
                {id:'',price:''},
            ],
            showAgent:2,
            info:{
                img:'',
                product_id:'',
                price:'',
                agent:[],
            }
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id||null;
        if(this.id){
            this.getGoodsDetail(this.id)
        }
        this.getData();
        this.getUser();
    },
    methods:{
        postData(){
            this.info.op = this.type == 1 ? 'add' : 'edit'
            this.axios.post('/api/goods',this.info).then(res=>{
                console.log(res)
            })
        },
        getData(row){
            this.axios('/api/product',{params:row}).then(res=>{
                console.log(res)
                this.productList = res.data
            })
        },
        back(){
            this.$router.go(-1)
        },
        addAgent(){
            this.info.agent.push({id:'',price:''})
        },
        changeSelect(e){
            this.axios('/api/goods_product',{params:{id:e}}).then(res=>{
                console.log(res)
            })
        },
        getUser(){
            this.axios('/api/user').then(res=>{
                this.agentNames = res.data;
            })
        },
        getGoodsDetail(row){
            this.axios('/api/goods',{params:{id:row}}).then(res=>{
                this.info = res.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.product-add{padding:10px 0;display:flex;flex-wrap:wrap;
    .ipt{position:absolute;width:100%;height:100%;opacity:0;cursor: pointer;outline: none;top:0;left:0;}
    .add-items{width:240px;height:240px;background:#E7E7E7;border-radius:5px;display: flex;justify-content: center;align-items: center;overflow: hidden;position:relative;}
    .items{width:240px;height:240px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;background:#E7E7E7;margin-right:10px;border-radius:5px;
        img{max-width:208px;max-height:208px;;}
    }
}
.factor{display: flex;flex-direction: column;}
.agent{padding-top:10px;display:flex;flex-wrap:wrap;
    .agent-item{width:300px;height:200px;background:#F4F5F7;border-radius:5px;margin-right:10px;
        padding:10px 30px;
    }
    .agent-add{width:300px;height:200px;border-radius:5px;display: flex;justify-content: center;align-items: center;flex-direction: column;
    border:1px dotted #DEDEDE;
    }
}
</style>
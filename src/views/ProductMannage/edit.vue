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

            <div class="add-items">
                <Icon size='100' type="md-add" />
                <input @change="changeIpt" type="file" class="ipt"/>
            </div>
        </div>

        <Form inline>
            <FormItem label='商品名称'>
                <Select style="width:300px;" placeholder="请选择商品名称"></Select>
            </FormItem>
            <FormItem label='通用销售价格'>
                <Select style="width:300px;"  placeholder="请选择商品名称"></Select>
            </FormItem>
        </Form>

        <div class='factor'>
            <span>代理商</span>
            <RadioGroup v-model="animal">
                <Radio label="金斑蝶">选择代理商</Radio>
                <Radio label="爪哇犀牛">不选择代理商</Radio>
            </RadioGroup>
        </div>

        <div class="agent">
            <div class='agent-item'>
                <Form>
                    <FormItem label='姓名'>
                        <Select></Select>
                    </FormItem>
                    <FormItem label='代理价格'>
                        <Select></Select>
                    </FormItem>
                </Form>
            </div>

            <div class="agent-add">
                
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
            addImgList:[],
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
    },
    methods:{
        postData(){

        },
        back(){
            this.$router.go(-1)
        },
        changeIpt(e){
            let url = window.URL.createObjectURL(e.target.files[0]);
            this.addImgList.push(url)
            let formData = new FormData()
            formData.append('img',e.target.files[0])
            this.axios.post('/b/c',formData)
            e.target.value = null
        }
    }
}
</script>

<style lang="scss" scoped>
.product-add{padding:10px 0;display:flex;flex-wrap:wrap;
    .ipt{position:absolute;width:100%;height:100%;opacity:0;cursor: pointer;outline: none;top:0;left:0;}
    .add-items{width:240px;height:240px;background:#E7E7E7;border-radius:5px;display: flex;justify-content: center;align-items: center;overflow: hidden;position:relative;}
    .items{width:240px;height:240px;display:flex;justify-content:center;align-items:center;background:#E7E7E7;margin-right:10px;border-radius:5px;
        img{max-width:208px;max-height:208px;}
    }
}
.factor{display: flex;flex-direction: column;}
.agent{padding-top:10px;
    .agent-item{width:300px;height:200px;background:#F4F5F7;border-radius:5px;
        padding:10px 30px;
    }
    .agent-add{}
}
</style>
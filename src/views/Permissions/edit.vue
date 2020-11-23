<template>
    <div>
        <Toptitle :title='$route.query.op == "add" ? "新增套餐" : ($route.query.op == "edit" ? "编辑套餐" : "查看套餐")'>
            <Button  @click="back" type='primary' ghost  style="margin-right:10px;">返回</Button>
            <Button  type='primary' @click="handleSubmit('forms')" :disabled='$route.query.op == "see"'>保存</Button>
        </Toptitle>
        <Form ref='forms' style="margin-top:20px;" :label-width="110" :model="postInfo" :rules='rules'>
            <FormItem label='套餐名称' prop='title'>
                <Input :disabled='$route.query.op == "see"' v-model="postInfo.title" style="width:200px" placeholder="请输入套餐名称"/>
            </FormItem>
            <FormItem label='选择权限' prop='type'>
                <Select :disabled='$route.query.op == "see" ? true : false' style="width:200px" v-model="postInfo.type">
                    <Option label="仅用于方便查看字段" :value='1'></Option>
                    <Option label="仅用于方便查看字段1" :value='2'></Option>
                    <Option label="仅用于方便查看字段2" :value='3'></Option>
                </Select>
            </FormItem>
            <FormItem label='套餐状态' prop='state'>
                <i-switch :disabled='$route.query.op == "see"' v-model="postInfo.state" :true-value='1' :false-value='0'>
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </FormItem>
            <FormItem label='添加套餐'>
                <div style="display:flex;flex-wrap:wrap;">
                    <div class="permissions-item" v-for="(item,index) of postInfo.premissions" :key="index">
                        <p>套餐时间</p>
                        <div style="per-form">
                            <Form style="width:200px;margin-top:10px;">
                                <FormItem label='套餐时间'>
                                    <Input v-model="item.time" size="small" style="width:130px"/>
                                </FormItem>
                                <FormItem label='试用价格'>
                                    <Input v-model="item.try_price" size="small" style="width:130px"/>
                                </FormItem>
                                <FormItem label='套餐价格'>
                                    <Input v-model="item.price" size="small" style="width:130px"/>
                                </FormItem>
                            </Form>
                        </div>
                        <Icon @click="delItems(index,postInfo.premissions)" size='20' class="delete-img" type="ios-close-circle" />
                    </div>
                    <div class="permissions-item center">
                        <Icon @click="addItems" style="cursor:pointer" type="md-add" size='100' />
                    </div>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            postInfo:{
                title:'',
                type:null,
                state:0,
                op:this.$route.query.op,
                premissions:[],
            },
            rules:{
                title:[{required: true,message:'消息通知名称',trigger:'blur'}],
                type:[{required: true,message:'请选择通知类型'}],
                state:[{required: true,message:'请输入内容'}]
            }
        }
    },
    mounted(){
        const id = this.$route.query.id
        if(id){
            this.axios('/api/premissions/detail').then(res=>{
                res.code == 200 ? (()=>{
                    this.postInfo = res.data
                })() : ''
            })
        }
    },
    methods:{
        back(){this.$router.go(-1)},
        postData(){
            const result = JSON.stringify(this.postInfo)
            this.axios.post('/api/premissions/save',result).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功')
                    this.back()
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        delItems(n,arr){
            arr.splice(n,1)
        },
        addItems(){
            this.postInfo.premissions.push({
                time:'',
                try_price:'',
                price:''
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.delete-img{position:absolute;right:10px;top:10px;color:red;}
.permissions-item{width:250px;margin:10px;;border-radius:5px;height:200px;display: flex;justify-content: space-between;flex-direction: column;align-items:center;box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;position: relative;
    .per-form{width:200px;}
    p{width:100%;height:50px;display: flex;justify-content: center;align-items: center;background: rgb(244,248,255);}
}
.center{display: flex;justify-content: center;align-items: center;}
</style>
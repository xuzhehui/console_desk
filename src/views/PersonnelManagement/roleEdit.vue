<template>
    <div>
        <Toptitle :title='type == 1 ? "新增角色" : (type == 2 ? "编辑角色" : "查看角色") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form inline style="margin:10px 0;">
            <FormItem label="ID" :label-width="20">
                <Input disabled placeholder="自动生成"></Input>
            </FormItem>
            <FormItem label="角色分类名称" :label-width="100">
                <Input placeholder="请输入角色分类名称"></Input>
            </FormItem>
        </Form>

        <div>
            <span>使用权限：</span>
            <div style="padding:10px 0;">
                <Collapse v-model="value1">
                    <Panel v-for="(item,index) of jurisdiction" :key="item.id" :name="index+''">
                        <Checkbox label="订单管理">{{item.title}}</Checkbox>
                        <div slot="content">
                            <Collapse v-if="item.sub" v-model="value1">
                                <Panel v-for="(_item,_index) of item.sub" :key="_item.id" :name="_index+''">
                                    <Checkbox label="订单管理">{{_item.title}}</Checkbox>
                                    <div slot="content">
                                        <CheckboxGroup>
                                            <Checkbox label="香蕉"></Checkbox>
                                            <Checkbox label="苹果"></Checkbox>
                                            <Checkbox label="西瓜"></Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </Panel>
                            </Collapse>
                            <CheckboxGroup v-if=!item.sub>
                                <Checkbox label="香蕉"></Checkbox>
                                <Checkbox label="苹果"></Checkbox>
                                <Checkbox label="西瓜"></Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Panel>
                </Collapse>
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
            jurisdiction:[],//权限列表
            value1:[]
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        this.getData()
        this.getUserData()
    },
    methods:{
        postData(){

        },
        getData(){//获取所有权限
            this.axios('/api/permission').then(res=>{
                let result = []
                for(let i in res.data){
                    result.push(res.data[i])
                }
                this.jurisdiction = result;
                console.log(this.jurisdiction)
            })
        },

        getUserData(){
            this.axios('/api/user_permission').then(res=>{
                
            })
        },
        back(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
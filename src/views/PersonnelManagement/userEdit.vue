<template>
    <div>
        <Toptitle :title='type == 1 ? "新增用户" : "编辑用户"'>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="handleSubmit('Info')">保存</Button>
        </Toptitle>
        <div class="page-edit">
            <Form inline ref='Info' :model="info" :rules='rules'>
            <FormItem label="ID">
                <Input v-model="info.id" disabled placeholder="自动生成"/>
            </FormItem>
            <FormItem label="用户名称" prop='nickname'>
                <Input v-model="info.nickname" placeholder="请输入用户名称"/>
            </FormItem>
            <FormItem  label="选择角色" prop='group_id'>
                <Select filterable clearable v-model="info.group_id" style="width:186px;">
                    <Option v-for="item of roleList" :key="item.id" :value="item.id" :label="item.group_title"></Option>
                </Select>
            </FormItem>
            <FormItem label="登录账号" prop='account'>
                <Input :disabled='type==2 ? true : false' v-model="info.account" placeholder="请输入登录账号"/>
            </FormItem>
            <FormItem label="登录密码" prop='password'>
                <Input  type="password" v-model="info.password"  placeholder="请输入登录密码"/>
            </FormItem>
            <FormItem label="手机号" prop='mobile'>
                <Input type="number" v-model="info.mobile"  placeholder="请输入手机号"/>
            </FormItem>
        </Form>

        <div style="padding-top:10px;">
            <span>审批角色</span>
            <div style="padding:10px 0;">
                测量审批角色
            </div>
        </div>

        <div class="approval">
            <div class="items" v-for="(item,index) of info.measure_users" :key="item.level">
                    <Icon size='20' @click="delItems(index,info.measure_users)" class="delete-img" type="ios-close-circle" />
                    <span>{{item.level}}级测量审批员</span>
                    <Select
                        v-model="item.flow_user"
                        filterable
                        remote
                        :remote-method='romoteFn'>
                        <Option v-for="(option, index) in approvalList" :value="option.id" :key="index">{{option.nickname}}</Option>
                    </Select>
                </div>
                <div class="item-add" @click="addApproval(1)">
                    <Icon size='50' type="ios-add" />
                    <span>添加测量审批员</span>
                </div>
            </div>

            <div style="padding-top:10px;">
                <div style="padding:10px 0;">
                    生产审批角色
                </div>
            </div>
            <div class="approval">
                <div class="items" v-for="(item,index) of info.produce_users" :key="item.level">
                    <Icon size='20' @click="delItems(index,info.produce_users)" class="delete-img" type="ios-close-circle" />
                    <span>{{item.level}}级生产审批员</span>
                    <Select
                        v-model="item.flow_user"
                        filterable
                        remote
                        :remote-method='romoteFn'>
                        <Option v-for="(option, index) in approvalList" :value="option.id" :key="index">{{option.nickname}}</Option>
                    </Select>
                </div>
                <div class="item-add" @click="addApproval(2)">
                    <Icon size='50' type="ios-add" />
                    <span>添加生产审批员</span>
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
        const validateChina = function(rule,value,fn){
            if(value.length<5||value.length>12){
                fn(new Error(`${rule.field == 'account' ? '账号' : '密码'}的长度在6-12位之间`))
                return false
            }
            let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
            if(reg.test(value)){
                fn(new Error(`${rule.field == 'account' ? '账号' : '密码'}中不可有中文字符`))
                return false
            }
            fn()
        };
        return {
            type:1,
            id:null,
            approvalList:[],
            approvalType:1,
            roleList:[],
            info:{
                account:'',
                nickname:'',
                mobile:'',
                group_id:'',
                measure_users:[],
                produce_users:[],
                password:'',
            },
            rules:{
                account:[{validator:validateChina, trigger: 'blur'}],
                nickname:[{required: true, message: ' ', trigger: 'blur'}],
                mobile:[{validator: validateMobile, trigger: 'blur'}],
                group_id:[{required: true, message: ' ',}],
                password:[{validator:validateChina, trigger: 'blur'}],
            },
            
            
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        
        if(this.id){
            this.getData(this.id)
        }
        this.getRoleList()
        this.getapprovalList()
    },
    methods:{
        getData(id){
            this.axios('/api/user',{params:{id:id}}).then(res=>{
                if(!res.data.measure_users){
                    res.data.measure_users = []
                }
                if(!res.data.produce_users){
                    res.data.produce_users = []
                }
                this.info = res.data;
                this.type == 1 ? '' : this.info.password = '******'
                
            })
        },
        postData(){
            let op = this.type == 1 ? 'add' : 'edit';
            this.info.op = op;
            let postInfo = JSON.parse(JSON.stringify(this.info));
            postInfo.measure_users = JSON.stringify(postInfo.measure_users)
            postInfo.produce_users = JSON.stringify(postInfo.produce_users)
            this.axios.post('/api/user',postInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'新增成功')
                }
                this.back()
            })
        },
        getRoleList(){
            this.axios('/api/group').then(res=>{
                this.roleList = res.data.data;
            })
        },
        back(){
            this.$router.go(-1)
        },
        getapprovalList(){
            this.axios('/api/user').then(res=>{
                this.approvalList = res.data.data;
            })
        },
        
        romoteFn(query){
            // this.approvalList.map()
        },
        addApproval(n){
            let len = n == 1 ? this.info.measure_users.length :  this.info.produce_users.length;
            n == 1 ? this.info.measure_users.push({type:n,level:len+1,flow_user:null}) : this.info.produce_users.push({type:n,level:len+1,flow_user:null})
        },
        delItems(n,arr){
            arr.splice(n,1)
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.approval{display: flex;flex-wrap:wrap;
    .item-add{width:340px;height:120px;display: flex;flex-direction: column;justify-content: center;align-items: center;border:1px dotted #DEDEDE ;
        border-radius:5px;
    }
    .items{width:340px;height:120px;margin-right:10px;display: flex;flex-direction: column;justify-content: center;background:#F4F5F7;padding:0 20px;margin-bottom:10px;position: relative;}
}
.delete-img{position:absolute;right:10px;top:10px;color:red;}
</style>
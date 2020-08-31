<template>
    <div>
        <Toptitle :title='type == 1 ? "新增用户" : "编辑用户"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="ID">
                <Input v-model="info.id" disabled placeholder="自动生成"></Input>
            </FormItem>
            <FormItem label="用户名称">
                <Input v-model="info.nickname" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="选择角色">
                <Select v-model="info.group_id" style="width:186px;">
                    <Option v-for="item of roleList" :key="item.id" :value="item.id" :label="item.group_title"></Option>
                </Select>
            </FormItem>
            <FormItem label="登录账号">
                <Input v-model="info.account" placeholder="请输入登录账号"></Input>
            </FormItem>
            <FormItem label="登录密码">
                <Input v-model="info.password"  placeholder="请输入登录密码"></Input>
            </FormItem>
            <FormItem label="手机号">
                <Input v-model="info.mobile"  placeholder="请输入手机号"></Input>
            </FormItem>
        </Form>

        <div>
            <span>审批角色</span>
            <div style="padding:10px 0;">
                <RadioGroup v-model="approvalType">
                    <Radio :label="1">测量审批</Radio>
                    <Radio :label="2">生产审批</Radio>
                </RadioGroup>
            </div>
        </div>

        <div class="approval">
            <div class="items" v-for="(item,index) of info.flow" :key="item.level">
                <Icon size='20' @click="delItems(index,info.flow)" class="delete-img" type="ios-close-circle" />
                <span>{{item.level}}级{{item.type == 1 ? '测量' : '审批'}}审批员</span>
                <Select
                    v-model="item.flow_user"
                    filterable
                    remote
                    :remote-method='romoteFn'>
                    <Option v-for="(option, index) in approvalList" :value="option.id" :key="index">{{option.nickname}}</Option>
                </Select>
            </div>
            <div class="item-add" @click="addApproval">
                <Icon size='50' type="ios-add" />
                <span>添加审批员</span>
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
            approvalList:[],
            approvalType:1,
            roleList:[],
            info:{
                account:'',
                nickname:'',
                mobile:'',
                group_id:'',
                flow:[],
                password:'',
            }
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
                this.info = res.data;
            })
        },
        postData(){
            let op = this.type == 1 ? 'add' : 'edit';
            this.info.op = op;
            let postInfo = JSON.parse(JSON.stringify(this.info));
            postInfo.flow = JSON.stringify(postInfo.flow)
            this.axios.post('/api/user',postInfo).then(res=>{
                this.$Message.success(res.msg||'新增成功')
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
        addApproval(){
            let len = this.info.flow.length
            this.info.flow.push({type:this.approvalType,level:len+1,flow_user:null})
        },
        delItems(n,arr){
            arr.splice(n,1)
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
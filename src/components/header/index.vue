<template>
    <div class="header">
        <div class="content">
            <img :src="$store.state.ip+'/api/pic/16038707135247'" alt="">
            <!-- <span class="title">Welecome</span> -->
            <div class="header-right">
                <Input placeholder="请输入关键词" style="width: auto;margin-right:50px;">
                    <Icon type="ios-search" slot="suffix" />
                </Input>

                <Dropdown @on-click='dropClick'>
                    <Avatar style="margin-right:10px;" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    <DropdownMenu slot="list">
                        <DropdownItem :name='1'>修改密码</DropdownItem>
                        <DropdownItem :name='3'>修改个人信息</DropdownItem>
                        <DropdownItem :name="2">退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <label style="margin-right:20px;">{{userInfo.nickname}}</label>

                <Divider type="vertical" style="margin-right:20px;" />

                <Badge  style="margin-right:20px;cursor:pointer" :count="noticeNum">
                    <Icon @click="goNotice" type="ios-notifications-outline" size="26"></Icon>
                </Badge>

                
                <Dropdown trigger="custom" :visible="visible" placement="bottom-start" @on-clickoutside='clickoutside'>
                    <Icon size='26' type="ios-cloud-download-outline" @click="visible = true" />
                    <DropdownMenu slot="list" style="width:300px;">
                        <div style="color:#333;padding-left:15px;">模板下载</div>
                        <DropdownItem v-for="item of template_list" :key="item.id">
                            <div class='drop-dowan-item'>
                                <span>{{item.title}}</span>
                                <Icon @click="downLoadTemlate(item)" size='20' type="md-download" />
                            </div>
                        </DropdownItem>
                        <div style="text-align: right;margin:10px;border-top:1px solid #F4F4F4;padding-top:10px;">
                            <Button style="text-align: right" type="primary" size='small' @click="visible = false">关闭</Button>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>

        <Modal class-name="vertical-center-modal" v-model="replacePassword" title='修改密码' :width="300" @on-visible-change="changePass">
            <Form ref='passwordInfo' :model="passwordInfo" :rules='rules' :label-width="80">
                <FormItem label='原始密码' prop='old_password'>
                    <Input type="password" v-model="passwordInfo.old_password" placeholder="请输入原始密码"></Input>
                </FormItem>
                <FormItem label='新密码' prop='new_password'>
                    <Input type="password" v-model="passwordInfo.new_password" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem label='确认密码' prop='verify_password'>
                    <Input type="password" v-model="passwordInfo.verify_password" placeholder="确认密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="footer-modal">
                <Button>取消</Button>
                <Button type="primary" @click="replace_password('passwordInfo')">保存</Button>
            </div>
        </Modal>

        <Modal class-name="vertical-center-modal" v-model="showUserInfo" title='修改个人信息' @on-ok="replaceUserInfo">
            <Form :label-width="70">
                <FormItem label="修改头像">
                    <Upload :show-upload-list='false' :headers='headers' :on-success='uploadSuccess' :action="$store.state.ip+'/api/upload_pic'">
                        <div class="upload-avatar">
                            <Icon v-if="!info.avatar" size='30' type="ios-cloud-upload-outline" />
                            <img v-if="info.avatar||userInfo.avatar" :src="info.avatar ? $store.state.ip+info.avatar : $store.state.ip+userInfo.avatar" alt="">
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="修改昵称">
                    <Input v-model="info.nickname"></Input>
                </FormItem>
            </Form>
        </Modal>

        
    </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex'
export default {
    data(){
        return {
            replacePassword:false,
            passwordInfo:{
                old_password:'',
                new_password:'',
                verify_password:'',
            },
            rules:{
                old_password:[
                    {required: true,message:'请输入原始密码',trigger:'blur'}
                ],
                new_password:[
                    {required: true,message:'请输入新密码',trigger:'blur'}
                ],
                verify_password:[
                    {required: true,message:'确认密码',trigger:'blur'}
                ],
            },
            showUserInfo:false,
            info:{
                nickname:'',
                avatar:'',
            },
            headers:{'Authorization':localStorage.getItem('token')},
            visible:false,
            template_list:[],
        }
    },
    created(){
        this.saveUser()
    },
    computed:{
        ...mapState(['userInfo','noticeNum'])
    },
    mounted(){
        // this.getTemplateDown_list()
        // this.update_notice()
    },
    methods:{
        ...mapMutations(['saveUser']),
        ...mapActions(['update_notice']),
        loginOut(){
            this.axios.post('/api/login_out').then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'已退出登录');
                    localStorage.removeItem('token')
                    localStorage.removeItem('autoLogin')
                    setTimeout(()=>this.$router.push({name:'Login'}),500) 
                }
            })
        },
        openPasswordModal(){
            this.replacePassword = true;
        },
        openUserInfoModal(){
            this.showUserInfo = true;
        },
        replaceUserInfo(){
            this.axios.post('/api/replace_userinfo',this.info).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)//这里可以继续取出缓存更换头像再存入缓存以达到同步更新效果
                    let user = JSON.parse(localStorage.getItem('user_info'));
                    user.nickname = this.info.nickname;
                    user.avatar = this.info.avatar;
                    localStorage.setItem('user_info',JSON.stringify(user))
                }
            })
        },
        uploadSuccess(e){
            this.info.avatar = e.data.url;
        },
        replace_password(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.axios.post('/api/replace_password',this.passwordInfo).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.replacePassword = false;
                            localStorage.removeItem('token')
                            setTimeout(()=>this.$router.push({name:'Login'}),500)
                        }
                    })
                }
            })
        },
        changePass(e){
            !e ? this.passwordInfo = {} : ''
        },
        dropClick(name){
            name == 2 ? this.loginOut() : (name == 1 ? this.openPasswordModal() : (name == 3 ? this.openUserInfoModal() : ''));
        },
        goNotice(){
            this.$router.push({
                path:'/cms/notice/menote'
            })
        },
        clickoutside(e){
            if(e){
                this.visible = false;
            }
        },
        getTemplateDown_list(){
            this.axios('/api/template_list')
            .then(res=>{
                res.code == 200 ? (()=>{
                    this.template_list = res.data.data;
                })() : ''
            })
        },
        downLoadTemlate(row){
            location.href=row.url;
        }
    },
}
</script>

<style lang="scss" scoped>
.header{position:fixed;top:0;left:0;width:100%;z-index:99;
    .content{width:100%;height:80px;background-image:linear-gradient(to right,#3764FF,#3764FF,#794495);;display: flex;align-items: center;justify-content: space-between;padding:0 20px;color:#fff;
        .title{font-size:36px;color:#fff;font-family:'Arial Bold Italic';font-weight: bold;}
        .header-right{display: flex;align-items: center;}
    }
}
.footer-modal{display: flex;justify-content: center;}
.upload-avatar{width:78px;height:78px;background:rgba(0,0,0,.1);display: flex;justify-content: center;align-items: center;border-radius:5px;
    img{max-width:78px;max-height:78px;border-radius:5px;}
}
.drop-dowan-item{display: flex;justify-content: space-between;align-items: center;}
</style>
<template>
    <div class="header">
        <div class="content">
            <span class="title">Welecome</span>
            <div class="header-right">
                <Input placeholder="请输入关键词" style="width: auto;margin-right:50px;">
                    <Icon type="ios-search" slot="suffix" />
                </Input>

                <Avatar style="margin-right:10px;" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />

                <label style="margin-right:20px;">{{userInfo.nickname}}</label>

                <Divider type="vertical" style="margin-right:20px;" />

                <Badge  style="margin-right:20px;" :count="88">
                    <Icon type="ios-notifications-outline" size="26"></Icon>
                </Badge>

                <Icon size='26' type="ios-cloud-download-outline" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {

        }
    },
    created(){
        this.saveUser()
    },
    computed:{
        ...mapState(['userInfo'])
    },
    mounted(){
    },
    methods:{
        ...mapMutations(['saveUser'])
    },
}
</script>

<style lang="scss" scoped>
.header{position:fixed;top:0;left:0;width:100%;
    .content{width:100%;height:80px;background-image:linear-gradient(to right,#3764FF,#3764FF,#794495);;display: flex;align-items: center;justify-content: space-between;padding:0 20px;color:#fff;
        .title{font-size:36px;color:#fff;font-family:'Arial Bold Italic';font-weight: bold;}
        .header-right{display: flex;align-items: center;}
    }
}
</style>
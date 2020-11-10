<template>
    <div class="content">
        <FullPage 
        style="padding:0;"
        title='通知列表'
        :list='list' 
        @init='init' 
        :showTable='false'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;" >返回</Button>
            </div>

            <div class="notices">
                <div class="item" v-for="item of info" :key="item.id">
                    <div :class="['header',item.type == 1 ? 'notice-mesau' : (item.type == 2 ? 'notice-mesau' : (item.type == 3 ? 'notice-warning' : 'notice-error'))]">
                        <div  class="header-icon">
                            <div class="item-icon">
                                <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                                    <use :xlink:href="item.type == 1 ? '#iconxiaceliang' : (item.type == 2 ? '#iconxiashengchan' : (item.type == 3 ? '#iconjingshi' : '#iconzhuyi'))"></use>
                                </svg>
                            </div>
                            <span 
                            :style="item.type == 1||item.type == 2 ? 'color:#333333;' : '#fff'" 
                            class="title">{{item.type == 1 ? '下测量通知' : (item.type == 2 ? '下生产通知' : (item.type == 3 ? '请注意!' : '已逾期!'))}}
                            </span>
                        </div>
                        
                        <span :style="item.type == 1||item.type == 2 ? 'color:#333333;' : '#fff'"  class="header-time">{{func.replaceDate(item.crt_time*1)}}</span>
                    </div>
                    <div class="item-footer">
                        <div class="ready">
                            <div class="item-ready">
                                <div v-if="item.status == 0" class="is-ready"></div>
                            </div>
                            <div class="item-content">{{item.content}}</div>
                        </div>
                        <div class="item-outher">
                            
                            <div class="item-set">
                                <a @click="goDetails(item)">查看</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'通知类型',name:'Select',serverName:'type',value:'',
                    option:[
                        {label:'测量',value:1},
                        {label:'生产',value:2},
                        {label:'物料警告',value:3},
                        {label:'订单过期',value:4},
                    ]
                },
                {title:'状态',name:'Select',serverName:'state',value:'',
                    option:[
                        {label:'已读',value:1},
                        {label:'未读',value:0},
                    ]
                }
            ],
            pageIndex:1,
            total:0,
            pageSize:10,
            info:[],
        }
    },
    
    methods:{
        ...mapActions(['update_notice']),
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.axios('/api/notice_list',{params:row}).then(res=>{
                if(res.code == 200){
                    this.total = res.data.total;
                    this.info = res.data.data;
                }
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = e;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        goPage(row){
            this.$router.push({
                path:'/cms/finance/salary',
                query:{
                   title:row.name,
                }
            })
        },
        goDetails(row){
            this.axios.post('/api/notice_confirm',{id:row.id}).then(res=>{
                if(res.code == 200){
                    this.update_notice()
                    if(row.type == 1 || row.type == 2){
                        this.$router.push({
                            path:row.url
                        })
                    } 
                    this.getData(this.proxyObj)
                }
            })
        },
        back(){this.$router.go(-1)},
    }
}
</script>

<style lang="scss" scoped>
.content{background:#F0F1F4!important;padding:0!important;}
.notices{width:100%;
    .item{width: 100%;height:107px;border-radius:5px;overflow: hidden;margin-bottom:16px;
        .header{height:53px;display:flex;align-items:center;justify-content: space-between;padding-right:20px;
            .header-icon{display: flex;height:100%;align-items:center;
                .item-icon{width:50px;height:100%;margin-right:10px;display: flex;justify-content: center;align-items: center;}
                .title{font-size: 16px;color:#fff;}
            }
            .header-time{color:#fff;font-size: 16px;}
        }
        .item-footer{height:57px;background:#fff;display:flex;width:100%;display:flex;align-items:center;justify-content:space-between;padding-right:20px;
            .ready{display: flex;align-items:center;height:100%;
                .item-ready{width:50px;height:100%;margin-right:10px;display: flex;justify-content: center;align-items: center;
                    div{width:10px;height:10px;border-radius:50%;background:#FF5E5C;}
                }
                .item-content{color:#333333;font-size:16px;}
            }
        }
    }
}
.notice-mesau{background:#F4F8FF}
.notice-warning{background:#FFA141}
.notice-error{background:#FF5E5C}
</style>
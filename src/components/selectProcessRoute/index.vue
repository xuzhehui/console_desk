<template>
    <div class="select-route">
        <Modal style="height:500px;" scrollable :width='800' class-name="vertical-center-modal" :title='title' v-model="show" @cancel='cancel' @on-ok="selectSucces">

            <div class="modal-page">
               <div style="padding-bottom:20px;">
                   <span>工艺路线</span>
                   <div class="item-box">
                       <div @click="selectItems(item,list)" :class="['item',item.show ? 'item-foc' : '']" v-for="(item,index) of list" :key="index">{{item.title}}</div>
                   </div>
               </div>

               <div style="padding-bottom:20px;" v-for="(item,index) of process" :key="index">
                   <span>{{item.title}}</span>
                   <div class="item-box">
                       <div @click="selectProcess(_item,item)" :class="['pro-item']" v-for="(_item,_index) of item.child" :key="_index">
                           <div :class="['item-radio',_item.show ? 'radio-foc' : '']">
                               <div class="item-center"></div>
                           </div>
                           <span>{{_item.title}}</span>
                        </div>
                   </div>
               </div>



               <Table :columns="tableColums" :data="tableData" stripe border>
                   <template slot-scope="{index}" slot="time">
                        <Input v-model="tableData[index].time"></Input>
                   </template>
                   <template slot-scope="{index}" slot="wages">
                        <Input v-model="tableData[index].wages"></Input>
                   </template>
                   <template slot-scope="{index}" slot="capacity">
                        <Input v-model="tableData[index].capacity"></Input>
                   </template>
               </Table>
            </div>
            <div class="modal-footer" slot='footer'>
                <Button @click='cancel'>取消</Button>
                <Button @click="selectSucces">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:'选择工艺路线',
            params:{},
            list:[],
            process:[],
            show:false,
            tableColums:[
                {title:'工序分类',align:'center',key:'p_title'},
                {title:'工序名称',align:'center',key:'title'},
                {title:'工时',align:'center',key:'time',slot:'time'},
                {title:'工价',align:'center',key:'wages',slot:'wages'},
                {title:'产能',align:'center',key:'capacity',slot:'capacity'},
            ],
            tableData:[],
            router_id:''
        }
    },
    created(){
        this.getData(this.params)
    },
    mounted(){
        
    },
    methods:{
        selectItems(item,rows){
            if(item.id == this.router_id){
                item.show = false
                this.router_id = null;
            }else{
                rows.map(v=>v.show = false)
                item.show = !item.show
                this.router_id = item.id
                this.params.route_id =this.route_id
                this.getData(this.params,1)
            }
            this.$forceUpdate()
        },
        selectProcess(item,rows){
            if(rows.select == item.id){
                item.show = !item.show;
            }else{
                rows.child.map(v=>v.show = false);
                rows.select = item.id;
                item.show = true;
            }
            
            this.$forceUpdate()
        },
        selectSucces(){
            let postInfo = {};
            postInfo.router_id = this.router_id;
            let result = [];
            this.process.map(v=>{
                if(v.select){
                    result.push(v.select)
                }
            })
            postInfo.procedure = result.join(',')
            postInfo.bottom = JSON.stringify(this.tableData)
            this.axios.post('/api/save_orders_procedure',postInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功')
                    this.show = false
                    this.$emit('then')
                }
            })
            
        },
        cancel(){
            this.show = false;
            this.$emit('cancel',[])
        },
        getData(row,type){
            this.axios.post('/api/select_route_to_production',row).then(res=>{
                type == 1 ? '' : res.data.route_list.map(v=>v.show = v.show == 1 ? true : false)
                res.data.procedure.map(v=>{
                    v.child.map(k=>{
                        if(v.select == k.id){
                            v.show = true
                        }else{
                            v.show = false
                        }
                    })
                })
                this.tableData = res.data.bottom;
                type == 1 ? '' : this.list = res.data.route_list;
                this.process = res.data.procedure
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.modal-page{width:100%;max-height:600px;overflow: scroll;
    .item-box{display: flex;padding-top:10px;
        .item{padding:2px 20px;color:#999999;border-radius:20px;background:#F4F5F7;border:1px solid #DEDEDE;margin-right:24px;cursor:pointer;}
        .item-foc{background: #fff;color:#3764FF;border: 1px solid #3764FF;}
        .pro-item{display: flex;align-items: center;align-items: center;}
    }
    .item-radio{width:20px;height:20px;border:1px solid #DEDEDE;border-radius:50%;margin-right:5px;position:relative;top:-2px;}
    .radio-foc{display: flex;justify-content:center;align-items:center;border:1px solid #3764FF;
        .item-center{width:10px;height:10px;background:#3764FF;border-radius:50%;}
    }
}
.select-route{height:400px;overflow: hidden;}
</style>
<template>
    <div>
        <Toptitle :title='type == 1 ? "新增角色" : (type == 2 ? "编辑角色" : "查看角色") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>
        <div class="page-edit">
            <Form inline style="margin:10px 0;">
                <FormItem label="ID" :label-width="20">
                    <Input v-model="id" disabled placeholder="自动生成"></Input>
                </FormItem>
                <FormItem label="角色分类名称" :label-width="100">
                    <Input v-model="group_title" placeholder="请输入角色分类名称"></Input>
                </FormItem>
            </Form>

            <div>
                <span>使用权限：</span>
                <div style="padding:10px 0;">
                    <Collapse>
                        <Panel v-for="(item,index) of jurisdiction" :key="item.id" :name="index+''">
                            <Checkbox @on-change.self="changeCheck($event,item)" v-model="item.show_state">{{item.title}}</Checkbox>
                            <div slot="content">
                                <!-- 此处为菜单项的渲染方式  -->
                                <Collapse v-if="item.sub">
                                    <Panel v-for="(_item,_index) of item.sub" :key="_item.id" :name="_index+''">
                                        <Checkbox @on-change="changeCheck($event,_item)" v-model="_item.show_state" :value="item.state">{{_item.title}}</Checkbox>
                                        <div slot="content">
                                             <Checkbox v-for="__item of _item.sub" :key="__item.id" @on-change="changeCheck($event,__item)" v-model="__item.show_state">{{__item.title}}</Checkbox>
                                        </div>
                                    </Panel>
                                </Collapse>
                                <!-- 此处为非菜单项渲染方式 -->
                               
                            </div>
                        </Panel>
                    </Collapse>
                </div>
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
            group_id:null,
            jurisdiction:[],//权限列表
            is:true,
            menu_ids:[],
            group_title:'',
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id||'';
        this.group_title = this.$route.query.group_title||'';
        if(this.id){
            this.getData({group_id:this.id})
        }else{
            this.getData()
        }
        
        
    },
    watch:{
        // jurisdiction:{
        //     deep:true,
        //     handler:function(news){
        //         news.map(v=>{
        //             if(v.show_state){
        //                 v.sub.map(k=>{
        //                     k.show_state = true
        //                     this.menu_ids.push(k.id)
        //                     if(k.show_state){
        //                         if(k.sub){
        //                             k.sub.map(z=>{
        //                                 z.show_state=true
        //                                 this.menu_ids.push(z.id)
        //                             })
        //                         }
                                
        //                     }
        //                 })
        //             }else{
        //                 //取消全选操作
        //                 if(!v.show_state){
        //                     v.sub.map(k=>{
        //                         k.show_state = false;
        //                         let index = this.menu_ids.findIndex(q=>q == k.id);
        //                         this.removeItems(index)
        //                         k.sub.map(z=>{
        //                             z.show_state = false;
        //                             let index = this.menu_ids.findIndex(d=>d == z.id);
        //                             this.removeItems(index)
        //                         })
        //                     })
        //                 }
        //             }
        //         })
        //         console.log(this.menu_ids)
        //     }
        // }
    },
    methods:{
        postData(){
            let postInfo,op;
            if(this.type == 1){
                postInfo = {
                    op:'add',
                    group_title:this.group_title
                }
            }else{
                postInfo = {
                    op:'edit',
                    id:this.id,
                    group_title:this.group_title
                }
            }
            this.axios.post('/api/group',postInfo).then(res=>{
                if(res.code == 200){
                    let id = res.data.id
                    this.postStystem(id)
                }
            })
        },
        postStystem(id){
            let menus = JSON.stringify(this.menu_ids)
            this.axios.post('/api/user_permission',{id:id,menu:menus,op:this.type == 1 ? 'add' : 'edit'}).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg);
                    this.back();
                }
            })
        },
        getData(row){//获取所有权限
            this.axios('/api/permission',{params:row}).then(res=>{
                let result = this.deepObjToArray(res.data)
                result.map(v=>{
                    v.show_state = v.state == 1 ? true : false;
                    if(Array.isArray(v.sub)){
                        v.sub.map(k=>{
                            k.show_state = k.state == 1 ? true : false
                        })
                    }
                })
                this.jurisdiction = result
            })
        },
        back(){
            this.$router.go(-1)
        },
        deepObjToArray(obj){
            let result = Object.values(obj);
            result.map(v=> this.func.isType(v.sub) == 'Object' ? v.sub = this.deepObjToArray(v.sub) : '' )
            return result
        },
        removeItems(index){
            this.menu_ids.splice(index,1);
        },
        changeCheck(evt,row){
            if(evt){
                row.state = 1;
                row.show_state = true;
                this.menu_ids.push(row.id)
                if(row.sub){
                    row.sub.map(v=>{
                        v.state = 1;
                        v.show_state = true;
                        this.menu_ids.push(v.id)
                    })
                }
            }else{
                row.state = 0;
                row.show_state = false;
                if(row.sub){
                    row.sub.map(v=>{
                        v.state = 0;
                        v.show_state = false;
                        let index = this.menu_ids.findIndex(v=>v == row.id);
                        this.removeItems(index)
                    })
                }
                let index = this.menu_ids.findIndex(v=>v == row.id);
                this.removeItems(index)
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;padding-bottom: 20px;;}
</style>
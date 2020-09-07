<template>
    <div class="general">
        <div class="gen-form" v-for="(item,index) in list" :key="index">
            <Form style="position:relative" inline >
                <Icon v-if="index == 0 ? false : true"  @click="close(index,list)" size='20' class="delete-img" type="ios-close-circle" />
                <FormItem :label="_item.title" v-for="(_item,_index) in item.info" :key="_index">
                    <div 
                    :is='_item.name'
                    :placeholder='_item.placeholder'
                    v-model="_item.value"
                    :clearable='_item.clearable==false ? false : true'
                    :style="_item.width ? 'width:'+_item.width+'px' : 'width:200px;'"
                    >
                        <Option v-for="(__item,__index) in _item.option" :key="__index" :label="__item.label" :value="__item.value"></Option>
                    </div>
                </FormItem>
            </Form>
        </div>

        <div class="add-item">
            <div class="add" @click="addItems">
                <Icon size='50' type="md-add" />
                <span>新增部件</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        list:Array,
        default:null,
    },
    data(){
        return {
            // list:[
            //     {
            //         info:[
            //             {
            //                 title:'123',
            //                 name:'Input',
            //                 serverName:'title',
            //                 placeholder:'请输入',
            //                 value:'123'
            //             },
            //             {
            //                 title:'标签',
            //                 name:'Select',
            //                 serverName:'label',
            //                 option:[
            //                     {
            //                         label:'test1',
            //                         value:1
            //                     },
            //                 ]
            //             }
            //         ]
            //     },
                
            // ],
           
        }
    },
    methods:{
        addItems(e){
            if(this.list.length<1){
                return this.$Message.error('数据出问题了')
            }
            let add_obj = JSON.parse(JSON.stringify(this.list[0]));
            if(add_obj.info){
                add_obj.info.map(v=>v.value ? v.value='' : '')
                this.list.push(add_obj)
            }
        },
        close(index,arr){
            arr.splice(index,1);
        }
    }
}
</script>

<style lang="scss" scoped>
.general{width:100%;
    .gen-form{
        position:relative;padding:10px;background:#F4F5F7;border-radius:5px;margin-bottom:10px;
    }
    .add-item{width:100%;height:138px;border:1px dotted #B0ACAC;display: flex;justify-content: center;align-items: center;border-radius:5px;
        .add{display: flex;flex-direction: column;align-items: center;justify-content: center;}
    }
}
.delete-img{position:absolute;right:10px;top:10px;color:red;}
</style>
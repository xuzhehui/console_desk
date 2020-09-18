<template>
    <div style="padding:10px 0;">
        <div class="items" v-for="(item,index) in list" :key="index">
            <span class="iten-title">{{item.title}}:</span>
            <div
            :class="['margin',item.name=='Radio' || item.name=='CheckboxGroup' ? 'checkbox-item' : '']"
            :key="index" 
            :is="item.name" 
            :size="item.size ? item.size : 'small'"
            :placeholder="item.placeholder"
            :clearable ="!item.clearable ? true : false"
            :disabled="item.disabled"
            :filterable='item.filterable'
            :multiple='item.multiple'
            v-model="item.value"  
            :type="item.type"  
            v-if="!item.isDate"  
            :style="item.width ? 'width:'+item.width+'px' : ''" 
            @on-change="item.change ? change($event,index) : ''"
            >
                <Checkbox v-for="(_item,_index) in item.checklist" :key="_index" :label="_item.label"></Checkbox>
                <Option v-for="(_item,_index) in item.option" :key="_index" :label="_item.label" :value="_item.value"></Option>
            </div>

            <div class="items" v-if="item.isDate">
                <DatePicker :type='item.type ? item.type : "data"' v-model="item.start_value"  size='small'  :placeholder="item.start_placeholder" class="margin"></DatePicker>
                ~
                <DatePicker :type="item.type ?item.type : 'data'" v-model="item.end_value" size='small' :placeholder="item.end_placeholder" class="margin"></DatePicker>
            </div>
        </div>
        <Button v-if="showbtn" @click="searchData" :type="btnType" size="small">{{btnName}}</Button>
    </div>
</template>
 
<script>
export default {
    props:{
        list:{
            type:Array,
            required:true,
        },
        btnName:{
            type:String,
            default:"搜索"
        },
        btnType:{
            type:String,
            default:"primary"
        },
        showbtn:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {}
    },
    created(){
        
    },
    mounted() {
        let obj = {}   
        this.$emit("init",this.filterDats(obj));
    },
    methods:{
        change(){
            this.$emit("changeSelected",this.list)
        },
        searchData(){
            let obj = {}
            this.filterDats(obj);
            this.$emit("searchData",obj);
        },
        setDate(time){
            let data = '';
            if(Object.prototype.toString.call(time) === "[object Date]"){
                data = new Date(time).toLocaleDateString().replace(/\//g,"-")
            } 
            return data
        },
        filterDats(obj){
            this.list.map(v=>{
                if(v.isDate){
                    obj[v.start_server] = this.setDate(v.start_value);
                    obj[v.end_server] = this.setDate(v.end_value);
                }
                if(Object.prototype.toString.call(v.value) === "[object Date]"){
                    v.value = new Date(time).toLocaleDateString().replace(/\//g,"-")
                }                
                v.serverName ? obj[v.serverName] = (typeof v.value === "number"&&v.value === 0 ? 0 : v.value) : '';  
                if(v.value == "null"){
                    obj[v.serverName] = null;
                }            
            })
            return obj
        }
    },
    
}
</script>

<style lang="scss" scoped>
.margin{width:150px;margin:10px;}
.checkbox-item,.items{width:auto;display: inline-block;}
.iten-title{color:#333;}
</style>
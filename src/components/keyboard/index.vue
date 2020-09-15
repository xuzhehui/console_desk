<template>
    <div class="keyboard">
        <div class="key-title">
            请输入公式  <span>(请在软键盘内完成操作)</span>
        </div>
        <div class="key-setup">
            <div class="show">{{result.join('')}}</div>
            <div class="key-box" >
                <div class="left-key" @click="clickItem">
                    <div :data-key='item' :class="['left-key-items',index == 0 || index == (key_list_left.length-2) ? 'left-key-long' : '']" v-for="(item,index) of key_list_left" :key="index">{{item}}</div>
                </div>
                <div class="right-key" @click="clickItem">
                    <div class="right-key-row" v-for="(item,index) of key_list_right" :key='index'>
                        
                        <div :data-key='_item.e_title' class="right-item" v-for="(_item,_index) of item" :key="_index">{{_item.e_title+'('+_item.title+')'}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="key-footer">
            <Button @click="cancel" style="margin-right:20px;">取消</Button>
            <Button @click="success" type='primary'>确认</Button>
        </div>

        
    </div>
</template>

<script>
export default {
    props:{
        rightData:Array,
        default:null
    },
    data(){
        return {
            key_list_left:[
                'C','7','8','9','(',')','4','5','6','+','*','1','2','3','-','/','0','.'
            ],
            key_list_right:[
                // 'L','L1','L2',
            ],
            result:[],
            revoke_str:'',
        }
    },
    watch:{
        rightData(e){
            let result = []
            e.map(v=>{
                // let str = `${v.title}(${v.e_title})`
                result.push(v)
            })
            this.key_list_right = result;
            this.key_list_right =  this.spliceGroup(this.key_list_right,4)
            console.log(this.key_list_right)
            this.$forceUpdate()
        }
    },
    computed:{
    },
    created(){
        this.axios('/api/basics_measure_index').then(res=>{
            console.log(res)
        })
    },
    mounted(){
        this.key_list_right =  this.spliceGroup(this.key_list_right,4)
    },
    methods:{
        spliceGroup(arr,n){
            let index = 0
            let new_arr = []
            while (index<arr.length){
                new_arr.push(arr.splice(index,n))
            }
            return new_arr
        },
        clickItem(e){
            let key_code = e.target.dataset.key//此处用到了事件委托，当点击到中间的缝隙时直接跳出函数
            if(key_code == 'C'){
                this.result.pop()
            }else{
                this.result.push(key_code)
            }
            
            this.$emit('click',this.result)
        },
        success(){
            this.$emit('success',this.result.join(''))
            this.result = [];
        },
        cancel(){
            this.$emit('cancel','')
            this.result = [];
        }
    }
}
</script>

<style lang="scss" scoped>
.keyboard{
    .key-title{font-size: 22px;color:#333333;span{font-size:16px;color:#666666;}padding:20px 0;}
    .key-setup{padding:32px 76px;background:#D3D5DD;}
    .key-box{display: flex;
        .left-key{display: flex;width:670px;flex-wrap:wrap;
             .left-key-items{width:124px;height:80px;display: flex;justify-content: center;align-items: center;background:#fff;margin-right:10px;margin-top:10px;
                font-size:26px;color:#333;border-radius:5px;cursor: pointer;
             }
             .left-key-long{width:258px;}
        }
        .right-key{display: flex;
            .right-key-row{
                .right-item{width:124px;height:80px;display: flex;justify-content: center;align-items: center;
                    margin-right:10px;margin-top:10px;background: #F48B01;color:#fff;border-radius: 5px;
                    cursor: pointer;
                }
                &:last-child{
                    .right-item{margin-right:0;}
                }
            }
        }
    }
    .show{height:84px;background: #fff;border-radius: 5px;display: flex;justify-content: center;align-items: center;font-size:32px;color:#333333;}
}
.key-footer{display: flex;justify-content:flex-end;padding-top:20px;}
</style>
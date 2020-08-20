<template>
    <div class="confirm-d">
        <Modal class-name="vertical-center-modal" :title='title' v-model="show" :width="444">
            <div class='content-modal'>{{content}}</div>
            <div class="modal-footer" slot="footer">
                <Button @click="cancel">取消</Button>
                <Button @click="then" :type="type ? type :'error'">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show:false,
        }
    },
    destroyed(){
        this.show = false
    },
    methods:{
        then(){
            this.$emit('then')
        },
        cancel(){
            this.$emit('cancel')
        },
        close(){
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-footer{display: flex;justify-content:flex-end;}
</style>
<style lang="scss">
.content-modal{display: flex;justify-content: center;align-items: center;}
.vertical-center-modal{display: flex;align-items: center;justify-content: center;
    .ivu-modal{top: 0;}
}
</style>
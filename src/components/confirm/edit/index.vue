<template>
    <div>
        <Modal class-name="vertical-center-modal" :title='title' v-model='show' :width="400">
            <div>
                <Input v-model="info" :placeholder="placeholder"/>
            </div>
            <div class="modal-footer" slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="then" >确认</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
    export default{
        methods:{
            then(){
                this.$emit('then')
            },
            cancel(){
                this.$emit('cancel')
            }
        }
        
    }
</script>
<template>
    <div>
        <Topsearch :list='list'></Topsearch>
    </div>
</template>

<script>

export default {
    data(){
        return {
            list:[
                {name:'Select',title:'类型',placeholder:'ceshi',value:'',opation:[
                    {label:'asdasda',value:1}
                ]}
            ]
        }
    },

}
</script>
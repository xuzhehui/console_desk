<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang='scss'>
html,body,#app{width:100%;height:100%;margin:0;padding:0;overflow: hidden;}
table-edit-set{margin-right:10px;color:#3764FF;cursor:pointer}
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  border-radius: 10px;
}
::-webkit-scrollbar-track-piece {
  background: transparent;
}

</style>

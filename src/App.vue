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
.vertical-center-modal{
    display: flex;
     align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}

.log-list{display: flex;flex-wrap:wrap;padding:10px 0;color:#666;}
.log-item{margin-right:40px;margin-bottom:20px;
  span{
    &:last-child{color:#333;font-weight:bold;}
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;padding-bottom: 20px;;}
.ivu-form-item{margin-bottom:10px!important;}
</style>

<template>
  <div class="content">
    <h1>切换管理</h1>
    {{m[0]}}
    <el-button @click="changeData">更改</el-button>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'switch',
  data(){
    return {
      a:{
        b:{
          c:5
        }
      },
      m:[1]
    }
  },
  methods:{
    changeData(){
      this.m[0] = 2;
    }
  }
};
</script>
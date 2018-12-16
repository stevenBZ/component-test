<template>
  <div class="content">
    <el-breadcrumb style="margin:5px 0 10px 5px" separator="/">
      <el-breadcrumb-item>页面二</el-breadcrumb-item>
      <el-breadcrumb-item>task</el-breadcrumb-item>
    </el-breadcrumb>
    <mind-map></mind-map>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'page2',
    components: {
        'mindMap': () => import('../components/MindMap/index.vue')
    }
};
</script>
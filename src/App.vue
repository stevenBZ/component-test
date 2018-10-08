<template>
  <el-container class="container">
    <!-- <pageHeader /> -->
    <el-header class="header">
      <div>
        <img style="height: 42px" src="//haitao.nos.netease.com/fb11aa98-5098-4048-a4ad-1e10b78e8864.svg" alt="logo">
      </div>
      <div class="logo_titleWrap">
        <h1 class="logo_title">考拉 | 后台系统</h1>
      </div>
    </el-header>
    <el-container>
      <el-aside class="sider" width="200px">
        <el-menu 
          default-active="/"
          router="true">
          <el-menu-item v-for="(item, index) in catalog" :key="index" :index="item.url">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.title }}</span>  
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view/>
        <el-footer  :height="footerHeight" class="footer">
          <p class="f-tac">本系统由网易无尾熊（杭州）科技有限公司提供技术支持</p>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import catalog from './config/catalog';
// import pageHeader from './container/pageHeader/pageHeader';
export default {
    name: 'App',
    data() {
        return {
            catalog,
            footerHeight: '30px'
        };
    },
    components: {
        pageHeader: () => import('./container/pageHeader/pageHeader')
    }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  border-bottom: solid 1px #e6e6e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  background:#23364a;
}
.logo_titleWrap{ margin-left:10px; color:#fff;}
.logo_title { line-height: 20px;  font-size: 16px;  font-weight: normal; }
.f-tac {text-align:center;}
.footer {
  font-size : 10px;
  color : #ccc;
  /* border-top: solid 1px #e6e6e6; */
}
.sider {
  border-right: solid 1px #e6e6e6;
}
</style>

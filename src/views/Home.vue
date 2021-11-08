<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);text-align: left;">
        <el-menu  router :default-active="$route.path" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title" ><i class="el-icon-message"></i>Swiper Table</template>
            <el-menu-item index="/swiper-table">Swiper Table DEMO</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px;background: rgb(238, 241, 246);display: flex;align-items: center;justify-content: end;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>xxx</span>
        </el-header>

        <el-main>
            <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
  data(){
    return{
      isCollapse: false,
    }
  }
};
</script>

<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-menu router :default-active="$route.path" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">Base Table</span>
          </template>
          <el-menu-item index="/base-table">Base Table DEMO</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">Roll Table</span>
          </template>
          <el-menu-item index="/roll-table">Roll Table DEMO</el-menu-item>
        </el-submenu>
      </el-menu>

      <el-container>
        <el-header style="
            text-align: right;
            font-size: 12px;
            background: rgb(238, 241, 246);
            display: flex;
            align-items: center;
            justify-content: end;
          ">
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
    components: {},
    data() {
      return {
        isCollapse: false,
      };
    },
    created() {
      this.$nextTick(() => {
        window.onload = ()=>{this.setCollapse()};
        window.onresize = ()=>{this.setCollapse()};
      })
    },
    methods: {
      setCollapse() {
        if (document.querySelector('#app').clientWidth <= 1400) {
          this.isCollapse = true;
        } else {
          this.isCollapse = false;
        }
      }
    }
  };
</script>
<style>
  .el-menu:not(.el-menu--collapse) {
    text-align: left;
  }
  .el-menu--collapse.el-menu {
  }
</style>
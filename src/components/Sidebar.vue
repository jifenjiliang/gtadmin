<template>
  <aside>
    <menu class="menu">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/logo.png" alt="logo">
        </router-link>
      </div>
      <div class="slidenav">
        <el-row class="tac">
          <el-col>
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
              <el-submenu index="1">
                <template slot="title"> <i class="el-icon-setting"></i>用户管理
                </template>
                <el-menu-item index="/customer">客户管理</el-menu-item>
                <el-menu-item index="/connection">人脉管理</el-menu-item>
                <el-menu-item index="/personal">个人用户管理</el-menu-item>
                <el-menu-item index="/organum">组织用户管理</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-upload"></i>内容管理
                </template>
                <el-menu-item index="/activity">活动管理</el-menu-item>
                <el-menu-item index="/demand">需求管理</el-menu-item>
                <el-menu-item index="/question">问答管理</el-menu-item>
                <el-menu-item index="/movie">视频管理</el-menu-item>
                <el-menu-item index="/knowledge">知识管理</el-menu-item>
                <el-menu-item index="/ecology">生态推荐</el-menu-item>
                <el-menu-item index="/column">公用栏目管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-star-on"></i>支付统计</template>
                <el-menu-item index="/payment">用户支付清单</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-d-caret"></i>会员管理</template>
                <el-menu-item index="/member">会员列表</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-time"></i>PGC内容管理</template>
                <el-menu-item index="/headlines">动态头条</el-menu-item>
                <el-menu-item index="/paulownia">金桐精选</el-menu-item>
                <el-menu-item index="/mail">站内信</el-menu-item>
               <!-- <el-menu-item index="/experts">热门专家</el-menu-item>-->
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-document"></i>版本管理</template>
                <el-menu-item index="/version">版本记录</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

      </div>
    </menu>
  </aside>
</template>

<script>

  export default {
    computed:{
      onRoutes(){
        return this.$route.path.replace('#/','');
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .menu{
    position: fixed;
    left:0;
    top:0;
    width: 12.5%;
    height:100%;
    min-width:160px;
    background: #313541;
    z-index: 10;
    .logo{
      display: block;
      height: 80px;
      background: #f85f48;
      text-align:center;
      img{
        margin: 24px auto 0 -10px;
      }
    }
    .el-submenu .el-menu-item{
      min-width: 0;
    }
  }
  .el-menu--dark{
    background-color: #313541;
  }
  .slidenav{
    ul li.is-active.is-opened{
      ul li.is-active a{
        color: #f85f48;
      }
    }
    a{
      color: white;
    }
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
    color: #f85f48;
  }
</style>

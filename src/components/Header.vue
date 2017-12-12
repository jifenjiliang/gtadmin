<template>
  <header>
    <div class="title">金桐·运营中心</div>
    <div class="user-info">
      {{username}} &nbsp;&nbsp;&nbsp;
      <el-button type="primary" size="small" @click="Signout">退出</el-button>
    </div>
  </header>
</template>
<script>
  export default {
    data() {
      return {
        username: '',
      }
    },
    created(){
        this.username = JSON.parse(localStorage.getItem('currentUser')).name;
        if(this.username == null || this.username ==undefined || this.username==""){
          localStorage.removeItem('user');
          localStorage.removeItem('sessionID');
          this.$router.push('/login');
        }
    },
    methods:{
      Signout(){
        localStorage.removeItem('user');
        localStorage.removeItem('sessionID');
        this.$router.push('/login');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 20px;
    line-height: 70px;
    color: #333;

    .title{
      height: 60px;
      line-height: 60px;
      background: white;
      border-bottom: 1px solid #e1e1e5;
      box-shadow:2px 0 6px rgba(13, 4, 9, 0.1);
      font-size: 24px;
      z-index: 10;
      text-indent: 13.5%;
    }
    .logo{
      float: left;
      width:220px;
      text-align: center;
    }
    .user-info {
      float: right;
      position:absolute;
      top:-6px;
      right:30px;
      font-size: 14px;
    }

  }
</style>


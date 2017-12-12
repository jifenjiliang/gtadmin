<template>
  <div class="version_add">
    <section class="section">
	    <div class="loation"><router-link to="/version">版本管理</router-link> >>新建版本</div>
	    <div class="version_add_body">
	      <SiteBody :type="type"></SiteBody>
	    </div>
	  </section>
  </div>
</template>

<script>

  import versionbody from './versionbody.vue'

  export default {
    name:'addversion',
    components : {
      'SiteBody' : versionbody,
    },
    computed:{
    },
    data:function () {
      return {
        type: 'add',
      }
    },
    methods:{
      handleClick(tab, event) {
        //console.log(tab, event);
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
  .table-body{
    background: white;
    margin-top: 10px;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
  .version_add_body{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 30px 0 20px;
  }
</style>
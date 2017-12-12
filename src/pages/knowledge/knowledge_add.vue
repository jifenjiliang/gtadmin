<template>
  <div class="knowledge_add">
    <section class="section">
	    <div class="loation"><router-link to="/knowledge">内容管理</router-link> >>><router-link to="/knowledge">知识管理</router-link> >>发布知识</div>
	    <!-- <SiteNav></SiteNav> -->
	    <!-- knowledge_add_body -->
	    <div class="knowledge_add_body">
	      <SiteBody :type="type"></SiteBody>
	    </div>
	</section>
  </div>
</template>

<script>

  import knowledgebody from './knowledgebody.vue'
  import nav from './knowledgetabs'

  export default {
    name:'knowledge_add',
    components : {
      'SiteBody' : knowledgebody,
      'SiteNav': nav,
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
  .knowledge_add_body{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 30px 0 20px;
  }
</style>
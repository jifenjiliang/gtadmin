<template>
  <div datafld="gtadmin">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <section>
        <keep-alive include="customer,connection,personal,organum,headlines,demand,question,movie,ecology,column,knowledge,version">
            <router-view></router-view>
        </keep-alive>
    </section>
  </div>
</template>
<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
  export default {
    components:{
      vHead, vSidebar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  section{
    margin: 0 0 15px 12.5%;
    min-width: 1060px;
  }
  .fade-enter-active, .fade-leave-active{
    transition: all .15s ease-in-out;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0;
  }
</style>




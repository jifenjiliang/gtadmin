<template>
	<div class="nav">
		<el-tabs v-model="activeName"  @tab-click="handleClick" type="border-card">
		  <el-tab-pane label="知识管理" name="first">知识列表</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	name:'knowledgetabs',
	data(){
		return{
			activeName: 'first',
		}
	},
	methods: {
		handleClick(tab, event) {
		  
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.nav{
	  margin-bottom: 15px;
	}
</style>
<template>
  <div class="mobileArea">
    <div class="sub-title">提示：可手动输入手机号码，并以半角逗号为分割，一次性发送号码无限制</div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2}"
      placeholder="请输入手机号码"
      v-model="mobile"
      @change="handleChangeMobileMsg">
    </el-input>
    <div class="sub-title">{{mobileMsg}}</div>
  </div>
</template>

<script>
  export default {
    name:'mobileArea',
    props:{
      success:{
        type:Function
      }
    },
    data() {
      return {
        mobile: '',
        mobileMsg: '您已经成功输入了 0个号码，其中移动号码0个，联通号码0个，电信号码0个。',
      }
    },
    methods:{
      handleChangeMobileMsg(val){
        /**
         *  改变提示语内容信息
         *  /^1[3458]\d{9}(?:\,1[3458]\d{9})*$/
         *  18600630394,18600630394,18600630394
         */
        var reg = /^1[3458]\d{9}(?:\,1[3458]\d{9})*$/;
        let vm = this,
            mobileArr = [],
            total = 0,//手机号码总数
            cmcc = 0, //移动号码总数
            cu = 0,   //联通号码总数
            ct = 0;   //电信号码总数
        if(val === ''){
          vm.mobileMsg = '您已经成功输入了 0个号码，其中移动号码0个，联通号码0个，电信号码0个。';
          return;
        }
        if(!reg.test(val)){
          vm.mobileMsg = '手机号码格式不正确！'
        }else{
          mobileArr = val.split(',');
          total = mobileArr.length;
          mobileArr.map(function (item,index,arr) {
            if(vm.$checkMobile(item) === "ChinaMobile"){cmcc += 1;}
            else if(vm.$checkMobile(item) === "ChinaUnion"){cu += 1;}
            else if(vm.$checkMobile(item) === "ChinaTelcom"){ct += 1;}
          })
          vm.mobileMsg = '您已经成功输入了 '+ total +'个号码，其中移动号码'+ cmcc +'个，联通号码'+ cu +'个，电信号码'+ ct +'个。';
          vm.success(val)
        }
      },
    }
  }
</script>
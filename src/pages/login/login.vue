<template>
  <div class="login-wrap">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>金桐·运营中心</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>

  function NewBase64() {
		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		// public method for encoding
		this.encode = function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		}
		// public method for decoding
		this.decode = function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		}
		// private method for UTF-8 encoding
		var _utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}
			return utftext;
	}
	// private method for UTF-8 decoding
	var _utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

  export default {
    name:'login-wrap',
    data: function(){
      return {
        loading:false,
        ruleForm: {
          username: '',
          password: '',
          "vCode":"",
          "sms":"",
          "index":1
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted : function(){
      this.$nextTick(function () {
        if(localStorage.sessionID && localStorage.currentUser.id == '1'){
          this.$router.push('/customer');
        }
      });
    },
    methods: {
      submitForm(formName) {
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
             self.loading = true;
            let base64 = new NewBase64();
            self.ruleForm.password =base64.encode(self.ruleForm.password);
            self.$http.post('/cross/web/login.json',JSON.stringify(self.ruleForm),{headers:{
              s:'web',
            }}).then(
              function (res) {
                  var result = res.data.responseData;
                  if(result.succeed == true){
                    var userInfo = JSON.stringify(result.user);
                    localStorage.setItem('currentUser',userInfo);
                    localStorage.setItem('sessionID',result.sessionId);
                    self.$router.push('/customer');
                  }else {
                    self.$message.error(res.body.notification.notifInfo);
                    self.loading = false;
                  }
              },function (res) {
                self.$message.error('登录失败，请稍后重试~');
                self.loading = false;
              }
            )
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped >
  .login-wrap{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box-card {
    width: 360px;
    box-shadow: 0 20px 76px 0 rgba(0,0,0,.12), 0 0 46px 0 rgba(0,0,0,.04);
  }
</style>

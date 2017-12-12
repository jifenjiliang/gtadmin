<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/customer">用户管理</router-link> >>><router-link to="/customer">客户管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="topicbody">
        <el-row>
          <el-col :span="24"><div class="grid-content">
            <!--工商信息-->
            <div class="topic_title">工商信息</div>
            <div class="topic_table topic_table_p">
              <el-row>
                <el-form ref="form" :model="form" label-width="90px">
                  <el-col :span="9">
                    <el-form-item label="客户全称">
                      <el-input :disabled="true" v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="法人">
                      <el-input :disabled="true" v-model="form.legal_representative"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="电话">
                      <el-input :disabled="true" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="邮箱">
                      <el-input :disabled="true" v-model="form.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="地区">
                      <!-- <el-input :disabled="true" v-model="form.ctype"></el-input>-->
                      <el-col :span="7">
                        <el-input :disabled="true" v-model="form.province"></el-input>
                      </el-col>
                      <el-col class="line" :span="1" style="text-align: center">-</el-col>
                      <el-col :span="7">
                        <el-input :disabled="true" v-model="form.city"></el-input>
                      </el-col>
                      <el-col class="line" :span="1" style="text-align: center">-</el-col>
                      <el-col :span="8">
                        <el-input :disabled="true" v-model="form.county"></el-input>
                      </el-col>

                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-form-item label="详细地址">
                      <el-input :disabled="true" v-model="form.address"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="所属行业">
                      <el-col :span="11">
                        <el-input :disabled="true" v-model="form.firstIndustry"></el-input>
                      </el-col>
                      <el-col class="line" :span="1" style="text-align: center">-</el-col>
                      <el-col :span="12">
                        <el-input :disabled="true" v-model="form.secondIndustry"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="上市信息">
                      <el-input :disabled="true" v-model="form.stock_type"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="经营状态">
                      <el-input :disabled="true" v-model="form.operating_state"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="统一社会信用代码">
                      <el-input :disabled="true" v-model="form.credit_code"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="工商注册号">
                      <el-input :disabled="true" v-model="form.registration_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="组织机构代码">
                      <el-input :disabled="true" v-model="form.organization_code"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="注册时间">
                      <el-input :disabled="true" v-model="form.set_up_time"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="营业期限">
                      <el-input :disabled="true" v-model="form.business_term"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="登记机关">
                      <el-input :disabled="true" v-model="form.registration_authority"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="核准日期">
                      <el-input :disabled="true" v-model="form.date_issue"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="注册资本">
                      <el-input :disabled="true" v-model="form.registered_capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="企业类型">
                      <el-input :disabled="true" v-model="form.ctype"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="曾用名">
                      <el-input :disabled="true" v-model="form.name_old"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="23">
                    <el-form-item label="经营范围">
                      <el-input :disabled="true" type="textarea" v-model="form.industry" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <!--股东信息-->
            <div class="topic_title">股东信息</div>
            <div class="topic_table">
              <el-table
                :data="shareholders"
                border
                style="width: 100%">
                <el-table-column
                  prop="shar_name"
                  label="股东"
                  width="400"
                  >
                </el-table-column>
                <el-table-column
                  prop="investment_rate"
                  label="持股比例"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="investment"
                  label="认缴出资额（万元）">
                </el-table-column>
              </el-table>
            </div>
            <!--主要人员-->
            <div class="topic_title">主要人员</div>
            <div class="topic_table">
              <el-table
                :data="people"
                border
                style="width: 100%">
                <el-table-column
                  prop="pname"
                  label="执行董事"
                  width="250"
                >
                </el-table-column>
                <el-table-column
                  prop="job"
                  label="职位"
                  width="250"
                >
                </el-table-column>
                <el-table-column
                  prop="web"
                  label="个人主页"
                >
                </el-table-column>
              </el-table>
            </div>
            <!--对外投资-->
            <div class="topic_title">对外投资</div>
            <div class="topic_table">
              <el-table
                :data="investment"
                border
                style="width: 100%">
                <el-table-column
                  prop="cname"
                  label="被投资企业名称"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="legp"
                  label="被投资法人"
                  width="250">
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="注册资本"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="investment"
                  label="投资数额"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="投资占比"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="注册时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="状态"
                 >
                </el-table-column>
              </el-table>
            </div>
            <!--变更记录-->
            <div class="topic_title">变更记录</div>
            <div class="topic_table" style="margin-bottom: 100px">
              <el-table
                border
                :data="change"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="time_change"
                  label="变更日期"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="content_change"
                  label="变更项目"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="before_change"
                  width="180"
                  label="变更前">
                </el-table-column>
                <el-table-column
                  prop="after_change"
                  label="变更后">
                </el-table-column>
              </el-table>
            </div>
            <div class="back">
              <router-link to="/customer">
                <el-button type="success">&nbsp;返回&nbsp;</el-button>
                </router-link>
            </div>
          </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name:'topic',
    computed:{
    },
    data:function () {
      return {
        api: '/cross/organ/customer/findDigDataById.json',
        picLogo:'',
        form: {},
        shareholders: [],
        people:[],
        investment:[],
        change:[],

      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.todic();
      })
    },
    methods:{
      todic:function () {
        var that =  this;
        var formcustomerId ={
          'customerId':that.$route.params.id
        };
        that.$http.post(that.api,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
            that.picLogo = res.data.customer.picLogo ? res.data.customer.picLogo : 'http://file.online.gintong.com/web1/organ/avatar/default.jpeg';
            that.form =  res.data.customer;
            that.shareholders = res.data.customer.shareholders;
            that.people = res.data.customer.people;
            that.investment = res.data.customer.investment;
            that.change = res.data.customer.change;
          },function (res) {
            console.log(res)
          }
        )
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
  @font16:16px;
  @font14:14px;
  .topicbody{
    .people{
      width: 100px;
      height: 100px;
      border-radius: 100%;
      margin-top: 30px;
    }
  }
  .grid-content{
    display: block;
    .topic_title{
      display: block;
      line-height: 50px;
      font-size: 18px;
      margin-top: 10px;
    }
    .topic_table{
      display: block;
    }
    .topic_table_p{
      background: white;
      padding: 40px 0 40px 40px;
      border: 1px solid #eaeaeb;
    }
    .el-form-item__label{
      font-size:  @font14;
    }
  }
  .el-table th{
    background: white;
  }
  .el-table__fixed-header-wrapper thead div, .el-table__header-wrapper thead div{
    background: white;
    color: #448aff;
    font-size:  @font16;
  }
  .el-table td, .el-table th{
    height: 60px;
  }
  .el-table .cell{
    font-size:  @font14;
  }
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
    background-color: white;
    line-height: 50px;
  }
</style>

<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/demand">内容管理</router-link> >>><router-link to="/demand">需求管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="topicbody">
        <!--需求标题-->
        <el-row>
          <el-col :span="24">
            <dl class="topic_t">
              <dt>需求标题：</dt>
              <dd>{{title}}</dd>
            </dl>
          </el-col>
        </el-row>
        <!--发布人-->
        <el-row>
          <el-col :span="24">
            <dl class="topic_t">
              <dt>发布人：</dt>
              <dd>{{ownerName}}   <span>发布时间：{{createTime | format}}</span>  <span>阅读人数：{{readCount}}</span></dd>
            </dl>
          </el-col>
        </el-row>
        <!--不同类型的需求字段-->
        <el-row>
          <el-col :span="24">
            <!--模板：金融-投资、融资-->
            <el-form   v-if="finance"  :model="Finance" label-width="80px">
              <el-col :span="9">
                <el-form-item label="分类">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Finance.AA"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Finance.BB"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Finance.CC"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Finance.DD"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Finance.EE"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Finance.FF"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Finance.GG"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="5">
                    <el-input :disabled="true" v-model="Finance.HH"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="5">
                    <el-input :disabled="true" v-model="Finance.II"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="5">
                    <el-input :disabled="true" v-model="Finance.KK"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="5">
                    <el-input :disabled="true" v-model="Finance.LL"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Finance.MM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9"  :offset="1">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Finance.NN"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!--模板：教育-找老师、职业咨询；
              法律-找律师、法律咨询；
              大数据-找数据开发、数据服务-->
            <el-form v-if="teacher"  :model="Teacher" label-width="80px">
              <el-col :span="9">
                <el-form-item label="分类">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Teacher.AA"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Teacher.BB"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Teacher.CC"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Teacher.DD"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Teacher.EE"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Teacher.FF"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Teacher.GG"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Teacher.HH"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Teacher.II"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Teacher.JJ"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Teacher.KK"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9"  :offset="1">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Teacher.LL"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!--模板：医疗-找医生、医疗咨询-->
            <el-form v-if="doctor"  :model="Doctors" label-width="80px">
              <el-col :span="9">
                <el-form-item label="科室">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Doctors.AA"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Doctors.BB"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Doctors.CC"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Doctors.DD"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Doctors.EE"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Doctors.FF"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Doctors.GG"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Doctors.HH"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Doctors.II"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Doctors.JJ"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9"  :offset="1">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Doctors.KK"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!--模板：人力资源-HR培训；其它类型-->
            <el-form v-if="human" ref="Human" :model="Human" label-width="80px">
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Human.AA"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Human.BB"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Human.CC"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Human.DD"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Human.EE"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Human.FF"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Human.GG"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Human.HH"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Human.II"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Human.JJ"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!--模板：产品开发-找人才-->
            <el-form v-if="development"  ref="Development" :model="Development" label-width="80px">
              <el-col :span="9">
                <el-form-item label="需求分类">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Development.AA"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Development.BB"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Development.CC"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Development.DD"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Development.EE"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Development.FF"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Development.GG"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Development.HH"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Development.II"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Development.JJ"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9"  :offset="1">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Development.KK"></el-input>
                </el-form-item>
              </el-col>
            </el-form>

            <!--模板：产品开发-项目开发-->
            <el-form v-if="project"   ref="Project " :model="Project" label-width="80px">
              <el-col :span="9">
                <el-form-item label="项目周期">
                  <el-col :span="20">
                    <el-input :disabled="true" v-model="Project.AA"></el-input>
                  </el-col>
                  &nbsp;天
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Project.BB"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Project.CC"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Project.DD"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Project.EE"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Project.FF"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="金额">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Project.GG"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Project.HH"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Project.II"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :disabled="true" v-model="Project.JJ"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9"  :offset="1">
                <el-form-item label="电话">
                  <el-input :disabled="true" v-model="Project.KK"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!--模板：人力资源-职位招聘-->
            <el-form v-if="recruitment" ref="c" :model="Recruitment" label-width="80px">
              <el-col :span="9">
                <el-form-item label="职位名称">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.AA"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="职能">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Recruitment.BB"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Recruitment.CC"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="薪资范围">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.DD"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="招聘公司">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.EE"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地区">
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Recruitment.FF"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="7">
                    <el-input :disabled="true" v-model="Recruitment.GG"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="8">
                    <el-input :disabled="true" v-model="Recruitment.HH"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="学历要求">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.II"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="工作经验">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.JJ"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="描述">
                  <el-col :span="21">
                    {{Recruitment.KK}}
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="职位卖点">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.LL"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="招聘邮箱">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.MM"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="推荐奖励">
                  <el-col :span="20">
                    <el-input :disabled="true" v-model="Recruitment.NN"></el-input>
                  </el-col>
                  &nbsp;元/人
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="有效期">
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Recruitment.OO"></el-input>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align: center">-</el-col>
                  <el-col :span="10">
                    <el-input :disabled="true" v-model="Recruitment.PP"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="联系人">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.QQ"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="电话">
                  <el-col :span="21">
                    <el-input :disabled="true" v-model="Recruitment.RR"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </el-row>
        <!--需求描述-->
        <el-row>
          <el-col :span="24">
            <div class="Requirement">
              {{noteIgnoreHtml}}
            </div>
          </el-col>
        </el-row>
        <!--附件-->
        <el-row v-if="notenote">
          <el-col :span="24">
            <dl class="topic_t">
              <dt>附件：</dt>
              <dd v-html="note"></dd>
            </dl>
          </el-col>
        </el-row>
        <!--目录-->
        <el-row>
          <el-col :span="24" v-if="topic_categoryIds">
            <dl class="topic_t">
              <dt>目录：</dt>
              <dd>
                <span v-for="int in categoryIds"> {{int.name}}</span>
              </dd>
            </dl>
          </el-col>
        </el-row>
        <!--标签-->
        <el-row>
          <el-col :span="24" v-if="topic_tags">
            <dl class="topic_t">
              <dt>标签：</dt>
              <dd v-for="io in tags">
                <span>{{io.name}}</span>
              </dd>
            </dl>
          </el-col>
        </el-row>
        <!--关联-->
        <el-row>
          <el-col :span="24" v-if="concols">
            <dl class="topic_t2">
              <dt>关联：</dt>
              <dd>
                <p>人：
                  <span v-for="itm in Pers"> {{ itm.assocTitle }}</span>
                </p>
                <p>组织：<span v-for="p in org">{{p.assocTitle}}</span></p>
                <p>知识：<span v-for="p in kwo">{{p.assocTitle}}</span></p>
                <p>需求：<span v-for="p in deo">{{p.assocTitle}}</span></p>
              </dd>
            </dl>
          </el-col>
        </el-row>
        <!--评论-->
        <el-row v-if="showdiscover">
          <el-col :span="24">
            <dl class="topic_t">
              <dt>评论：{{Discus.length}}</dt>
            </dl>
            <el-table
              :data="Discus"
              border
              style="width: 100%">
              <el-table-column
                prop="ownerName"
                label="评论用户姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="content"
                label="评论内容"
              >
              </el-table-column>
              <el-table-column
                width="200"
                label="评论时间">
                <template scope="scope">
                  {{ Number(scope.row.createTime) | format}}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="back">
        <router-link to="/demand"> <el-button type="success">&nbsp;返回&nbsp;</el-button></router-link>
      </div>
    </section>
  </div>
</template>

<script>


  import format from  '../../config/date'

  export default {
    name:'topic',
    computed:{
    },
    data:function () {
      return {
        /* v-show */
        showdiscover:true,
        notenote:true,
        topic_categoryIds:true,
        topic_tags:true,
        concols:true,

        finance:false,
        teacher:false,
        doctor:false,
        human:false,
        development:false,
        project:false,
        recruitment:false,
        api: '/demand/demand/',
        Doctorapi:'/demand/demandComment/list/',
        /* date array */
        Finance:[],
        Teacher:[],
        Doctors:[],
        Human:[],
        Development:[],
        Project:[],
        Recruitment:[],
        categoryIds:{},

        /*public date*/
        title:'',
        createTime:null,
        readCount:'',
        note:'',
        ownerName:'',
        noteIgnoreHtml:{},
        tags:{},
        /*关联*/
        Pers:[],
        org:[],
        kwo:[],
        deo:[],
        /*评论*/
        Discus:[],
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.todic();
        this.discup();
      })
    },
    methods:{
      /*评论*/
      discup:function () {
        var that =  this;
        that.$http.get(that.Doctorapi + that.$route.params.id + '/0',{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
              if(res.data.responseData.length == 0){
                that.showdiscover = false;
              }else{
                that.Discus = res.data.responseData;
              }
          }
        )
      },
      todic:function () {
        var that =  this;
        that.$http.get(that.api + that.$route.params.id,{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
            let typeshow = that.$route.query.demandType;
            /*公共的部分数据*/
            that.title = res.data.responseData.title;
            that.ownerName = res.data.responseData.ownerName;
            that.createTime = Number(res.data.responseData.createTime);
            that.readCount = res.data.responseData.readCount;
            /* 附件*/
            if(res.data.responseData.note == null){
                that.notenote = false;
            }else{
              that.note = res.data.responseData.note;
            }
            /*描述*/
            that.noteIgnoreHtml =  res.data.responseData.noteIgnoreHtml;
            /*目录*/
            if(res.data.responseData.categoryIds.length == 0){

                that.topic_categoryIds = false;

            }else{

              that.categoryIds = res.data.responseData.categoryIds;
            }
            /*标签 topic_tags*/
            if(res.data.responseData.tags.length == 0){
              that.topic_tags = false;
            }else{
              that.tags =  res.data.responseData.tags;
            }
            /*关联*/
            var assoList = res.data.responseData.assoList;
            if(assoList.length == 0){
                that.concols = false;
            }else{
              assoList.forEach(function (key) {
                if(key.assocTypeId == "2"){
                  that.Pers.push(key);
                }
                if(key.assocTypeId == "3"){
                  that.org.push(key);
                }
                if(key.assocTypeId == "8"){
                  that.kwo.push(key);
                }
                if(key.assocTypeId == "7"){
                  that.deo.push(key);
                }
              });
            }

            /*金融-投资、融资*/
            if(typeshow == 257 || typeshow == 258 || typeshow == 451 || typeshow == 452){
              that.finance = true;
              var daye = res.data.responseData;
              that.Finance.HH = daye.demandAmount.beginAmount;
              that.Finance.II = daye.demandAmount.endAmount;
              that.Finance.KK = daye.demandAmount.endRouble;
              that.Finance.LL = daye.demandAmount.unitName;

              that.Finance.FF = daye.createTime;
              that.Finance.GG = daye.updateTime;

              that.Finance.MM = daye.ownerName;
              that.Finance.NN = daye.phone;

              that.Finance.CC = daye.area.province.name;
              that.Finance.DD = daye.area.city.name;
              that.Finance.EE = daye.area.district.name;

              that.Finance.AA = daye.industry.catagory.name
              that.Finance.BB = daye.industry.industry.name;
            }
            /*教育-找老师、职业咨询；
             法律-找律师、法律咨询；
             大数据-找数据开发、数据服务*/
            if(typeshow == 355 || typeshow == 356 ||
              typeshow == 549 || typeshow == 550 ||
              typeshow == 423 || typeshow == 424 ||
              typeshow == 617 || typeshow == 618 ||
              typeshow == 1054 || typeshow == 1055 ){
              that.teacher = true;
              var daye = res.data.responseData;
              that.Teacher.KK = daye.ownerName;
              that.Teacher.LL = daye.phone;
              that.Teacher.FF = daye.createTime;
              that.Teacher.GG = daye.updateTime;
              that.Teacher.CC = daye.area.province.name;
              that.Teacher.DD = daye.area.city.name;
              that.Teacher.EE = daye.area.district.name;
              that.Teacher.HH = daye.demandAmount.beginAmount;
              that.Teacher.II = daye.demandAmount.endAmount;
              that.Teacher.JJ = daye.demandAmount.endRouble;
              that.Teacher.AA = daye.industry.catagory.name;
              that.Teacher.BB = daye.industry.industry.name;

            }
            /*医疗-找医生、医疗咨询*/
            if(typeshow == 377 || typeshow == 378 ||
              typeshow == 571 || typeshow == 572){
              that.doctor = true;
              var daye = res.data.responseData;
              that.Doctors.AA = daye.ownerName;
              that.Doctors.JJ = daye.ownerName;
              that.Doctors.KK = daye.phone;
              that.Doctors.EE = daye.createTime;
              that.Doctors.FF = daye.updateTime;
              that.Doctors.BB = daye.area.province.name;
              that.Doctors.CC = daye.area.city.name;
              that.Doctors.DD = daye.area.district.name;
              that.Doctors.GG = daye.demandAmount.beginAmount;
              that.Doctors.HH = daye.demandAmount.endAmount;
              that.Doctors.II = daye.endRouble;
            }
            /*人力资源-HR培训；
             其它类型*/
            if(typeshow == 614 || typeshow == 1053){
              that.human = true;
              var daye = res.data.responseData;

              that.Human.II = daye.ownerName;
              that.Human.JJ = daye.phone;

              that.Human.DD = daye.createTime;
              that.Human.EE = daye.updateTime;

              that.Human.FF = daye.demandAmount.beginAmount;
              that.Human.GG = daye.demandAmount.endAmount;
              that.Human.HH = daye.endRouble;

              that.Human.AA = daye.area.province.name;
              that.Human.BB = daye.area.city.name;
              that.Human.CC = daye.area.district.name;
            }
            /*产品开发-找人才*/
            if(typeshow == 422 || typeshow == 616){
              that.development = true;
              var daye = res.data.responseData;
              that.Development.AA = daye.type.name;
              that.Development.JJ = daye.ownerName;
              that.Development.KK = daye.phone;
              that.Development.EE = daye.createTime;
              that.Development.FF = daye.updateTime;
              that.Development.BB = daye.area.province.name;
              that.Development.CC = daye.area.city.name;
              that.Development.DD = daye.area.district.name;
              that.Development.GG = daye.demandAmount.beginAmount;
              that.Development.HH = daye.demandAmount.endAmount;
              that.Development.II = daye.endRouble;
            }
            /*产品开发-项目开发*/
            if(typeshow == 421 || typeshow == 615){
              that.project = true;
              var daye = res.data.responseData;
              that.Project.AA = daye.readCount;
              that.Project.JJ = daye.type.ownerName;
              that.Project.KK = daye.type.phone;
              that.Project.EE = daye.createTime;
              that.Project.FF = daye.updateTime;
              that.Project.BB =  daye.area.province.name;
              that.Project.CC = daye.area.city.name;
              that.Project.DD = daye.area.district.name;
              that.Project.GG = daye.demandAmount.beginAmount;
              that.Project.HH = daye.demandAmount.endAmount;
              that.Project.II = daye.demandAmount.endRouble;
            }
            /*人力资源-职位招聘*/
            if(typeshow == 420 || typeshow == 419 || typeshow == 613){
              that.recruitment = true;
              var daye = res.data.responseData;

              that.Recruitment.AA = daye.noteIgnoreHtml;
              that.Recruitment.QQ = daye.ownerName;
              that.Recruitment.RR = daye.phone;

              that.Recruitment.KK = daye.noteIgnoreHtml;
              that.Recruitment.LL = daye.advantage;
              that.Recruitment.MM = daye.hireEmail;

              that.Recruitment.OO = daye.createTime;
              that.Recruitment.PP = daye.updateTime;

              that.Recruitment.II = daye.education.name;
              that.Recruitment.JJ = daye.workingTime.name;
              that.Recruitment.NN = daye.amount.amount;

              that.Recruitment.DD = daye.salaryRange.unitName;
              that.Recruitment.EE = daye.hireCompany;
              that.Recruitment.BB = daye.function.catagory.name;
              that.Recruitment.CC = daye.function.industry.name;
              that.Recruitment.FF = daye.area.province.name;
              that.Recruitment.GG = daye.area.city.name;
              that.Recruitment.HH = daye.area.district.name;


            }



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
  
  .topic{
    margin-bottom: 100px;
  }
  .topicbody{
    .topic_t2{
      display: block;
      margin-bottom: 20px;
      line-height: 40px;
      dt{
        float: left;
      }
      dd{
        float: left;

        p{
          span{
            padding-left: 10px;
          }
        }
      }
    }
    .topic_t{
      border-bottom: 1px solid #d1dbe5;
      margin-bottom: 20px;
      line-height: 40px;
      dt{
        display: inline-block;
      }
      dd{
        display: inline-block;
        span{
          margin-left: 20px;
        }
        a.file-title{
          color: #20a0ff;
        }
      }
    }
    .Requirement{
      display: block;
      padding: 10px;
      border-bottom: 1px solid #d1dbe5;
    }

  }
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
  }
</style>

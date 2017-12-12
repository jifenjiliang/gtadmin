import Vue from 'vue'
import date from './date';
import date2 from './date2';
import { checkMobile } from './common';

/* 去空格 */
Vue.prototype.$trim = function (val) {
  return val.replace(/^\s+|\s+$/g, '');
}
/* 处理时间格式 */
Vue.prototype.$date = date;
/* 处理定时发送时间格式 */
Vue.prototype.$date2 = date2;
/* 选择mobile */
Vue.prototype.$checkMobile = checkMobile;
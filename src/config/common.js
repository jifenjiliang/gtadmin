/* 选择mobile */
const isMobile = /^1[34578]\d{9}$/;
const isChinaMobile = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动
const isChinaUnion = /^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/; //联通
const isChinaTelcom = /^1(3[3])|(8[019])\d{8}$/; //电信
export function checkMobile(telphone) {
  telphone = telphone.replace(/^\s+|\s+$/g, '');
  if (!isMobile.test(telphone)) {
    return "未检测到正确的手机号码";
  }
  else {
    if (isChinaMobile.test(telphone)) {
      return "ChinaMobile";
    }
    else if (isChinaUnion.test(telphone)) {
      return "ChinaUnion";
    }
    else if (isChinaTelcom.test(telphone)) {
      return "ChinaTelcom";
    }
    else {
      return "未检测到正确的手机号码";
    }
  }
}
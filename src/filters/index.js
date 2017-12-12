/**
 * Created by oksite on 2017/4/22.
 */
export const typeId = (str) => {
  if (!str) return ''
  if(str == 1){
    return '动态头条'
  }else if(str == 2){
    return '精选专辑'
  }else if(str == 3){
    return '企业专辑'
  }else if(str == 4){
    return '发现热门'
  }else{
    return str
  }
}
/*
* 时间戳格式化
* */
export const format = (time) => {
  if(time == 0){
    return ''
  }
  var date = new Date(time)
  Date.prototype.format = function(format){
    var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(), //day
      "h+" : this.getHours(), //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3), //quarter
      "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
      }
    }
    return format;
  }

  return date.format("yyyy-MM-dd hh:mm:ss")

}

/*标题长度限制*/

export const demandTitle = (str) => {
  if(str.length >=20){
    return str.substring(0,20) + '...';
  }else{
    return str;
  }
}
/*数据长度限制*/
export const demandTitlelength = (str) => {
  if(str.length >=80){
    return str.substring(0,80) + '...';
  }else{
    return str;
  }
}

/*毫秒数转换*/
export const Seconds  = (time) =>{
  if(!time){ // 4.07
    return ''
  }
  let minutes = parseInt(time/60);
  let seconds = parseInt(time % 60);
  return  minutes + " 分钟 " + seconds + " 秒 ";
};

export const getRoot = () =>{
  // let nginxRoot = "http://file.online.gintong.com";
  // let domain = document.domain;
  // if(domain == "www.gintong.com"){
  //   nginxRoot = "http://file.online.gintong.com"
  // }
  // if(domain == "fzwww.gintong.com"){
  //   nginxRoot = "http://fzfile.gintong.com"
  // }
  // return nginxRoot;
}

export const getPic = (picPath) =>{
  
  // return getRoot() + picPath;
}








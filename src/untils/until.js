export default{
    isType(obj){//类型判断
        var regexp = /\s(\w+)\]/;
        var result =  regexp.exec(Object.prototype.toString.call(obj))[1];
        return result;
    },
    replaceDate(str){//时间戳转换
        str = str.toString().length == 10 ? str*1000 : str
        let now = str ? new Date(str) : new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }, 

    uniquesObjs(obj) {//去除统一数组中相同的对象
        let uniques = [];
        let stringify = {};
        for (let i = 0; i < obj.length; i++) {
            let keys = Object.keys(obj[i]);
            keys.sort(function(a, b) {
                return (Number(a) - Number(b));
            });
            let str = '';
            for (let j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        return uniques;
    },
    throttle(func,wait){//节流
        let timer = null;
        let fn = function(){
          if(!timer){
            let args = Array.from(arguments);
            timer = setTimeout(()=>{
              func.apply(this,args);
              timer = null
            },wait)
          }
        }
        return fn
    },
    shake(func,t){//防抖
        let fn = function(){
          let args = Array.from(arguments);
          clearTimeout(func.id)
          func.id = setTimeout(()=>{
            func.apply(this,args)
          },t)
        }
        return fn
    },
    objToParams(obj){
      let result = ''
      for(let i in obj){
        result+=`&${i}=${obj[i]}`
      }
      result = '?'+result.substr(1,result.length-1)
      return result
    }
}
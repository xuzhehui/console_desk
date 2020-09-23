export default{
    isType(obj){
        var regexp = /\s(\w+)\]/;
        var result =  regexp.exec(Object.prototype.toString.call(obj))[1];
        return result;
    },
    replaceDate(str){
        str = str.toString().length == 10 ? str*1000 : str
        let now = str ? new Date(str) : new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }, 
    objtoArray(obj){
        let result = Object.values(obj);
        result.map(v=> Object.prototype.toString.call(v.sub) === '[object Object]' ? v.sub = this.deepObjToArray(v.sub) : '' )
        return result
    },

    deteleObject(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
            var keys = Object.keys(obj[i]);
            keys.sort(function(a, b) {
                return (Number(a) - Number(b));
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
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
    throttle(func,wait){
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
    shake(func,t){
        let fn = function(){
          let args = Array.from(arguments);
          clearTimeout(func.id)
          func.id = setTimeout(()=>{
            func.apply(this,args)
          },t)
        }
        return fn
      }
    
    
}
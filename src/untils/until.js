export default{
    isType(obj){
        var regexp = /\s(\w+)\]/;
        var result =  regexp.exec(Object.prototype.toString.call(obj))[1];
        return result;
    },
    replaceDate(str){
        let now = str ? new Date(str) : new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    },
}
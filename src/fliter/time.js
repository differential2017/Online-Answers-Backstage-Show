import Vue from 'vue'

Vue.filter('t',function(time){
    var t=new Date(time);
    var y=t.getFullYear();
    var mm=t.getMonth()+1;
    var d=t.getDate();
    var h=t.getHours().toString().padStart(2,"0");
    var m=t.getMinutes().toString().padStart(2,"0");;
    var s=t.getSeconds().toString().padStart(2,"0");;
    mm=m.toString().padStart(2,"0");
    d=d.toString().padStart(2,"0");
    return `${y}-${mm}-${d} ${h}:${m}:${s}`;
});
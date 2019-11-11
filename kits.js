var kits = {};

// 随机整数
kits.randomInt = function(n,m){
    var num = Math.floor(Math.random() * (m - n+1) + n);
    return num;
}

// 随机rbg颜色
kits.randomRbg = function(){
    var r = kits.randomInt(0,9);
    var g = kits.randomInt(0,9);
    var b = kits.randomInt(0,9);
    var color = 'rgb('+ r + ',' + g + ',' + b + ')';
    return color;
}

// 随机十六进制颜色
kits.randomHexColor = function(){
    var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    var color = ['#'];
    for(var i=0 ; i < 6;i++){
        color.push(arr[kits.randomInt(0,15)]);
    }
    // document.write(color);
    return color.join('');
}


// 求出数组中的最大值
kits.getMax = function(){
    var arr = [5,2,40,6,9,7];
    var result = arr[0];
    for(i = 0;i < arr.length;i++){
        if(result < arr[i]){
            result = arr[i];
        }
    }
    return result;
}




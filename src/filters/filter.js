var reg = /\b(\w)|\s(\w)/g;

export var toUpper = function (val) {
    val = val.toUpperCase();
    val = val.replace(reg,function(m){return m.toLowerCase()});
    return val;
};
export var toLowwer = function (val) {
    val = val.toLowerCase();
    val = val.replace(reg,function(m){return m.toUpperCase()});
    return val;
};


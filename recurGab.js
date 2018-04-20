function recur(xPathArr, index, obj) {
    let newObj = {};
    if (!obj) { // first time the function is launched
        obj = {};
        index = xPathArr.length - 1;
        newObj[xPathArr[index]] = 'soleil';
    }else{
        newObj[xPathArr[index]] = obj;
    }
    if (!index) return newObj; // breaking the recursivity
    xPathArr.pop();
    obj = recur(xPathArr, index - 1, newObj);
    return obj;
}

obj = recur(['un', 'de', 'trois', 'quatre', 'cinq','si','se','hu','ne','dix',
'on','do','tr','qu', 'qi', 'se','ds','dh','dn','vi']);
console.log(JSON.stringify(obj));
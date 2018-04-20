function keyStr2Arr(keyStr) {
    keyStr = keyStr.split('/');
    let keyArr = [];
    for (let i = 2; i < keyStr.length; i++) {
        // to do : check if there is a '/' or more in the attribute
        keyArr.push(keyStr[i]);
    }
    return keyArr;
}
function keyArrToObjrecur(xPathArr, value, index, obj) {
    let newObj = {};
    if (!obj) { // first time the function is launched
        obj = {};
        index = xPathArr.length - 1;
        newObj[xPathArr[index]] = value;
    }else{
        newObj[xPathArr[index]] = obj;
    }
    if (!index) return newObj; // breaking the recursivity
    xPathArr.pop();
    obj = keyArrToObjrecur(xPathArr, value, index - 1, newObj);
    return obj;
}

let keyStr = '//library/folder/tag2/tag3';
let value = 'je suis la value';

let keyArr = keyStr2Arr(keyStr);
let keyObj = keyArrToObjrecur(keyArr, value);

console.log(JSON.stringify(keyObj));
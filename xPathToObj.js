


// let keyStr = '//library/folder[attribute::folder-id="blog"]/display-name[attribute::xml:lang="en-AE"]';
let keyStr = '//library/folder/tag2/tag3';
let value = 'je suis la value';

function keyStr2Arr(keyStr) {
    keyStr = keyStr.split('/');
    let keyArr = [];
    for (let i = 2; i < keyStr.length; i++) {
        // to do : check if there is a '/' or more in the attribute
        keyArr.push(keyStr[i]);
    }
    return keyArr;
}
function keyArr2Obj(keyArr) {
    let obj = {};
    for (let i = 0; i < keyArr.length; i++) {
        const element = keyArr[i];
        let tag = '';
        console.log(element);
        if (element.indexOf('attribute::') < 0) {
            console.log('no attr');
            tag = element;
        }else{
            console.log('attr');
        }
        obj[tag] = 'ddd';
    }
    return obj;
}



function recur(xPathArr, value, index, obj) {
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
    obj = recur(xPathArr, value, index - 1, newObj);
    return obj;
}




let keyArr = keyStr2Arr(keyStr);
let keyObj = recur(keyArr, value);
console.log(JSON.stringify(keyObj));

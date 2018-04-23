const fs = require('fs');
var parse = require('csv-parse');

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
function makeObjStep1(rows) {
    /* return an array of objects like  
    {"library":{"folder[attribute::folder-id=\"blog\"]":{"display-name[attribute::xml:lang=\"en-AE\"]":"BLOG"}}} */
    //console.log('makeObjStep1');
    let keyValObjs = []
    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        let xPath = element.xPath;
        let value = element['TO TRANSLATE']; // values column name
        let keyArr = keyStr2Arr(xPath);
        let keyObj = keyArrToObjrecur(keyArr, value);
        keyValObjs.push(keyObj);
    }
    return keyValObjs;
}
function makeObjStep2(keyValObjs) {
    console.log('makeObjStep2');
    console.log(JSON.stringify(keyValObjs[0]));
    console.log(JSON.stringify(keyValObjs));
}
function makeObjStep3(obj) {
    /* transform obj to the result obj for obj2xml compatibility */
    console.log('makeObjStep3');
    /*let result = {
        "tagUnique": "tagUniqueVal",
        "multipleTagA": [
            {
                '#': 'multipleTagAVal1',
            },
            {
                "@": {
                    "attributeX": "attributeXVal",
                    "attributeY": "attributeYVal"
                },
                '#': 'multipleTagAVal2'
            }
        ],
        "tagUniqueInArray": [
            {
                '#': 'tagUniqueInArrayVal',
            }
        ],
        "address": {
            "@": {
                "type": "home"
            },
            "streetAddress": "3212 22nd St",
            "city": "Chicago",
            "state": "Illinois",
            "zip": 10000
        },
        "phone": [
            {
                "@": {
                    "type": "home",
                    "truc": "autre"
                },
                "#": "123-555-4567"
            },
            {
                "@": {
                    "type": "cell"
                },
                "#": "890-555-1234"
            },
            {
                "@": {
                    "type": "work"
                },
                "#": "567-555-8901"
            }
        ],
        "email": "john@smith.com"
    };
    return result;*/
}
function makeXml(obj) {
    // https://www.npmjs.com/package/js2xmlparser
    var js2xmlparser = require("js2xmlparser");
    console.log(js2xmlparser.parse("library", obj));
}


///////////////////////////////////// App params
let csvPath = './test1.csv';
/////////////////////////////////////

fs.readFile(csvPath, function (err, fileData) { // csv-parse
    parse(fileData, {columns: true, trim: true}, function(err, rows) {
        // Your CSV data is in an array of arrys passed to this callback as rows.
        if (err) {
            console.log('err: ', err);
        }

        var obj = makeObjStep1(rows);
        obj = makeObjStep2(obj);
        obj = makeObjStep3(obj);

        makeXml(obj);
    })
})
const fs = require('fs');
var parse = require('csv-parse');

///////////////////////////////////// App params
let csvPath = './test1.csv';
let valuesColumn = 'TO TRANSLATE';
let firstXmlTag = 'library';
/////////////////////////////////////

module.exports = {
    keyStr2Arr: function(keyStr) {
        keyStr = keyStr.split('/');
        let keyArr = [];
        for (let i = 2; i < keyStr.length; i++) {
            // to do : check if there is a '/' or more in the attribute
            keyArr.push(keyStr[i]);
        }
        return keyArr;
    },


    keyArrToObjrecur: function(xPathArr, value, index, obj) {
    
    
    
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
    },


    makeObjStep1: function(rows) {
        /* return an array of objects like  
        {"library":{"folder[attribute::folder-id=\"blog\"]":{"display-name[attribute::xml:lang=\"en-AE\"]":"BLOG"}}} */
        //console.log('makeObjStep1');
    
        let obj = {};
    
        for (let i = 0; i < rows.length; i++) {
            const element = rows[i];
            let xPath = element.xPath;
            let value = element[valuesColumn]; // values column name
            let keyArr = keyStr2Arr(xPath);
            let keyObj = keyArrToObjrecur(keyArr, value);
            
            //console.log(JSON.stringify(keyObj));
            
            
            //keyValObjs.push(keyObj);
        }
    
        return obj;
    },

    makeObjStep2: function(keyValObjs) {
        console.log('makeObjStep2');
        console.log(JSON.stringify(keyValObjs[0]));
        console.log(JSON.stringify(keyValObjs));
    },

    makeObjStep3: function(obj) {
        /* transform obj to the result obj for obj2xml compatibility */
        console.log('makeObjStep3');
        let result = {
            "folder": [
                {
                    "@": {
                        "folder-id": "blog",
                        "attribut2": "valeur",
                    },
                    'display-name': {
                        "@": {
                            "xml:lang": "en-AE",
                        },
                        "tag3": {
                            "@": {"coco" : "jojo"},
                            "#": "BLOG"
                        }
                    }
                },
                {
                    "@": {
                        "folder-id": "Advices-for-men",
                    },
                    '#': 'folder'
                }
            ]
        };
        return result;
    },


    makeXml: function(obj) {
        // https://www.npmjs.com/package/js2xmlparser
        var js2xmlparser = require("js2xmlparser");
        console.log(js2xmlparser.parse(firstXmlTag, obj));
    },
    
    ///////////////////////
    
    
    attributsObj: function(lastTagAndAttrs) {
        /*
            lastTagAndAttrs can be  tagName[attribute::xml:lang=""en-AE""][attribute::xml:lang2=""fr-FR""]
    
            this function return an @ object like this one :
            {
                "folder-id": "blog",
                "attribut2": "valeur",
            }
        */
        let attrs = {};
        lastTagAndAttrs = lastTagAndAttrs.split('[attribute::').slice(1);
         // [ 'tagName', 'xml:lang=""en-AE""]', 'xml:lang2=""fr-FR""]' ]
        lastTagAndAttrs.forEach(function(attribut){
            const attr = attribut.split('=')[0];
            const value = attribut.split('"')[1];
            if(attr) attrs[attr] = value;
        });
        return attrs;
    },
    
    createTag: function(listTag){
        let resObject = {};
        listTag.forEach(function(tag){
    
        });
        return resObject; 
    },
    

    makeOneRowObject: function(obj, row){
        const key = row.xPath.split('/');
        const val = row[valuesColumn];
    
        if(key[2] == firstXmlTag){ // si library par ex
            createTag(key.slice(3));
        }
    },
    
    exec: function(){
        let result = {
            "folder": [
                {
                    "@": {
                        "folder-id": "blog",
                        "attribut2": "valeur",
                    },
                    'display-name': {
                        "@": {
                            "xml:lang": "en-AE",
                        },
                        "tag3": {
                            "@": {"coco" : "jojo"},
                            "#": "BLOG"
                        }
                    }
                },
                {
                    "@": {
                        "folder-id": "Advices-for-men",
                    },
                    '#': 'folder'
                }
            ]
        };
        return result;
    },
    
    main: function(){
        fs.readFile(csvPath, function (err, fileData) { // csv-parse
            parse(fileData, {columns: true, trim: true}, function(err, rows) {
                // Your CSV data is in an array of arrys passed to this callback as rows.
                if (err) {
                    console.log('err: ', err);
                }
        
        
                //console.log(rows);
                const row = rows[0];
                const listTag = row.xPath.split('/').slice(3);
                const res = createTag(listTag, row, true);
                console.log(JSON.stringify(res));
        
        
                /*let obj = makeObjStep1(rows);
        
                obj = makeObjStep2(obj); 
        
        
                makeXml(obj);*/
            })
        })
    }
    
    /*
    const row = {
    
    }
    const listTag = "folder[attribute::folder-id=""blog""]/display-name[attribute::xml:lang=""en-AE""]/tag3[attribute::coco=""jojo""]";
    const test = createTag(listTag, row);*/
}

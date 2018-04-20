const fs = require('fs')
var parse = require('csv-parse')


// csv-parse
fs.readFile('./test1.csv', function (err, fileData) {
    parse(fileData, {columns: true, trim: true}, function(err, rows) {
        // Your CSV data is in an array of arrys passed to this callback as rows.
        //console.log();
        
        var obj = makeObj(err, rows);
        makeXml(obj);
    })
})
function makeObj(err, rows) {

    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        let xPath = element.xPath;
        let value = element['TO TRANSLATE'];
        console.log('row');
        console.log(xPath);
        console.log(value);
        
    }

    var obj = {};
    /*for (let i = 0; i < rows.length; i++) {
        console.log(rows[i].xPath);
    }*/
    console.log(rows[0].xPath);
    console.log(rows[0].xPath);
    console.log(rows[1].xPath);

    rows = rows[0];
    
    console.log(typeof rows);
    console.log(typeof 'rows');
    
    console.log('ro/ws'.split('/'));
    

    console.log(obj);
    
    obj = {
        "firstName": "John",
        "lastName": "Smith",
        "dateOfBirth": new Date(1964, 7, 26),
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
    return obj;
}

function makeXml(obj) {
    // https://www.npmjs.com/package/js2xmlparser
    var js2xmlparser = require("js2xmlparser");
    //console.log(js2xmlparser.parse("library", obj));
}
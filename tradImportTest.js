const assert = require('assert');
const tradImport = require("./tradImport.js");

describe('test du script tradImport', function(){
    
    it('it should return result', function(){
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
        
        assert.deepEqual(result, tradImport.exec());
    })

});


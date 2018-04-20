function soleilify(input) {
    if(!Array.isArray(input)) {
        throw new TypeError('Soleilify only accept Array as argument');
    }
    const result = {};
    input.forEach(function(e, i) {
        let o = result;
        for(let j=0; j<i; j++) {
            o = o[input[j]];
        }
        o[e] = i < input.length-1 ? {} : 'soleil';
    })
    return result;
}

console.log(soleilify(['un', 'deux', 'trois']));
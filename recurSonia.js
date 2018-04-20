function soleil(tab) {
	if(tab.length == 0) return; // end
	var result = {};
  	if (tab.length == 1) result[tab[0]] = "soleil"; // before last
  	else result[tab[0]] = soleil(tab.slice(1));
	return result;
}

var undeuxtrois = ["un", "deux", "trois", "quatre"];
console.log(JSON.stringify(soleil(undeuxtrois)));
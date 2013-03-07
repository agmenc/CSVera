function param(name, value) {
    if (typeof value === "undefined") return allParams()[name.trim()];
    else setParam(name.trim(), value);

    function setParam(name, value) {
        var params = allParams();
        params[name] = value;

        var acc = [];
        for (var k in params) if (params.hasOwnProperty(k)) acc.push(k + "=" + params[k]);
        history.pushState({ path: this.path }, '', "?" + acc.join("&"))
    }

    // TODO - CAS - 21/02/2013 - Use document.location.search, to get the "?" and everything afterwards - test in FireFox
    function allParams() {
        var z = {};
        var x = document.location.href.split(/\?|&/).splice(1);
        x.forEach(function(paramString) {
            var bits = paramString.split("=");
            z[bits[0]] = bits[1];
        });
        return z;
    }
}
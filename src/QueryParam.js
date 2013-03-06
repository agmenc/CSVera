var debug;

function param(name, value) {
    if (typeof value === "undefined") return allParams()[name];
    else setParam(name, value);

    function setParam(name, value) {
        var params = allParams();
        params[name] = value;

        var acc = [];
        for (var k in params) if (params.hasOwnProperty(k)) acc.push(parameter(k, params));
        history.pushState({ path: this.path }, '', "?" + acc.join("&"))
    }

    function parameter(key, params) {
//        if (typeof params[key] === "undefined") return "";
        return key + "=" + params[key];
    }

    // TODO - CAS - 21/02/2013 - Use document.location.search, to get the "?" and everything afterwards
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
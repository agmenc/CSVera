//Language tweaks:
// Add clone() method to Object => Adding a prototype to Object  =   Object.constructor.prototype
// Add push() and pop() methods to Object, so that we can use it like a map AND an array
// Array "contains" method - open up the _.underscore guide = DONE
// Add all of underscore methods to array, or consider a blesser, as per JQ $ ====> Array.prototype.contains = function(element) { return _.contains(this, element); }

function param(name, value) {
    if (typeof value === "undefined") return allParams()[name.trim()];
    else setParam(name.trim(), value);

    function setParam(name, value) {
        var params = allParams();
        if (value === "") params = cloneExcept(params, name)
        else params[name] = value;
        setQueryParams.call(this, params);
    }

    function cloneExcept(source, except) {
        var c = {};
        for (var k in source) if (k != except) c[k] = source[k];
        return c;
    }

    function setQueryParams(params) {
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
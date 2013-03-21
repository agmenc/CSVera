//Language tweaks:
// Add clone() method to Object => Adding a prototype to Object  =   Object.constructor.prototype
// Add push() and pop() methods to Object, so that we can use it like a map AND an array
// Array "contains" method - open up the _.underscore guide = DONE
// Add all of underscore methods to array, or consider a blesser, as per JQ $ ====> Array.prototype.contains = function(element) { return _.contains(this, element); }

var paramParser;
// See https://gist.github.com/jlong/2428561
function param(name, value) {
    if (typeof paramParser === "undefined") {
        paramParser = document.createElement('a');
        $(paramParser).hide();
    }

    if (typeof value === "undefined") return allParams()[name.trim()];
    else setParam(name.trim(), value);

    function setParam(name, value) {
        var params = allParams();
        if (value === "Show All") params = cloneExcept(params, name)
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
        for (var k in params) if (params.hasOwnProperty(k) && k.trim() != "") acc.push(k + "=" + params[k]);
        var qps = acc.length > 0 ? "?" + acc.join("&") : _.last(paramParser.pathname.split(/\//));
        history.replaceState({ path: this.path }, '', qps)
    }

    // TODO - CAS - 21/02/2013 - Use document.location.search, to get the "?" and everything afterwards - test in FireFox
    function allParams() {
        paramParser.href = document.location.href;
        var parts = paramParser.search.split(/\?|&/);
        var z = {};
        var qps = parts.splice(1);
        qps.forEach(function(paramString) {
            var bits = paramString.split("=");
            z[bits[0]] = bits[1];
        });
        return z;
    }

    /*
     var paramParser = document.createElement('a');
     paramParser.href = "http://example.com:3000/pathname/?search=test#hash";

     paramParser.protocol; // => "http:"
     paramParser.hostname; // => "example.com"
     paramParser.port;     // => "3000"
     paramParser.pathname; // => "/pathname/"
     paramParser.search;   // => "?search=test"
     paramParser.hash;     // => "#hash"
     paramParser.host;     // => "example.com:3000"
     */
}
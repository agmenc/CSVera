function param(name, value) {
    if (typeof value === "undefined") return allParams()[name];
    else setParam(name, value);

    function setParam(name, value) {
        console.log("Updating param: " + name + " = " + value);
        var params = allParams();
        params[name] = value;

        // TODO - CAS - 21/02/2013 - Use document.location.search, to get the "?" and everything afterwards
        var baseUrl = document.location.href.split(/\?|&/)[0];
        var acc = "";
        for (var i in params) acc = acc + i + "=" + params[i] + "&";

        // How can we change the URL without reloading the page?
        // Infinite loop:
//        document.location.href = baseUrl + "?" + acc;
    }

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
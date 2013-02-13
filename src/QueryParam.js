function param(name) {
    var allParams = document.location.href.split(/\?|&/).splice(1);

    var value = undefined;
    allParams.forEach(function(paramString) {
        var bits = paramString.split("=");
       if (bits[0] === name) {
           value = bits[1]
       }
    });

    return value;
}
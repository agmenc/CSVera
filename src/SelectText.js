function selectText(inputElement) {
    var doc = document;
    if (doc.body.createTextRange) { //ms
        var range = doc.body.createTextRange();
        range.moveToElementText(inputElement);
        range.select();
    } else if (window.getSelection) { //all others
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(inputElement);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
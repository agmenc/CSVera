function RawEditor($textarea) {
    $textarea.addClass("max");
    var originalOffset = $textarea.offset();
    $textarea.offset({ top: $("body").scrollTop(), left: 0 });
    $textarea.keydown(typing)

    function typing(event) {
        var keyIs = keyFor(event);
        if (keyIs.CTRL("c") || keyIs.ESC()) close();
    }

    function close() {
        $textarea.removeClass("max");
        $textarea.offset(originalOffset);
        setTimeout(function() { $textarea.text(""); }, 500);
    }
}
function RawEditor($textarea) {
    $textarea.addClass("max");
    var originalOffset = $textarea.offset();
    $textarea.offset({ top: 0, left: 0 });
    $textarea.keydown(typing)

    function typing(event) {
        if ((event.metaKey && event.which == 67) || event.which == 27) close();
    }

    function close() {
        $textarea.removeClass("max");
        $textarea.offset(originalOffset);
    }
}
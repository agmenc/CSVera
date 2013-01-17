function TableEditor(tableId, csvExtractor) {
    var targetTableId = "#" + tableId;
    var focusableField = "#focusableField";
    var $selectedRow;
    var keyBindings = [new AddRow(), new LogKey()];

    $(targetTableId).after("<textarea id='focusableField' type='text' class='littleFloater' name='whatever' value='whatever'/>");

    $(targetTableId).find("tbody tr").click(function() {
        clearSelection();
        $selectedRow = $(this);
        $(this).addClass("selected");
        moveFocusHack(event.pageY);
    });

    $(focusableField).keydown(typing);

    $(focusableField).blur(clearSelection);

    function clearSelection() {
        if ($selectedRow) {
            $selectedRow.removeClass("selected");
        }
    }

    function typing(event) {
        clearSelection();

        switch (event.which) {
            case 38: swap($selectedRow.prev(), $selectedRow); break;
            case 40: swap($selectedRow, $selectedRow.next()); break;
        }

        keyBindings.forEach(function(binding) {
            binding.processKeypress($selectedRow, event);
        });

        if ($.inArray(event.which, [38, 40]) > -1) {
            event.preventDefault();
            $(focusableField).text(csvExtractor());
        }

        $selectedRow.addClass("selected");
        moveFocusHack($selectedRow.position().top);
    }

    function swap(row1, row2) {
        if (row1.css("display") === "none") swap(row1.prev(), row2);
        else if (row2.css("display") === "none") swap(row1, row2.next());
        else row1.before(row2);
    }

    function moveFocusHack(y) {
        $(focusableField).offset({ top: y, left: -10 });
        $(focusableField).focus();
    }
}
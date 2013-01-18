function TableEditor(tableId, csvExtractor) {
    var targetTableId = "#" + tableId;
    var focusableField = "#focusableField";
    var $selectedRow;
    var keyBindings = [new AddRow(rowAdded), new MoveRow(dataChanged)];

    $(targetTableId).after("<textarea id='focusableField' type='text' class='littleFloater' name='whatever' value='whatever'/>");
    $(targetTableId).find("tbody tr").each(prime)
    $(focusableField).keydown(typing);
    $(focusableField).blur(clearSelection);

    function rowAdded($row) {
        prime(0, $row.get(0));
    }

    function dataChanged() {
        $(focusableField).text(csvExtractor());
    }

    function prime(index, row) {
        var $row = $(row);
        $row.click(function() {
            clearSelection();
            $selectedRow = $row;
            $row.addClass("selected");
            moveFocusHack();
        });
    }

    function clearSelection() {
        if ($selectedRow) $selectedRow.removeClass("selected");
    }

    function typing(keyEvent) {
        clearSelection();

        keyBindings.forEach(function(binding) {
            binding.processKeypress($selectedRow, keyEvent);
        });

        $selectedRow.addClass("selected");
        moveFocusHack();
    }

    function moveFocusHack() {
        $(focusableField).offset({ top: $selectedRow.position().top, left: -10 });
        $(focusableField).focus();
    }
}
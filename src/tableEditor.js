function TableEditor(tableId, csvExtractor) {
    var targetTableId = "#" + tableId;
    var focusableField = "#focusableField";
    var $selectedRow;
    var keyBindings = [new AddRow(rowAdded), new MoveRow(), new CtrlCmd(dataChanged), new LogKey()];

    $(targetTableId).after("<textarea id='focusableField' type='text' class='littleFloater' name='whatever' value='whatever'/>");
    $(targetTableId).find("tbody tr").each(prime);
    $(focusableField).keydown(typing).blur(clearSelection);
    $(targetTableId).find("tbody tr").first().click();

    function rowAdded($row) {
        prime(0, $row.get(0));
    }

    function dataChanged() {
        $(focusableField).text(csvExtractor());
    }

    function prime(index, row) {
        var $row = $(row);
        $row.click(function () {
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

        // Need to only use bindings that recognise the keypress, so that we only clear/move focus when they are executed
        clearSelection();

        keyBindings.forEach(function (binding) {
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
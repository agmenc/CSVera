function TableEditor(tableId, csvExtractor) {
    explain("Click a row                   Select the row");

    var targetTableId = "#" + tableId;
    var focusableFieldId = "#focusableField";
    var $selectedRow;
    var keyBindings = [new AddRow(rowAdded), new MoveRow(), new CtrlCmd(displayRaw)];
    var cellEditor = new InlineCellEditor();

    $(targetTableId).after("<textarea id='focusableField' type='text' class='littleFloater' name='whatever' value='whatever'/>");
    $(targetTableId).find("tbody tr").each(prime);
    $(focusableFieldId).keydown(typing).blur(clearSelection);
    $(targetTableId).find("tbody tr").first().click();
    explain("Mac users                     Use CMD in place of CTRL");

    function rowAdded($row) {
        prime(0, $row.get(0));
    }

    function displayRaw() {
        $(focusableFieldId).text(csvExtractor());
        new RawEditor($(focusableFieldId));
    }

    function prime(index, row) {
        var $row = $(row);
        cellEditor.prime($row);
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
        var refocus = false;
        keyBindings.forEach(function (binding) {
            if (binding.processKeypress($selectedRow, keyEvent)) refocus = true;
        });

        if (refocus) moveFocusHack();
    }

    function moveFocusHack() {
        $(focusableFieldId).offset({ top: $selectedRow.position().top, left: -10 });
        $(focusableFieldId).focus();
    }
}
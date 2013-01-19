function InlineCellEditor(tableId) {
    var targetTableId = "#" + tableId;

    $(targetTableId).find("td").each(function () {
        new CellEditor($(this));
    });

    function CellEditor($cell) {
        var originalText;
        $cell.dblclick(editCell);

        function editCell() {
            originalText = $cell.text();
            $cell.html("<input type='text' class='inCellAdams' value='" + originalText + "'/>");
            var inputField = $cell.find("input");

            inputField.offset($cell.position())
                    .height($cell.outerHeight())
                    .width($cell.outerWidth())
                    .blur(function () { $cell.html(inputField.val()) })
                    .click(function (event) { event.stopPropagation() })
                    .focus();
        }
    }
}
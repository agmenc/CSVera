function InlineCellEditor(tableId) {
    var targetTableId = "#" + tableId;

    $(targetTableId).find("td").each(function() {
        new CellEditor($(this));
    });

    function CellEditor($cell) {
        var originalText;
        $cell.dblclick(editCell);

        function editCell(mouseEvent) {
            originalText = $cell.text();
            $cell.html("<input type='text' value='" + originalText + "'/>");
            var inputField = $cell.find("input");
            inputField.blur(function() {
                $cell.html(originalText);
            });
            inputField.focus();
//            mouseEvent.stopPropagation();
        }
    }
}
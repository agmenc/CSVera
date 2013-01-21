function InlineCellEditor() {
    var self = this;

    self.prime = function($row) {
        $row.children("td").each(function () {
            new CellEditor($(this));
        });
    }

    explain("Double-click a table cell     Edit cell contents");

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
function Constructor(tableId, csvPath) {
    new TableLoader(tableId, csvPath, editTable);

    function editTable() {
        new TableEditor(tableId, new CsvExtractor(tableId).extract);
        new TableFilterer(tableId);
    }
}

$(document).ready(function () {
    $("table[csv]").each(function() {
        new Constructor($(this).attr("id"), $(this).attr("csv"));
    })
});
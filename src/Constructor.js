function Constructor(tableId, csvPath) {
    new TableLoader(tableId, csvPath, editTable);

    function editTable() {
        new TableEditor(tableId, new CsvExtractor(tableId).extract);
        new TableFilterer(tableId);
    }
}

function explain(message) {
    if(typeof console != "undefined") console.log(message)
}

if (typeof jQuery === "undefined") throw "JQuery could not be found, and is required by CSVera"
if (typeof _ === "undefined") throw "Underscore.js could not be found, and is required by CSVera"

$(document).ready(function () {
    $("table[csv]").each(function() {
        new Constructor($(this).attr("id"), $(this).attr("csv"));
    })
    new ControlPanel($("table[csv]"));
});
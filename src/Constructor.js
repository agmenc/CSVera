function Constructor(tableId, csvPath, eventBus) {
    new TableLoader(tableId, csvPath, editTable);

    function editTable() {
        new TableEditor(tableId, new CsvExtractor(tableId).extract);
        new TableFilterer(tableId, eventBus);
    }
}

function explain(message) {
    if(typeof console != "undefined") console.log(message)
}

if (typeof jQuery === "undefined") throw "JQuery could not be found, and is required by CSVera"
if (typeof _ === "undefined") throw "Underscore.js could not be found, and is required by CSVera"

$(document).ready(function () {
    var eventBus = new EventBus();
    $("table[csv]").each(function() {
        new Constructor($(this).attr("id"), $(this).attr("csv"), eventBus);
    });
    new ControlPanel($("table[csv]"), eventBus);
});
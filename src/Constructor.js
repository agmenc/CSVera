function Constructor(tableId, csvPath) {
    new TableLoader(tableId, csvPath, editTable);

    function editTable() {
        new TableEditor(tableId, new CsvExtractor(tableId).extract);
        new TableFilterer(tableId);
    }
}

if (typeof jQuery === "undefined") throw "JQuery could not be found, and is required by CSVera"
if (typeof _ === "undefined") throw "Underscore.js could not be found, and is required by CSVera"

$(document).ready(function () {
    $("table[csv]").each(function() {
        new Constructor($(this).attr("id"), $(this).attr("csv"));
    });
    new ControlPanel($("table[csv]"));

    function explain(message) {
        if(typeof console != "undefined") console.log(message)
    }

    explain("Click a row                   Select the row");
    explain("Up and down arrow keys        Move currently-selected row");
    explain("Mac users                     Use CMD in place of CTRL");
    explain("CTRL-d                        Duplicate currently-selected row");
    explain("Double-click a table cell     Edit cell contents");
    explain("CTRL-a                        Enter RAW MODE, displaying raw CSV");
    explain("CTRL-C                        RAW MODE: copy, of course");
    explain("ESC                           RAW MODE: exit raw mode");
});
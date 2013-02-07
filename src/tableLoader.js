function TableLoader(tableId, dataSourcePath, callback) {
    var targetTableId = "#" + tableId;
    $(this).inc(dataSourcePath, tabulate, callback);

    function tabulate(content) {
        var rows = content.split("\n");
        $(targetTableId).append("<thead>" + buildRow(rows.shift()) + "</thead>");
        $(targetTableId).append("<tbody>" + rows.map(buildRow).join("\n") + "</tbody>");
    }

    function buildRow(rowData) {
        return "<tr>" + buildCells(rowData.split(",", -1)) + " </tr>";
    }

    function buildCells(allCells) {
        return allCells.map(function(cellContents) {
            return "<td>" + cellContents + "</td>"
        }).join("\n")
    }
}
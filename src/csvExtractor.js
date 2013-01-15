function CsvExtractor(tableId) {
    var targetTableId = "#" + tableId;

    this.extract = function() {
        return $(targetTableId).find("tr").map(function() {
            return $(this).children("td").map(function() {
                return $(this).text();
            }).get().join(",");
        }).get().join("\n");
    }
}
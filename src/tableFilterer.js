function TableFilterer(tableId) {
    var targetTableId = "#" + tableId;

    $(targetTableId).find("thead td").each(function(index) {
        new ColumnFilterer($(this), index);
    });

    function ColumnFilterer($columnHeading, columnIndex) {
        var originalText = $columnHeading.html();

        prime();

        function prime() {
            $columnHeading.on("click.ColumnFilterer", showOptions);
        }

        function showOptions() {
            $columnHeading.off("click.ColumnFilterer");
            var selectBox = "<select name='" + originalText + "'>" + options() + "</select>";
            $columnHeading.html(selectBox);
            $columnHeading.find("select").change(chooseOption);
        }

        function chooseOption() {
            $columnHeading.html(originalText);
            filter($(this).val().trim());
            $(targetTableId).find("thead .filtered").each(function() {
                $(this).removeClass("filtered");
            });
            $columnHeading.addClass("filtered");
            prime();
        }

        function filter(criterion) {
            $(targetTableId).find("tbody tr").each(function() {
                var nthChild = $($(this).children("td").get(columnIndex));
                if (nthChild.text().trim() === criterion) $(this).show();
                else $(this).hide();
            });
        }

        function options() {
            var values = _.uniq($(targetTableId).find("tr").map(function() {
                return $($(this).children("td").get(columnIndex)).text();
            }).get());

            return _.map(values, toOption).join("");
        }

        function toOption(value) {
            return "<option value='" + value + "'>" + value + "</option>";
        }
    }
}
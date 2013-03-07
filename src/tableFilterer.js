function TableFilterer(tableId) {
    var targetTableId = "#" + tableId;

    $(targetTableId).find("thead td").each(function(index) {
        new ColumnFilterer($(this), index);
    });

    function ColumnFilterer($columnHeading, columnIndex) {

        var originalText = $columnHeading.html();

        prime();

        if (param(originalText.trim())) {
            filter(param(originalText.trim()));
        }

        function prime() {
            $columnHeading.on("click.ColumnFilterer", showOptions);
        }

        function showOptions() {
            $columnHeading.off("click.ColumnFilterer");
            $columnHeading.append("<select name='" + originalText + "' class='filterSelect'>" + options() + "</select>");
            var selector = $columnHeading.find("select");
            selector.change(chooseOption)
                    .blur(restoreHeading)
                    .attr("size", selector.find("option").size())
                    .focus();
        }

        function chooseOption() {
            $(targetTableId).find("thead .filtered").each(function() {
                $(this).removeClass("filtered");
            });
            var selectedOption = $(this).val().trim();
            (selectedOption === "Show All") ? unfilter() : filter(selectedOption);
            restoreHeading();
        }

        function restoreHeading() {
            $columnHeading.html(originalText);
            prime();
        }

        function unfilter() {
            $(targetTableId).find("tbody tr").show();
        }

        function filter(criterion) {
            $(targetTableId).find("tbody tr").each(function() {
                var nthChild = $($(this).children("td").get(columnIndex));
                if (nthChild.text().trim() === criterion) $(this).show();
                else $(this).hide();
            });
            $columnHeading.addClass("filtered");
            param(originalText.trim(), criterion);
        }

        function options() {
            var values = _.uniq($(targetTableId).find("tr").map(function() {
                return $($(this).children("td").get(columnIndex)).text();
            }).get());

            values.splice(1, 0, "Show All");

            return _.map(values, toOption).join("");
        }

        function toOption(value) {
            return "<option value='" + value + "'>" + value + "</option>";
        }
    }
}
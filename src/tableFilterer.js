function TableFilterer(tableId) {
    var targetTableId = "#" + tableId;
    var activeFilters = [];

    $(targetTableId).find("thead td").each(function(index) {
        new ColumnFilterer($(this), index);
    });

    function activate(filter) {
        activeFilters.push(filter);
        applyFilters();
    }

    function deactivate(filter) {
        activeFilters = _.without(activeFilters, filter)
        applyFilters();
    }

    function applyFilters() {
        $(targetTableId).find("tbody tr").each(function() {
            var $row = $(this);
            var accepted = _.reduce(activeFilters, function (memo, filter) { return memo && filter.accept($row) }, true);
            if (accepted) $(this).show();
            else $(this).hide();
        });
    }

    function ColumnFilterer($columnHeading, columnIndex) {
        var self = this;
        var originalText = $columnHeading.html();
        var currentCriterion = "";

        self.accept = function($row) {
            var nthChild = $($row.children("td").get(columnIndex));
            return nthChild.text().trim() === currentCriterion;
        };

        prime();

        if (param(originalText)) filter(param(originalText));

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
            var selectedOption = $(this).val().trim();
            (selectedOption === "Show All") ? unfilter() : filter(selectedOption);
            restoreHeading();
        }

        function restoreHeading() {
            $columnHeading.html(originalText);
            prime();
        }

        function unfilter() {
//            console.log("unfiltering: " + originalText + " == " + currentCriterion);
            deactivate(self);
            $columnHeading.removeClass("filtered");
            param(originalText, "Show All")
        }

        function filter(criterion) {
//            console.log("filtering: [" + originalText + "] == [" + criterion + "] (" + (typeof criterion) + ")");
            currentCriterion = criterion;
            activate(self);
            $columnHeading.addClass("filtered");
            param(originalText, criterion);
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
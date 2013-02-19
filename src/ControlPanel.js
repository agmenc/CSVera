function ControlPanel($allCsvTables, eventBus) {
    if ($allCsvTables.size() > 1) {
        eventBus.subscribe(this, "TableFilteredEvent");
        createButtons();
        showTable();
    }

    this.respond = function(event) {
        if (event.type === "TableFilteredEvent") {
            $("#csveraControlPanel").append("<span id='filterDisplay" + event.tableId + "' class='filterDisplay'><b>Filter:</b> " + event.tableId + " => " + event.column + " = " + event.criterion + "</span>");
        }
    }

    function showTable() {
        if (param("table")) {
            var $table = $("#" + param("table"));
            $("#" + buttonId($table)).click();
        } else {
            $("#csveraControlPanel").find("button").first().click();
        }
    }

    function createButtons() {
        $("body").append("<div id='csveraControlPanel' style='display: none;'></div>");
        var $controlPanel = $("#csveraControlPanel");

        $allCsvTables.each(function () {
            button($(this), $controlPanel);
        });

        $allCsvTables.first().before($controlPanel);
        $controlPanel.show();
    }

    function button($table, $controlPanel) {
        $controlPanel.append("<button id='" + buttonId($table) + "'>" + id($table) + "</button>");
        $("#" + buttonId($table)).click(function () {
            $allCsvTables.hide();
            $table.show();
            $controlPanel.find("button").css("font-weight", "normal");
            $(this).css("font-weight", "bold");
        });
    }

    function buttonId($table) {
        return "button_" + id($table);
    }

    function id($elem) {
        return $elem.attr("id");
    }
}

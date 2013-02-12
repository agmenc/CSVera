function ControlPanel($allCsvTables) {

    if ($allCsvTables.size() > 1) createButtons();

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
        var buttonId = "button_" + id($table);
        $controlPanel.append("<button id='" + buttonId + "'>" + id($table) + "</button>");
        $("#" + buttonId).click(function () {
            $allCsvTables.hide();
            $table.show();
        });
    }

    function id($elem) {
        return $elem.attr("id");
    }
}

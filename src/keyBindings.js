function keyFor(event) { return new KeyEvent(event) }

function KeyEvent(event) {
    function codeFor(character) {
        switch (character) {
            case "a": return 65;
            case "c": return 67;
            case "d": return 68;
            default: throw "Unsupported character: " + character + ". Please find an automagic way of mapping from chars to ASCII code.";
        }
    }

    this.CTRL = function(character) {
        return (event.metaKey || event.ctrlKey) && event.which == codeFor(character);
    }

    this.ESC = function() {
        return event.which == 27;
    }

    this.upArrow = function() {
        return event.which == 38;
    }

    this.downArrow = function() {
        return event.which == 40;
    }
}

function AddRow(whenAdded) {
    this.processKeypress = function($row, event) {
        if (keyFor(event).CTRL("d")) {
            var $newRow = $row.clone();
            $row.after($newRow);
            whenAdded($newRow);
            event.preventDefault();
            return true;
        }

        return false;
    }

    explain("CTRL-d                        Duplicate currently-selected row");
}

function MoveRow() {
    this.processKeypress = function($row, event) {
        if (keyFor(event).upArrow()) return swap($row.prev(), $row);
        else if (keyFor(event).downArrow()) return swap($row, $row.next());
        return false;
    }

    function swap(row1, row2) {
        if (row1.css("display") === "none") swap(row1.prev(), row2);
        else if (row2.css("display") === "none") swap(row1, row2.next());
        else row1.before(row2);
        return true;
    }

    explain("Up and down arrow keys        Move currently-selected row");
}

function CtrlCmd(whenPressed) {
    this.processKeypress = function($row, event) {
        if (keyFor(event).CTRL("a")) whenPressed();
        return false;
    }

    explain("CTRL-a                        Enter RAW MODE, displaying raw CSV");
    explain("CTRL-C                        RAW MODE: copy, of course");
    explain("ESC                           RAW MODE: exit raw mode");
}
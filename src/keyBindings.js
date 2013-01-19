function AddRow(whenAdded) {
    this.processKeypress = function($row, event) {
        if (event.ctrlKey && event.which === 68) {
            var $newRow = $row.clone();
            $row.after($newRow);
            whenAdded($newRow);
        }
    }
}

function LogKey() {
    this.processKeypress = function($row, event) {
        console.log(event.which);
    }
}

function MoveRow() {
    this.processKeypress = function($row, event) {
        switch (event.which) {
            case 38: swap($row.prev(), $row); break;
            case 40: swap($row, $row.next()); break;
        }
    }

    function swap(row1, row2) {
        if (row1.css("display") === "none") swap(row1.prev(), row2);
        else if (row2.css("display") === "none") swap(row1, row2.next());
        else row1.before(row2);
    }
}

function CtrlCmd(whenPressed) {
    this.processKeypress = function($row, event) {
        if (event.metaKey && event.which === 65) whenPressed();
    }
}
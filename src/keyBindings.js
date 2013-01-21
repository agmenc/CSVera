function AddRow(whenAdded) {
    this.processKeypress = function($row, event) {
        if (event.metaKey && event.which === 68) {
            var $newRow = $row.clone();
            $row.after($newRow);
            whenAdded($newRow);
            event.preventDefault();
        }
    }

    explain("CTRL-d                        Duplicate currently-selected row");
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

    explain("Up and down arrow keys        Move currently-selected row");
}

function CtrlCmd(whenPressed) {
    this.processKeypress = function($row, event) {
        if (event.metaKey && event.which === 65) whenPressed();
    }

    explain("CTRL-a CTRL-c                 Copy table as CSV (mimics select all-copy)");
}
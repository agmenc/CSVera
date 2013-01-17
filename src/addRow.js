function AddRow(whenAdded) {
    this.processKeypress = function($row, event) {
        if (event.ctrlKey && event.which === 68) {
            event.preventDefault();
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
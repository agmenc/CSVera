function AddRow() {
    this.processKeypress = function($row, event) {
        if (event.ctrlKey && event.which === 68) {
            event.preventDefault();
            $row.after($row.clone());
        }
    }
}

function LogKey() {
    this.processKeypress = function($row, event) {
        console.log(event.which);
    }
}
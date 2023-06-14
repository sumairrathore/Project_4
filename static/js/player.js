$(document).ready(function() {
    // Function to filter the table based on the selected player name
    function filterTable() {
        var selectedPlayer = $("#player-select").val(); // Get the selected player name
        // Show all rows in the table
        $(".player-row").show();
        // Hide rows that do not match the selected player name
        if (selectedPlayer !== "") {
            $(".player-row").not("[data-player='" + selectedPlayer + "']").hide();
        }
    }
    // Event handler for the dropdown change event
    $("#player-select").change(function() {
        filterTable(); // Filter the table when the dropdown value changes
    });
    // Call the filterTable function initially to apply any pre-selected player name
    filterTable();
});

function fetchTableData(table) {
    $.ajax({
        url: "/data",
        data: { table: table },
        success: function(data) {
            updateTable(data);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching table data:", error);
        }
    });
}

function updateTable(data) {
    var columns = Object.keys(data[0]);
    // Update the table header
    var tableHeader = "<tr>";
    columns.forEach(function(column) {
        tableHeader += "<th>" + column + "</th>";
    });
    tableHeader += "</tr>";
    $("table thead").html(tableHeader);
    // Update the table rows
    var tableRows = "";
    data.forEach(function(row) {
        tableRows += "<tr>";
        columns.forEach(function(column) {
            tableRows += "<td>" + row[column] + "</td>";
        });
        tableRows += "</tr>";
    });
    $("table tbody").html(tableRows);
}

function filterTable() {
    var selectedPlayer = document.getElementById('player-select').value;
    var rows = document.getElementsByClassName('player-row');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.cells[0].innerText === selectedPlayer) {
            row.style.display = '';
        }
        else {
            row.style.display = 'none';
        }
    }
}
function getModelInfo() {
    var selectedPlayer = document.getElementById("player-select").value;
    var selectedTable = getSelectedTable();
    // Make an AJAX request to the server to get the player information
    $.get("/ml_model_info", { table: selectedTable, selectedPlayer: selectedPlayer }, function(data) {
        // Update the table data with the received player information
        var playerTable = document.getElementById("player-table");
        var tbody = playerTable.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var row = document.createElement("tr");
            var nameCell = document.createElement("td");
            nameCell.textContent = data[i]['Name'];
            var ageCell = document.createElement("td");
            ageCell.textContent = data[i]['Age'];
            var nationalityCell = document.createElement("td");
            nationalityCell.textContent = data[i]['Nationality'];
            var wageCell = document.createElement("td");
            wageCell.textContent = data[i]['Wage'];
            var predictedRatingCell = document.createElement("td");
            predictedRatingCell.textContent = data[i]['PredictedRating'];
            row.appendChild(nameCell);
            row.appendChild(ageCell);
            row.appendChild(nationalityCell);
            row.appendChild(wageCell);
            row.appendChild(predictedRatingCell); // Add the predicted rating cell to the row
            tbody.appendChild(row);
        }
    });
}

function getSelectedTable() {
    // Get the hash value from the URL
    var hash = window.location.hash;
    if (hash) {
        // Remove the '#' character from the hash
        var table = hash.substr(1);
        return table;
    }
    else {
        // Return the default table name
        return "players_23";
    }
}

$(document).ready(function() {
    // Add active class to the first table link by default
    $(".filters a:first").addClass("active");
    // Add an event listener to the filter links
    $(".filters a").click(function(event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();
        $(".filters a").removeClass("active");
        $(this).addClass("active");
        var table = $(this).attr("href").substring(1);
        fetchTableData(table);
        // Update the URL hash with the selected table
        window.location.hash = $(this).attr("href");
        // Call the getModelInfo function to update the table data
        getModelInfo();
    });
    // Fetch table data for the initial table
    var initialTable = $(".filters a:first").attr("href").substring(1);
    fetchTableData(initialTable);
    // Call the getModelInfo function initially to load the default table data
    getModelInfo();
});

function fetchTableData(table) {
    $.ajax({
        url: "/ml_model_info",
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
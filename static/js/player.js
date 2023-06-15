function getPlayerInfo() {
    var selectedPlayer = document.getElementById("player-select").value;
    var selectedTable = getSelectedTable();

    // Make an AJAX request to the server to get the player information
    $.get("/player_info", { table: selectedTable, selectedPlayer: selectedPlayer }, function(data) {
        // Update the table data with the received player information
        var playerTable = document.getElementById("player-table");
        var tbody = playerTable.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var row = document.createElement("tr");
            var shortNameCell = document.createElement("td");
            shortNameCell.textContent = data[i].short_name;
            var ageCell = document.createElement("td");
            ageCell.textContent = data[i].age;
            var nationalityCell = document.createElement("td");
            nationalityCell.textContent = data[i].nationality;
            var clubCell = document.createElement("td");
            clubCell.textContent = data[i].club;
            row.appendChild(shortNameCell);
            row.appendChild(ageCell);
            row.appendChild(nationalityCell);
            row.appendChild(clubCell);
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
    } else {
        // Return the default table name
        return "players_15";
    }
}

$(document).ready(function() {
    // Add an event listener to the filter links
    $(".filters a").click(function(event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();
        // Update the URL hash with the selected table
        window.location.hash = $(this).attr("href");
        // Call the getPlayerInfo function to update the table data
        getPlayerInfo();
    });

    // Call the getPlayerInfo function initially to load the default table data
    getPlayerInfo();
});

/*
function getPlayerInfo() {
    var selectedPlayer = document.getElementById('player-select').value;
    if (selectedPlayer !== '') {
        var selectedTable = $(".filters a.active").attr("href").substring(1);
        var url = '/player_info?table=' + selectedTable + '&selectedPlayer=' + selectedPlayer;
        fetch(url).then(response => response.json()).then(data => {
            var playerTable = document.getElementById('player-table');
            var tbody = playerTable.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            if (data.length > 0) {
                var player = data[0];
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + player.short_name + '</td>' + '<td>' + player.age + '</td>' + '<td>' + player.nationality + '</td>' + '<td>' + player.club + '</td>';
                tbody.appendChild(row);
            }
        }).catch(error => {
            console.log('Error:', error);
        });
    }
}

$(document).ready(function() {
    // Add active class to the first table link by default
    $(".filters a:first").addClass("active");
    // Fetch table data when a table link is clicked
    $(".filters a").click(function(e) {
        e.preventDefault();
        $(".filters a").removeClass("active");
        $(this).addClass("active");
        var table = $(this).attr("href").substring(1);
        fetchTableData(table);
    });
    // Fetch table data for the initial table
    var initialTable = $(".filters a:first").attr("href").substring(1);
    fetchTableData(initialTable);
});

function fetchTableData(table) {
    $.ajax({
        url: "/player_info",
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
*/
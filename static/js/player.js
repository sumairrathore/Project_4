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
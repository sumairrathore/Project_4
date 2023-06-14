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

/*
function getPlayerInfo() {
    var selectedPlayer = document.getElementById('player-select').value;
    if (selectedPlayer !== '') {
        //var url = '/player_info?table=' + selectedTable + '&selectedPlayer=' + selectedPlayer;
        var url = '/player_info?selectedPlayer=' + selectedPlayer;
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
*/

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

/*
function getPlayerInfo() {
    // Get the selected player from the dropdown
    var selectedPlayer = $("#player-select").val();
    // Get the selected table from the URL hash
    var selectedTable = window.location.hash.substring(1);
    // Make a GET request to the server to retrieve player information
    $.ajax({
        url: "/player_info",
        method: "GET",
        data: {
            table: selectedTable,
            selectedPlayer: selectedPlayer
        },
        success: function (response) {
            // Update the player table with the retrieved player information
            var playerTable = $("#player-table tbody");
            playerTable.empty();
            if (response.length > 0) {
                var player = response[0];
                var row = $("<tr>");
                row.append($("<td>").text(player.short_name));
                row.append($("<td>").text(player.age));
                row.append($("<td>").text(player.nationality));
                row.append($("<td>").text(player.club));
                playerTable.append(row);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error retrieving player information:", error);
        }
    });
    // Make a GET request to the server to retrieve the table data
    $.ajax({
        url: "/data",
        method: "GET",
        data: {
            table: selectedTable
        },
        success: function (response) {
            // Update the entire table with the retrieved data
            var table = $(".content table");
            var thead = table.find("thead");
            var tbody = table.find("tbody");
            thead.empty();
            tbody.empty();
            if (response.length > 0) {
                var columns = Object.keys(response[0]);
                var headerRow = $("<tr>");
                columns.forEach(function (column) {
                    headerRow.append($("<th>").text(column));
                });
                thead.append(headerRow);
                response.forEach(function (row) {
                    var dataRow = $("<tr>");
                    columns.forEach(function (column) {
                        dataRow.append($("<td>").text(row[column]));
                    });
                    tbody.append(dataRow);
                });
            }
        },
        error: function (xhr, status, error) {
            console.log("Error retrieving table data:", error);
        }
    });
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
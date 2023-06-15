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
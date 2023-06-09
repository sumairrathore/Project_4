document.addEventListener('DOMContentLoaded', () => {
    // Get all filter links
    const filterLinks = document.querySelectorAll('.filters a');
    // Add click event listener to each filter link
    filterLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            const table = link.getAttribute('href').substring(1); // Get the table parameter from the link's href attribute
            // Make an AJAX request to the server to get the table data
            fetch(`/data?table=${table}`).then((response) => response.json()).then((data) => {
                // Clear the existing table rows
                const tableBody = document.querySelector('tbody');
                tableBody.innerHTML = '';
                // Populate the table with the new data
                data.forEach((player) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${player.long_name}</td><td>${player.age}</td><td>${player.overall}</td><td>${player.club}</td><td>${player.nationality}</td>`;
                    tableBody.appendChild(row);
                });
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    });
});
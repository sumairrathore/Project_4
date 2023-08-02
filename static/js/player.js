function getPlayerInfo() {
    // Get the selected player from the dropdown
    const selectedPlayer = document.getElementById("player-select").value;

    // Get the table body
    const playerTableBody = document.getElementById("player-table").getElementsByTagName("tbody")[0];

    // Clear the previous player rows before populating new data
    playerTableBody.querySelectorAll("tr.data-row").forEach(row => row.remove());

    // Make an AJAX request to fetch player information based on the selected player
    fetch(`/player_info?selectedPlayer=${selectedPlayer}`)
        .then(response => response.json())
        .then(data => {
            // Populate the player table with the retrieved data
            if (data.length > 0) {
                data.forEach(playerInfo => {
                    const row = document.createElement("tr");
                    row.classList.add("data-row");
                   
                    const nameCell = document.createElement("td");
                    nameCell.textContent = playerInfo.Name;
                    
                    const ageCell = document.createElement("td");
                    ageCell.textContent = playerInfo.Age;
                   
                    const nationalityCell = document.createElement("td");
                    nationalityCell.textContent = playerInfo.Nationality;
                   
                    const clubCell = document.createElement("td");
                    clubCell.textContent = playerInfo.Club;
                    
                    const overallCell = document.createElement("td");
                    overallCell.textContent = playerInfo.Overall;
                    
                    const potentialCell = document.createElement("td");
                    potentialCell.textContent = playerInfo.Potential;
                    
                    const wageCell = document.createElement("td");
                    wageCell.textContent = playerInfo.Wage;
                                           
                    const PredictedOverallCell = document.createElement("td");
                    PredictedOverallCell.innerHTML = playerInfo.Predicted_Overall;


                    row.appendChild(nameCell);
                    row.appendChild(ageCell);
                    row.appendChild(nationalityCell);
                    row.appendChild(clubCell);
                    row.appendChild(overallCell);
                    row.appendChild(potentialCell);
                    row.appendChild(wageCell);
                    row.appendChild(PredictedOverallCell);

                    playerTableBody.appendChild(row);
                });
            } else {
                // If no data is found, display a message in the table
                const row = document.createElement("tr");
                row.classList.add("data-row");
                const messageCell = document.createElement("td");
                messageCell.colSpan = 8; // Adjust the colspan according to the number of columns in the table
                messageCell.textContent = "No data available for the selected player.";
                row.appendChild(messageCell);
                playerTableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error("Error fetching player information:", error);
        });
}

function searchPlayer() {
    const searchText = document.getElementById("search-bar").value;
    const playerSelect = document.getElementById("player-select");

    // Search for the player in the dropdown options
    const options = playerSelect.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
        const player = options[i].value;
        if (player.toLowerCase().includes(searchText.toLowerCase())) {
            // If the player is found, set it as the selected option and trigger getPlayerInfo()
            playerSelect.value = player;
            getPlayerInfo();
            break;
        }
    }
}
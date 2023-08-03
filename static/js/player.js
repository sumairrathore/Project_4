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
                const row = document.createElement("tr");
                row.classList.add("data-row");
                const messageCell = document.createElement("td");
                messageCell.colSpan = 8;
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

    const options = playerSelect.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
        const player = options[i].value;
        if (player.toLowerCase().includes(searchText.toLowerCase())) {
            playerSelect.value = player;
            getPlayerInfo();
            break;
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    getPlayerInfo();
    getPlayerStats();
});

let radarChart;

function getPlayerStats() {
    const selectedPlayer = document.getElementById("player-select").value;

    fetch(`/player_stats?selectedPlayer=${selectedPlayer}`)
        .then(response => response.json())
        .then(stats => {
            if (!Array.isArray(stats)) {
                stats = [stats];
            }

            if (radarChart) {
                radarChart.destroy();
            }

            const datasets = [];
            const labels = ['Dribbling', 'ShortPassing', 'Acceleration', 'Vision', 'SlidingTackle'];

            stats.forEach(playerStats => {
                const maxStat = Math.max(...labels.map(statKey => playerStats[statKey])); 
                const data = labels.map(statKey => (playerStats[statKey] / maxStat) * 100); 
                datasets.push({
                    label: playerStats.Name, 
                    data: data,
                    borderColor: getRandomColor(),
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0.8)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 0, 0, 0.8)',
                    pointRadius: 4, 
                    pointHoverRadius: 6, 
                });
            });

            // Create the radar graph
            const ctx = document.getElementById('radarGraph').getContext('2d');
            radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            stepSize: 20, 
                            min: 0,
                            max: 100,
                        },
                        pointLabels: { 
                            fontSize: 14,
                        },
                    },
                },
            });
        })
        .catch(error => {
            console.error("Error fetching player stats:", error);
        });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
document.addEventListener('DOMContentLoaded', getPlayerStats);
document.getElementById("player-select").addEventListener('change', getPlayerStats);

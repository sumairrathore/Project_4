// Read in players data from the database
function readPlayersData() {
    // Assuming the URL for fetching player data is /data
    let playersUrlRead = "/data";
    return fetch(playersUrlRead).then(response => response.json()).then(data => {
        return data;
    }).catch(error => {
        console.log("Error reading player data:", error);
    });
}

// Create the bar chart\
function createBarChart(data) {
    // Your bar chart creation logic using D3.js and Plotly
    // Similar to the createBarChart function in belly.js
    // Extract the top 10 OTUs for the selected individual
    let selectedValue = d3.select("#selDataset").property("value");
    let samples = data.samples.filter(sample => sample.id === selectedValue)[0];
    let otuIds = samples.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let sampleValues = samples.sample_values.slice(0, 10).reverse();
    let otuLabels = samples.otu_labels.slice(0, 10).reverse();
    // Create the trace for the bar chart
    let trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };
    // Create the data array
    let chartData = [trace];
    // Define the layout
    let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };
    // Plot the chart
    Plotly.newPlot("bar", chartData, layout);
}

// Create the bubble chart
function createBubbleChart(data) {
    // Your bubble chart creation logic using D3.js and Plotly
    // Similar to the createBubbleChart function in belly.js
    // Extract the data for the selected individual
    let selectedValue = d3.select("#selDataset").property("value");
    let samples = data.samples.filter(sample => sample.id === selectedValue)[0];
    let otuIds = samples.otu_ids;
    let sampleValues = samples.sample_values;
    let otuLabels = samples.otu_labels;
    // Create the trace for the bubble chart
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Earth"
        }
    };
    // Create the data array
    let chartData = [trace];
    // Define the layout
    let layout = {
        title: "OTU Bubble Chart",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
    };
    // Plot the chart
    Plotly.newPlot("bubble", chartData, layout);
}

// Display the sample metadata (optional if needed)
function displayMetadata(data) {
    // Your code to display metadata (if needed)
    // Get the metadata for the selected individual
    let selectedValue = d3.select("#selDataset").property("value");
    let metadata = data.metadata.filter(meta => meta.id.toString() === selectedValue)[0];
    // Clear any existing metadata
    d3.select("#sample-metadata").html("");
    // Loop through each key-value pair in the metadata and display it
    Object.entries(metadata).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
    });
}

// Update all the plots and metadata when a new sample is selected (optional if needed)
function optionChanged(selectedValue) {
    // Your code to update the charts and metadata (if needed)
    console.log("Selected value:", selectedValue);
    readSamplesJSON().then(data => {
        createBarChart(data, selectedValue);
        createBubbleChart(data, selectedValue);
        displayMetadata(data, selectedValue);
        updateGaugeChart(selectedValue);
    });
}

// Function to initialize the page
function init() {
    console.log("Initializing the page for charts...");
    // Load players data
    readPlayersData().then(data => {
        createBarChart(data);
        createBubbleChart(data);
        // Add other chart creation functions if needed
    });
}

// Call the init function to initialize the page
init();
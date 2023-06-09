# Project 3 Fifa Analytics
Yumi Kim, Shoaib Khan, Sumair Rathore, Olivia Bryant

### Table of Contents
1. [Project Proposal](#project-proposal)
2. [Data Source](#data-source)
3. [Project File Structure](#project-file-structure)
4. [Dependencies](#dependencies)
5. [Start Up](#development-start-up)

## Project Proposal
The aim of our project is to create a Sports Analytics Dashboard that provides users with statistics and visualizations for sports data, such as player performance, team rankings, and game outcomes.
The dashboard will allow users to explore and analyze the data based on different filters, enabling them to gain insights and make data-driven decisions.
The dashboard page will include multiple charts that update from the same data, providing users with a comprehensive view of the sports analytics.
We will utilize a Python Flask-powered API, HTML/CSS, JavaScript, and a database (e.g., SQL, MongoDB, SQLite) to develop an interactive and informative dashboard.

## Data Source
[Kaggle Fifa 20 Dataset](https://www.kaggle.com/datasets/stefanoleone992/fifa-20-complete-player-dataset?select=players_20.csv)

## Project File Structure
```
Project_3/
├── data/
│   ├── players_15.csv
│   ├── players_16.csv
│   ├── players_17.csv
│   ├── players_18.csv
│   ├── players_19.csv
│   ├── players_20.csv
│   └── teams_and_leagues.csv
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── logic.js
├── templates/
│   └── index.html
├── app.py
└── README.md
```

- The `app.py` file is the main Flask application file. It imports the necessary modules and defines the Flask application using the `Flask` class.
    - The `load_csv_to_database()` function is defined to load CSV files into a SQLite database. It uses SQLAlchemy to create a database engine and inspect the tables in the database. It retrieves a list of CSV files from the "data" directory, reads each file using pandas, and inserts the data into corresponding tables in the database.
    - The `/` route is defined with the `index()` function. This function queries the required columns from all player tables and concatenates the results. It renders the `index.html` template and passes the player data to it.
    - The `/data` route is defined with the `get_table_data()` function. This function retrieves the table parameter from the query string and queries the required columns from the specified table. It returns the table data as a JSON response.
    - The `/favicon.ico` route is defined to handle the favicon request. It returns an empty response with status code 204.
- The `index.html` template is rendered by the `index()` function. It displays a panel with links to different player tables and a table to show player data. The table is initially populated with data from the "players_15" table. The template uses Jinja2 templating to dynamically populate the table with data received from the server.
- The `style.css` and `panel.css` files in the `static/css` directory contain CSS styles for the HTML elements in the template.
- The `logic.js` file in the `static/js` directory contains JavaScript code that adds event listeners to the filter links in the panel. When a filter link is clicked, an AJAX request is made to the server to get the corresponding table data. The received data is used to update the table dynamically without refreshing the page.
- The `data/` directory contains CSV files with player data for different FIFA games.

## Dependencies
1. `pip install flask pandas sqlalchemy`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.

[Back To Top](#project-3-fifa-analytics)
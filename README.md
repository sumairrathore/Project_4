# Project 3 Fifa Analytics
Yumi Kim, Shoaib Khan, Sumair Rathore, Olivia Bryant

### Table of Contents
1. [Project Proposal](#project-proposal)
2. [Data Source](#data-source)
3. [Project File Structure](#project-file-structure)
4. [Dependencies](#dependencies)
5. [Start Up](#development-start-up)
6. [To Work On](#to-work-on)

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

- `app.py`: This is the main Python file that contains the Flask application. It defines the routes and handles the logic for loading CSV data into the database and rendering the web pages. This file contains the Flask application code. It defines routes for the homepage ("/") and the "/data" endpoint, which returns JSON data for a specific table. The code uses SQLAlchemy to connect to the SQLite database and execute queries.
    - The `load_csv_to_database()` function is defined to load CSV files into a SQLite database. It uses SQLAlchemy to create a database engine and inspect the tables in the database. It retrieves a list of CSV files from the "data" directory, reads each file using pandas, and inserts the data into corresponding tables in the database.
    - The `/` route is defined with the `index()` function. This function queries the required columns from all player tables and concatenates the results. It renders the `index.html` template and passes the player data to it.
    - The `/data` route is defined with the `get_table_data()` function. This function retrieves the table parameter from the query string and queries the required columns from the specified table. It returns the table data as a JSON response.
    - The `/favicon.ico` route is defined to handle the favicon request. It returns an empty response with status code 204.
- `data/`: This directory contains the CSV files that hold the FIFA player data. Each file represents a different year of FIFA game data.
- `static/`: This directory contains the static files for the web application, such as CSS and JavaScript files.
- `templates/`: This directory contains the HTML templates that define the structure and layout of the web pages.
- `static/js/logic.js`: This JavaScript file handles the dynamic behavior of the web page. It listens for click events on the filter links and makes AJAX requests to the server to fetch the table data based on the selected filter. Then, it updates the HTML table with the new data.
- `templates/index.html`: This HTML template defines the structure of the main web page. It includes a header, a section with filters, a content area for displaying the table, and a footer. The table is initially populated with data from the "players_15" table.
- `static/css/style.css`: This CSS file defines the styles for the web page, including fonts, colors, layout, and table formatting.

## Dependencies
1. `pip install flask pandas sqlalchemy`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.

## To Work On
- Loading the entire dataset takes a long time to load, so need to find a quicker way to load the data.
    - There are 2 lines like this `query = f"SELECT long_name, age, overall, club, nationality FROM {table} LIMIT 20"` in the `app.py` file.
        - The `LIMIT 20` must be removed from both to load all the data onto the page, but until we find a quicker way of loading the data for viewing on the site it, this limit will make the site load faster for development purposes.

[Back To Top](#project-3-fifa-analytics)
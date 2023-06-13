# Project 3 Fifa Analytics
Olivia Bryant, Shoaib Khan, Sumair Rathore

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
│   ├── db/
│   │   └── database.db
│   ├── cleaned_data/
│   │   ├── players_cleaned_2015.csv
│   │   ├── players_cleaned_2016.csv
│   │   ├── players_cleaned_2017.csv
│   │   ├── players_cleaned_2018.csv
│   │   ├── players_cleaned_2019.csv
│   │   └── players_cleaned_2020.csv
│   ├── clean_data.ipynb
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
│   ├── index.html
│   ├── league.html
│   └── player.html
├── app.py
└── README.md
```
- `app.py`: This is the main Flask application file. It contains the route definitions and functions to handle HTTP requests. It also includes a function `load_csv_to_database()` to load CSV data into an SQLite database and serve the data through API endpoints.
- `data/`: This directory contains the data files used by the application. It includes CSV files containing player data for different years, a file `teams_and_leagues.csv` containing team and league information, and a subdirectory `db` that stores the SQLite database file `database.db`.
- `static/`: This directory contains static files used by the application, such as CSS and JavaScript files.
- `templates/`: This directory contains the HTML templates used to render the web pages of the application. It includes `index.html`, `player.html`, and `league.html`.
- The application uses SQLAlchemy to connect to the SQLite database and query the data. The `index()` function fetches player data from multiple tables and renders it in the `index.html` template. The `player()` and `league()` functions render the `player.html` and `league.html` templates, respectively.
- The JavaScript file `logic.js` handles the dynamic behavior of the dashboard, such as fetching and updating table data based on user interactions.
- The CSS file `style.css` defines the styling rules for the HTML templates.

## Dependencies
1. `pip install flask pandas sqlalchemy`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.

## To Work On
- Loading the entire dataset takes a long time to load, so need to find a quicker way to load the data.
    - There are 2 lines like this `query = f"SELECT long_name, age, overall, club, nationality FROM {table} LIMIT 100"` in the `app.py` file.
        - The `LIMIT 100` must be removed from both to load all the data onto the page, but until we find a quicker way of loading the data for viewing on the site it, this limit will make the site load faster for development purposes.

[Back To Top](#project-3-fifa-analytics)
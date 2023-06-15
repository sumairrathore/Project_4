# Project 3 Fifa Analytics
Olivia Bryant, Shoaib Khan, Sumair Rathore

### Table of Contents
1. [GitHub Pages](#github-pages)
2. [Project Proposal](#project-proposal)
3. [Data Source](#data-source)
4. [Project File Structure](#project-file-structure)
5. [Dependencies](#dependencies)
6. [Start Up](#development-start-up)
7. [To Work On](#to-work-on)

## GitHub Pages
[GitHub Pages Link Here](https://sumairrathore.github.io/Project_3/)

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
│   │   ├── players_15.csv
│   │   ├── players_16.csv
│   │   ├── players_17.csv
│   │   ├── players_18.csv
│   │   ├── players_19.csv
│   │   └── players_20.csv
│   ├── raw_data/
│   │   ├── players_15.csv
│   │   ├── players_16.csv
│   │   ├── players_17.csv
│   │   ├── players_18.csv
│   │   ├── players_19.csv
│   │   ├── players_20.csv
│   │   └── teams_and_leagues.csv
│   └── clean_data.ipynb
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
- `app.py`: This is the main Python file that defines the Flask application and the routes for different pages. It also contains functions for loading CSV data into a SQLite database and querying the database to fetch player data.
- `data/`: This directory contains subdirectories and files related to data management.
    - `db/`: This subdirectory contains the SQLite database file (`database.db`).
    - `cleaned_data/`: This subdirectory contains cleaned CSV files for each year (2015-2020) of player data.
    - `raw_data/`: This subdirectory contains raw CSV files for each year of player data, as well as a file (`teams_and_leagues.csv`) for team and league information.
    - `clean_data.ipynb`: This Jupyter Notebook file likely contains code for cleaning the raw CSV data.
- `static/`: This directory contains static files, such as CSS and JavaScript files, used for styling and interactivity.
    - `css/`: This subdirectory contains a CSS file (`style.css`) for defining the visual styles of the web pages.
    - `js/`: This subdirectory contains a JavaScript file (`logic.js`) that handles the dynamic behavior of the web pages.
- `templates/`: This directory contains HTML templates for the different pages of the web application.
    - `index.html`: This template represents the main page of the dashboard, which displays the player data.
    - `league.html`: This template likely represents a page for displaying league-specific data.
    - `player.html`: This template likely represents a page for displaying individual player data.

## Dependencies
1. `pip install flask pandas sqlalchemy`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.
    - The main page of the application (`index.html`) will display the player data fetched from the database.

## To Work On
- Loading the entire dataset takes a long time to load, so need to find a quicker way to load the data.
    - There are 2 lines like this `query = f"SELECT * FROM {table} LIMIT 100"` in the `app.py` file.
        - The `LIMIT 100` must be removed from both to load all the data onto the page, but until we find a quicker way of loading the data for viewing on the site it, this limit will make the site load faster for development purposes.

[Back To Top](#project-3-fifa-analytics)

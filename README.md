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
│   ├── imgs/
│   │   ├── fifa15.jpeg
│   │   ├── fifa16.jpeg
│   │   ├── fifa17.jpeg
│   │   ├── fifa19.jpeg
│   │   ├── fifa19.jpeg
│   │   └── fifa20.jpeg
│   └── js/
│       ├── player.js
│       └── logic.js
├── templates/
│   ├── index.html
│   ├── league.html
│   └── player.html
├── app.py
└── README.md
```
- `app.py`: This file contains the Flask application code. It defines routes for different URLs and handles requests to render HTML templates or return JSON data from the database.
    - The `index()` function renders the `index.html` template and passes player data to it.
    - The `player()` function renders the `player.html` template and passes player data to it.
    - The `league()` function renders the `league.html` template.
    - The `get_table_data()` function is an API endpoint that returns table data as JSON.
    - The `get_player_info()` function is another API endpoint that returns player information as JSON.
    - The `favicon()` function returns a 204 No Content response for the favicon.ico file.
- `data/`: This directory contains subdirectories for raw and cleaned data, as well as a SQLite database file.
- `static/`: This directory contains static assets such as CSS and JavaScript files.
- `templates/`: This directory contains HTML templates used by the Flask application to render web pages.
    - The HTML templates (`index.html`, `player.html`, `league.html`) define the structure and content of the web pages. They use Jinja templating syntax to dynamically generate HTML elements based on the data passed from the Flask application.

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
https://github.com/sumairrathore/Project_3/blob/olivia-develop/templates/index.html
[Back To Top](#project-3-fifa-analytics)

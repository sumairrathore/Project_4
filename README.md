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
8. [Presentation Notes](#presentation-notes)

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
│   ├── cleaned_data/
│   │   ├── players_15.csv
│   │   ├── players_16.csv
│   │   ├── players_17.csv
│   │   ├── players_18.csv
│   │   ├── players_19.csv
│   │   └── players_20.csv
│   ├── data_visualization_python/
│   │   └── ...
│   ├── db/
│   │   └── database.db
│   ├── eymk_data/
│   │   └── ...
│   ├── json/
│   │   ├── players_15.json
│   │   ├── players_16.json
│   │   ├── players_17.json
│   │   ├── players_18.json
│   │   ├── players_19.json
│   │   └── players_20.json
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
│       ├── map.js
│       ├── league.js
│       ├── player.js
│       └── logic.js
├── templates/
│   ├── map.html
│   ├── index.html
│   ├── league.html
│   └── player.html
├── app.py
└── README.md
```

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

## Presentation Notes
The project is a FIFA analytics dashboard that allows users to explore and analyze FIFA player data based on different filters. The dashboard is built using Flask, a Python web framework, and utilizes a SQLite database to store and retrieve the data.

The project structure consists of several files and directories:
- The `data` directory contains subdirectories for raw and cleaned data, as well as a SQLite database file (`database.db`). The cleaned data directory contains CSV files for each year of FIFA player data.
- The `data_visualization` directory contains files related to data visualization, including a Jupyter Notebook (`Final Work.ipynb`) and a PDF report (`Final.pdf`).
- The `static` directory contains subdirectories for CSS, images, and JavaScript files used in the web application.
- The `templates` directory contains HTML templates for different pages of the web application, including the index page (`index.html`), player data page (`player.html`), and league data page (`league.html`).
- The `app.py` file is the main Flask application file that defines the routes and handles the logic for each page of the web application.
- The `README.md` file provides documentation and instructions for running the project.

The `app.py` file defines several routes:
- The `/` route renders the index page and retrieves data from the SQLite database to display a table of FIFA player data.
- The `/player` route renders the player data page and retrieves player names from the database to populate a dropdown menu. Selecting a player triggers an AJAX request to fetch additional player information.
- The `/league` route renders the league data page.
- The `/data` route is an API endpoint that returns table data from the database as a JSON response.
- The `/player_info` route is another API endpoint that returns player information based on the selected player.

The HTML templates (`index.html`, `player.html`, `league.html`) define the structure and layout of the web pages. They include placeholders for displaying the data retrieved from the backend and utilize CSS stylesheets and JavaScript files for styling and interactivity.

Overall, the project provides a user-friendly interface for exploring and analyzing FIFA player data, allowing users to filter and view information about players and leagues.

[Back To Top](#project-3-fifa-analytics)
# Project 4 Fifa Analytics
Olivia Bryant, Shoaib Khan, Sumair Rathore

### Table of Contents
1. [GitHub Pages](#github-pages)
2. [Project Proposal](#project-proposal)
3. [Data Source](#data-source)
4. [Project File Structure](#project-file-structure)
5. [Dependencies](#dependencies)
6. [Start Up](#development-start-up)
7. [Presentation Notes](#presentation-notes)

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
│   │   ├── players_17_clean.csv
│   │   ├── players_18_clean.csv
│   │   ├── players_19_clean.csv
│   │   ├── players_20_clean.csv
│   │   ├── players_21_clean.csv
│   │   ├── players_22_clean.csv
│   │   └── players_23_clean.csv
│   ├── db/
│   │   └── database.db
│   ├── raw_data/
│   │   ├── players_17.csv
│   │   ├── players_18.csv
│   │   ├── players_19.csv
│   │   ├── players_20.csv
│   │   ├── players_21.csv
│   │   ├── players_22.csv
│   │   └── players_23.csv
│   └── clean_data.ipynb
├── static/
│   ├── css/
│   │   └── style.css
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

## Presentation Notes
The project is a FIFA analytics dashboard that allows users to explore and analyze FIFA player data based on different filters. The dashboard is built using Flask, a Python web framework, and utilizes a SQLite database to store and retrieve the data.

Overall, the project provides a user-friendly interface for exploring and analyzing FIFA player data, allowing users to filter and view information about players and leagues.

[Back To Top](#project-3-fifa-analytics)
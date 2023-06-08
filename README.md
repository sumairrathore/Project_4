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

- `app.py`: This is the main Flask application file that contains the server-side logic.
- `static/`: This folder contains static files such as CSS and JavaScript.
- `css/`: This subfolder holds the CSS files for styling the HTML.
- `style.css`: This file defines the styles for the HTML elements.
- `js/`: This subfolder stores the JavaScript files.
- `logic.js`: This file can contain client-side logic and interact with the DOM.
- `templates/`: This folder contains the HTML templates that Flask uses to render dynamic web pages.
- `index.html`: This HTML file represents the main page of the website and is rendered by Flask.
- `data/`: This folder contains the csv data files that will be used to create the analytics.

## Dependencies
1. `pip install flask pandas sqlalchemy`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.

[Back To Top](#project-3-fifa-analytics)
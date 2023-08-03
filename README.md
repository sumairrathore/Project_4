# Project 4 Fifa Analytics
Olivia Bryant, Shoaib Khan, Sumair Rathore

### Table of Contents
1. [GitHub Pages](#github-pages)
2. [Project Proposal](#project-proposal)
3. [Data Source](#data-source)
4. [Project File Structure](#project-file-structure)
5. [Dependencies](#dependencies)
6. [Presentation Notes](#presentation-notes)

## GitHub Pages
[GitHub Pages Link Here](https://sumairrathore.github.io/Project_4/)

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
│   │   ├── players_17.csv
│   │   ├── players_18.csv
│   │   ├── players_19.csv
│   │   ├── players_20.csv
│   │   ├── players_21.csv
│   │   ├── players_22.csv
│   │   └── players_23.csv
│   ├── db/
│   │   └── project4db.db
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
│       ├── ml_model.js
│       ├── player.js
│       └── logic.js
├── templates/
│   ├── ml_model.html
│   ├── index.html
│   └── player.html
├── app.py
├── ml_model.py
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
Our FIFA Player Analytics Dashboard, a comprehensive platform that delves into the intricate world of FIFA player data. This project not only provides an in-depth exploration of player details such as age, wage, acceleration, ball control, and overall potential, but also features the fascinating integration of machine learning-driven performance predictions. All of this is seamlessly presented through a user-friendly Flask web application, where data modeling and optimization take center stage.

**Age, Wage, Acceleration, Ball Control, and Overall Potential:** These attributes constitute just a few of the many player details that our dashboard uncovers. Users can easily navigate and extract insights from this wealth of information.

**Machine Learning-Driven Performance Predictions:** One of the highlights of our dashboard is its predictive power. Through advanced machine learning techniques, we've developed a model that predicts player performance. This means you can not only explore historical data but also peek into the future performance of your favorite players.

**Flask Web Application:** Our platform boasts an intuitive and interactive Flask web application. This application serves as a hub for users to seamlessly engage with data insights and predictions. The platform’s architecture is designed to accommodate a fluid experience, allowing users to effortlessly navigate through various features.

**Data Modeling and Optimization:** Behind the scenes, we’ve meticulously implemented data modeling and optimization processes. This ensures that the predictions generated are meaningful and reliable. We’ve documented the journey of model optimization, capturing the iterative changes and their corresponding impacts on performance.

The FIFA Player Analytics Dashboard offers a unique blend of comprehensive player details and cutting-edge predictive modeling, all within the framework of a user-friendly Flask web application. Our project embodies the fusion of data exploration, modeling, and optimization, making it a dynamic tool for both data enthusiasts and FIFA aficionados alike.

### Olivia's Project 4 Presentation Notes
The FIFA Player Analytics Dashboard dives into comprehensive FIFA player data, from player details like (Age, Wage, Acceleration, Ball Control, and Overall Potential), to machine learning driven performance predictions, presented through a Flask web application that seamlessly integrates data modeling and optimization.

[Back To Top](#project-4-fifa-analytics)
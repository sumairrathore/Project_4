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
- `data/db/database.db`: This file is a SQLite database where the cleaned data from the CSV files will be stored.
- `data/cleaned_data/players_cleaned_2015.csv`: This file contains the cleaned data for players in the year 2015.
- `data/cleaned_data/players_cleaned_2016.csv`: This file contains the cleaned data for players in the year 2016.
- `data/cleaned_data/players_cleaned_2017.csv`: This file contains the cleaned data for players in the year 2017.
- `data/cleaned_data/players_cleaned_2018.csv`: This file contains the cleaned data for players in the year 2018.
- `data/cleaned_data/players_cleaned_2019.csv`: This file contains the cleaned data for players in the year 2019.
- `data/cleaned_data/players_cleaned_2020.csv`: This file contains the cleaned data for players in the year 2020.
- `data/clean_data.ipynb`: This Jupyter Notebook file contains the code used to clean the raw data and generate the cleaned CSV files mentioned above.
- `data/players_15.csv`: This file contains the raw data for players in the year 2015.
-  `data/players_16.csv`: This file contains the raw data for players in the year 2016.
- `data/players_17.csv`: This file contains the raw data for players in the year 2017.
- `data/players_18.csv`: This file contains the raw data for players in the year 2018.
- `data/players_19.csv`: This file contains the raw data for players in the year 2019.
- `data/players_20.csv`: This file contains the raw data for players in the year 2020.
- `data/teams_and_leagues.csv`: This file contains data related to teams and leagues.
- `static/css/style.css`: This file contains CSS styles for the project, defining the appearance of HTML elements.
- `static/js/logic.js`: This file contains JavaScript code that handles interactions and updates the table data on the webpage.
- `templates/index.html`: This HTML file is the main template for the project's homepage. It displays the FIFA Analytics Dashboard, including the navigation bar, filters, table, and footer.
- `templates/league.html`: This HTML file is a template for displaying league data. It is linked in the navigation bar but does not contain specific content.
- `templates/player.html`: This HTML file is a template for displaying player data. It is linked in the navigation bar but does not contain specific content.
- `app.py`: This Python file is the main Flask application file. It defines the routes, handles database operations, and renders the templates for different webpages.

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
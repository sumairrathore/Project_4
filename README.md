# Project 3 Fifa Analytics
Yumi Kim, Shoaib Khan, Sumair Rathore, Olivia Bryant

### Table of Contents
1. [Project Proposal](#project-proposal)
2. [Data Source](#data-source)
3. [Project File Structure](#project-file-structure)
4. [Dependencies](#dependencies)
5. [Start Up](#development-start-up)
6. ...

## Project Proposal

## Data Source
[Kaggle Fifa 20 Dataset](https://www.kaggle.com/datasets/stefanoleone992/fifa-20-complete-player-dataset?select=players_20.csv)

## Project File Structure
```
project-folder/
├── app.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── logic.js
└── templates/
    └── index.html
├── data/
│   ├── players_15.csv
│   ├── players_16.csv
│   ├── players_17.csv
│   ├── players_18.csv
│   ├── players_19.csv
│   ├── players_20.csv
│   └── teams_and_leagues.csv
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

1. `pip install flask`

## Development Start Up
1. To start the server Flask app make sure you are in the root directory of the project and run `python app.py`
2. After running `python app.py` the server should be running on `http://127.0.0.1:5000`
3. Go to `http://127.0.0.1:5000` in your broswer and you should see the site.

...

[Back To Top](#project-3-fifa-20-analytics)
from flask import Flask, render_template, jsonify, request
from sqlalchemy import create_engine, inspect
import pandas as pd
import os
import sqlite3
import pickle

app = Flask(__name__)

def load_csv_to_database():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    inspector = inspect(engine)
    # Get a list of all CSV files in the data directory
    csv_files = [file for file in os.listdir('data/cleaned_data') if file.endswith('.csv')]
    # Load each CSV file into the database
    for file in csv_files:
        table_name = file.split('.')[0]
        # Check if the table already exists in the database
        if not inspector.has_table(table_name):
            csv_file = os.path.join('data/cleaned_data', file)
            # Read the CSV file into a pandas DataFrame
            df = pd.read_csv(csv_file)
            # Insert the DataFrame into the database table
            df.to_sql(table_name, engine, if_exists='replace', index=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/player')
def player():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    tables = ['FIFA17_official_data', 'FIFA18_official_data', 'FIFA19_official_data', 'FIFA20_official_data', 'FIFA21_official_data', 'FIFA22_official_data', 'FIFA23_official_data']
    players = []
    for table in tables:
        query = f"SELECT DISTINCT Name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    return render_template('player.html', players=players)

@app.route('/league')
def league():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from all the tables
    tables = ['FIFA17_official_data', 'FIFA18_official_data', 'FIFA19_official_data', 'FIFA20_official_data', 'FIFA21_official_data', 'FIFA22_official_data', 'FIFA23_official_data']
    players = []
    for table in tables:
        query = f"SELECT DISTINCT Name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the league.html template and pass the players data to it
    return render_template('league.html', players=players)

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/data')
def get_table_data():
    table = request.args.get('table', 'FIFA23_official_data')  # Get the table parameter from the query string, default to 'players_15'
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT * FROM {table} LIMIT 100"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/player_info')
def get_player_info():
    table = request.args.get('table', 'FIFA23_official_data')  # Get the table parameter from the query string, default to 'players_15'
    selectedPlayer = request.args.get('selectedPlayer', '')  # Get the selectedPlayer parameter from the query string
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT Name, Age, Nationality, Club, Overall, Potential, Wage, Predicted_Overall FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/league_info')
def get_league_info():
    table = request.args.get('table', 'FIFA23_official_data')  
    selectedPlayer = request.args.get('selectedPlayer', '')  
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT Name, Age, Nationality, Club FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    leagues = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(leagues)

@app.route('/player_stats')
def get_player_stats():
    selectedPlayer = request.args.get('selectedPlayer', '') 
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    
    query = f"SELECT Dribbling, ShortPassing, Acceleration, Vision, SlidingTackle FROM FIFA22_official_data WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    player_stats = [dict(row) for row in results]

    if not player_stats:
        player_stats = [{"Dribbling": None, "ShortPassing": None, "Acceleration": None, "Vision": None, "SlidingTackle": None}]  # If player not found in the table, add None values

    return jsonify(player_stats[0])
 
@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Load all the CSV files into the database
    load_csv_to_database()
    # Run the Flask application
    app.run(debug=True)
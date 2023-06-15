from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine, inspect
import pandas as pd
import os

app = Flask(__name__)

def load_csv_to_database():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
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
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from all the tables
    tables = ['players_15', 'players_16', 'players_17', 'players_18', 'players_19', 'players_20']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        query = f"SELECT * FROM {table} LIMIT 100"
        results = engine.execute(query)
        players += [dict(row) for row in results]
    # Render the index.html template and pass the players data to it
    return render_template('index.html', players=players)

@app.route('/player')
def player():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from all the tables
    tables = ['players_15', 'players_16', 'players_17', 'players_18', 'players_19', 'players_20']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        # Query the unique values from the `short_name` column of the `players` table
        query = f"SELECT DISTINCT short_name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the player.html template and pass the players data to it
    return render_template('player.html', players=players)

@app.route('/league')
def league():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from all the tables
    tables = ['players_15', 'players_16', 'players_17', 'players_18', 'players_19', 'players_20']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        # Query the unique values from the `short_name` column of the `players` table
        query = f"SELECT DISTINCT short_name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the player.html template and pass the players data to it
    return render_template('league.html', players=players)

@app.route('/data')
def get_table_data():
    table = request.args.get('table', 'players_15')  # Get the table parameter from the query string, default to 'players_15'
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from the specified table
    query = f"SELECT * FROM {table} LIMIT 100"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/player_info')
def get_player_info():
    table = request.args.get('table', 'players_15')  # Get the table parameter from the query string, default to 'players_15'
    selectedPlayer = request.args.get('selectedPlayer', '')  # Get the selectedPlayer parameter from the query string
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from the specified table
    query = f"SELECT short_name, age, nationality, club FROM {table} WHERE short_name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/league_info')
def get_league_info():
    table = request.args.get('table', 'players_15')  # Get the table parameter from the query string, default to 'players_15'
    selectedPlayer = request.args.get('selectedPlayer', '')  # Get the selectedPlayer parameter from the query string
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from the specified table
    query = f"SELECT short_name, nationality, club, team_position, age FROM {table} WHERE short_name = '{selectedPlayer}'"
    results = engine.execute(query)
    leagues = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(leagues)

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Load all the CSV files into the database
    load_csv_to_database()
    # Run the Flask application
    app.run(debug=True)
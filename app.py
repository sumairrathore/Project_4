import pandas as pd
from flask import Flask, render_template
from sqlalchemy import create_engine

app = Flask(__name__)

def load_csv_to_database(csv_file, table_name):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Insert the DataFrame into the database table
    df.to_sql(table_name, engine, if_exists='replace', index=False)

@app.route('/')
def index():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/database.db')
    # Query the required columns from the "players20" table
    query = "SELECT long_name, age, overall, club, nationality FROM players20 LIMIT 10"
    # Execute the query and fetch the results
    results = engine.execute(query)
    # Convert the results to a list of dictionaries
    players = [dict(row) for row in results]
    # Render the index.html template and pass the players data to it
    return render_template('index.html', players=players)

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Load the players_20.csv file into the database
    load_csv_to_database('data/players_20.csv', 'players20')
    # Run the Flask application
    app.run(debug=True)
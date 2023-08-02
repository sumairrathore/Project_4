import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

def train_and_evaluate_model():
    data = pd.read_csv('data/cleaned_data/players_17.csv')
    # Data preprocessing
    selected_features = ['Age', 'Potential', 'International Reputation', 'BallControl', 'Acceleration', 'Strength']
    X = data[selected_features]
    y = data['Overall']  # Use 'Overall' as the target variable
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Data normalization and standardization
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    # Model initialization, training, and evaluation
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    # Model performance evaluation
    r_squared = r2_score(y_test, y_pred)
    print(f"R-squared: {r_squared:.2f}")

if __name__ == "__main__":
    train_and_evaluate_model()
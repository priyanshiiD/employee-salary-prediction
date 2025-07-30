# 💼 Employee Salary Prediction using Machine Learning

This project predicts employee salaries based on features such as experience, education, job role, and other relevant factors. Multiple machine learning models were trained and evaluated to find the best-performing model.

---

## 📂 Dataset

The dataset used contains employee details like:

- Experience
- Education Level
- Job Title
- Location
- Company Size
- Industry
- Current Salary (target)

> 📌 **Note:** Dataset file is included in the repository as `employee_salary_data.csv`.

---

## ⚙️ Technologies Used

- Python
- Jupyter Notebook
- Pandas, NumPy
- Scikit-learn (Logistic Regression, Random Forest, KNN, SVM, Gradient Boosting)
- Matplotlib / Seaborn (optional for visualization)

---

## 📊 Features

- Data Cleaning and Preprocessing
- Encoding of Categorical Features
- Train-Test Split
- Pipeline for Scaling + Model Training
- Model Comparison
- Accuracy Evaluation using `accuracy_score` and `classification_report`

---

## 🧠 Model Performance

Model | Accuracy
:--|:--
Logistic Regression | 0.7777
K-Nearest Neighbors (KNN) | 0.7704
Support Vector Machine (SVM) | 0.7884
Random Forest | 0.8496
Gradient Boosting | **0.8571**

✅ **Best Model:** Gradient Boosting Classifier

---

## 🚀 How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/employee-salary-prediction.git
    cd employee-salary-prediction
    ```

2. (Optional) Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Open the Jupyter Notebook:
    ```bash
    jupyter notebook
    ```

---

## 📁 Project Structure

employee-salary-prediction/
│
├── adult3.csv # Dataset
├── employee salary prediction.ipynb # Main notebook
├── README.md # Project documentation
└── requirements.txt # Python dependencies

---

## 📌 Future Improvements

- Add more models like XGBoost or CatBoost
- Perform hyperparameter tuning
- Deploy the best model with Streamlit or Flask

---

## 📬 Contact

For any queries or suggestions, feel free to reach out via GitHub Issues.
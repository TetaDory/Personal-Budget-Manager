import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);  // State for budget limit
  const [totalExpenses, setTotalExpenses] = useState(0);  // State for total expenses
  const today = new Date().toISOString().split("T")[0];

  // Function to add or update an expense
  const handleExpenseSubmit = (expense) => {
    if (currentExpenseIndex !== null) {
      const updatedExpenses = expenses.map((exp, index) =>
        index === currentExpenseIndex ? expense : exp
      );
      setExpenses(updatedExpenses);
      setCurrentExpenseIndex(null);
    } else {
      setExpenses([...expenses, expense]);
    }
  };

  // Function to calculate total expenses
  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  // Function to delete an expense
  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const editExpense = (index) => {
    setCurrentExpenseIndex(index);
  };

  const addCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const isDateMatch = filterDate ? expense.date === filterDate : true;
    const isCategoryMatch = filterCategory ? expense.category === filterCategory : true;
    return isDateMatch && isCategoryMatch;
  });

  // Check if total expenses exceed or near the budget limit
  useEffect(() => {
    if (budgetLimit > 0 && totalExpenses >= budgetLimit) {
      alert('You have exceeded your budget limit!');
    } else if (budgetLimit > 0 && totalExpenses >= budgetLimit * 0.9) {
      alert('You are nearing your budget limit!');
    }
  }, [totalExpenses, budgetLimit]);

  return (
    <div className="App">
      <header>
        <h1>Personal Budget Manager</h1>
      </header>
      <main>
        <section>
          <h2>{currentExpenseIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
          <AddExpense
            addExpense={handleExpenseSubmit}
            currentExpense={currentExpenseIndex !== null ? expenses[currentExpenseIndex] : null}
            categories={categories}
            addCategory={addCategory}
          />
        </section>

        <section>
          <h2>Filter Expenses</h2>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter By Date"
            max={today}
          />
          <input
            type="text"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            placeholder="Filter By Category"
          />
          <button onClick={() => {
            setFilterDate('');
            setFilterCategory('');
          }}>Clear</button>
        </section>

        <section>
          <h2>Expenses List</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (RWF)</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.description}</td>
                    <td>{expense.amount.toLocaleString()}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button onClick={() => editExpense(index)}>
                        <i className="fas fa-edit" aria-hidden="true"></i>
                      </button>
                      <button onClick={() => deleteExpense(index)}>
                        <i className="fas fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Set Budget Limit</h2>
          <input
            type="text"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
            placeholder="Enter your budget limit (RWF)"
          />
          <p>Total Expenses: {totalExpenses.toLocaleString()} RWF</p>
        </section>
        <section>
          <h2>Expense Summary</h2>
        </section>
      </main>
    </div>
  );
}
export default App;
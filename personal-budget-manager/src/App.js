import React, { useState } from 'react';
import AddExpense from './components/AddExpense';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  // Function to add or update an expense
  const handleExpenseSubmit = (expense) => {
    if (currentExpenseIndex !== null) {
      // Update existing expense
      const updatedExpenses = expenses.map((exp, index) =>
        index === currentExpenseIndex ? expense : exp
      );
      setExpenses(updatedExpenses);
      setCurrentExpenseIndex(null); // Reset current expense index after editing
    } else {
      // Add new expense
      setExpenses([...expenses, expense]);
    }
  };

  // Function to delete an expense by index
  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index); // Remove the selected expense
    setExpenses(updatedExpenses); // Update the state
  };

  // Function to set the expense for editing
  const editExpense = (index) => {
    setCurrentExpenseIndex(index); // Set the current expense index for editing
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
            addCategory={addCategory} //Pass the addCategory function to AddExpense
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
                .slice() // Create a copy of the expenses array
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
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
          <h2>Expense Summary</h2>
          {/* Chart for Expense Summary will go here */}
        </section>
      </main>
    </div>
  );
}

export default App;

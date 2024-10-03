import React, { useState, useEffect } from 'react';
import CategoryModal from './CategoryModal';

const AddExpense = ({ addExpense, currentExpense, categories, addCategory }) => {
    const [expense, setExpense] = useState({ description: '', amount: '', category: '', date: '' });
    const [error, setError] = useState('');
    // const [newCategory, setNewCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (currentExpense) {
            setExpense(currentExpense);
        } else {
            resetForm();
        }
    }, [currentExpense]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { description, amount, category, date } = expense;

        // Check if the amount is a valid positive number
        const amountValue = parseFloat(amount);
        if (!description || !amount || !category || !date) {
            setError('Please fill in all fields');
            return;
        }
        if (isNaN(amountValue) || amountValue <= 0) {
            setError('Please enter a valid positive number for the amount');
            return;
        }

        addExpense({ ...expense, amount: amountValue }); // Ensure the amount is a number
        resetForm(); // Reset form after adding/updating
        setError(''); // Clear any previous error
    };

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'addCategory') {
            setIsModalOpen(true);
        } else {
            setExpense({ ...expense, category: selectedValue });
        }
    };

    const resetForm = () => {
        setExpense({ description: '', amount: '', category: '', date: '' });
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                value={expense.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="text"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                placeholder="Amount (RWF)"
                required
            />
            <select
                name="category"
                value={expense.category}
                onChange={handleDropdownChange}
                required
            >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
                <option value="addCategory">Add Category</option>
            </select>
            <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleChange}
                required
                max={today}
            />
            <button type="submit">{currentExpense ? 'Update Expense' : 'Add Expense'}</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {isModalOpen && (
                <CategoryModal
                    categories={categories}
                    addCategory={addCategory}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </form>
    );
};

export default AddExpense;

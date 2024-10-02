import React, { useState } from 'react';
import './CategoryModal.css';

const CategoryModal = ({ categories, addCategory, onClose }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory) {
            addCategory(newCategory);
            setNewCategory('');
            onClose(); // Close the modal after adding the category
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Manage Categories</h3>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add New Category"
                />
                <button onClick={handleAddCategory}>Add Category</button>

                <ul>
                    {categories.map((cat, index) => (
                        <li key={index}>
                            {cat}
                            <button onClick={() => {/* Edit category logic */}}>✎</button>
                            <button onClick={() => {/* Delete category logic */}}>✖</button>
                        </li>
                    ))}
                </ul>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CategoryModal;
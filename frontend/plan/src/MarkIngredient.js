import React, { useState } from 'react';
import axios from 'axios';

const MarkIngredient = ({ name }) => {
    const [form, setForm] = useState({ category: '', ingredient_name: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const username = localStorage.getItem('name'); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/shopping-list/mark/${username}`, form);
            alert(`${form.ingredient_name} marked as acquired`);
            setForm({ category: '', ingredient_name: '' });
        } catch (error) {
            alert('Error marking ingredient');
        }
    };

    return (
        <div>
            <h3>Mark Ingredient as Acquired</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ingredient_name"
                    placeholder="Ingredient Name"
                    value={form.ingredient_name}
                    onChange={handleChange}
                />
                <button type="submit">Mark as Acquired</button>
            </form>
        </div>
    );
};

export default MarkIngredient;

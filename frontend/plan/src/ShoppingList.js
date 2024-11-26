import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingList = ({ name }) => {
    const [shoppingList, setShoppingList] = useState(null);
    const username = localStorage.getItem('name'); 
    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const response = await axios.get(`/shopping-list/${username}`);
                setShoppingList(response.data.shopping_list);
            } catch (error) {
                alert('Error fetching shopping list');
            }
        };
        fetchShoppingList();
    }, [name]);

    return shoppingList ? (
        <div>
            <h3>Shopping List</h3>
            {Object.entries(shoppingList).map(([category, ingredients]) => (
                <div key={category}>
                    <h4>{category}</h4>
                    {Object.entries(ingredients).map(([ingredient, quantity]) => (
                        <p key={ingredient}>
                            {ingredient}: {quantity}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    ) : (
        <p>Loading shopping list...</p>
    );
};

export default ShoppingList;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './nutrition.css';

const NutritionModule = () => {
    const [foodSearch, setFoodSearch] = useState('');
    const [nutritionData, setNutritionData] = useState(null);

    const navigate = useNavigate(); // Initialize navigate hook
    const apiKey = 'b7bef736a55940899eac9fdee2aa3818';

    const fetchNutritionData = async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/guessNutrition`, {
                params: {
                    apiKey: apiKey,
                    title: foodSearch,
                },
            });
            setNutritionData(response.data);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            setNutritionData(null); // Clear data if API call fails
        }
    };

    const renderNutritionDetail = (detail) => {
        if (typeof detail === 'object' && detail.value) {
            return `${detail.value} ${detail.unit}`;
        }
        return detail || 'N/A';
    };

    return (
        <div className="nutrition-module">
            {/* Back Button using React Router */}
            <button 
                className="back-button" 
                onClick={() => navigate(-1)} // Navigate to the previous page
            >
                ← Back
            </button>

            <h2 className="page-title">Nutrition Information</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter food item"
                    value={foodSearch}
                    onChange={(e) => setFoodSearch(e.target.value)}
                    className="search-input"
                />
                <button onClick={fetchNutritionData} className="search-button">Search</button>
            </div>

            {nutritionData && (
                <div className="nutrition-details">
                    <h3 className="nutrition-title">Nutrition Facts for: <span>{foodSearch}</span></h3>
                    <div className="nutrition-card">
                        <img 
                            src="https://th.bing.com/th?id=OIP.C0HWTpT3Lj4aenl-AULNOgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2/150" 
                            alt="Food illustration" 
                            className="food-image" 
                        />
                        <ul className="nutrition-list">
                            <li><strong>Calories:</strong> {renderNutritionDetail(nutritionData.calories)}</li>
                            <li><strong>Protein:</strong> {renderNutritionDetail(nutritionData.protein)}</li>
                            <li><strong>Fat:</strong> {renderNutritionDetail(nutritionData.fat)}</li>
                            <li><strong>Carbohydrates:</strong> {renderNutritionDetail(nutritionData.carbs)}</li>
                        </ul>
                    </div>
                    <div className="decorative-stickers">
                        <img 
                            src="https://th.bing.com/th?id=OIP.C0HWTpT3Lj4aenl-AULNOgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2/50" 
                            alt="Healthy sticker" 
                            className="sticker" 
                        />
                        <img 
                            src="https://th.bing.com/th?id=OIP.8-HzapPtSr0qZwUSfMB1XgHaG1&w=260&h=240&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2/150" 
                            alt="Protein sticker" 
                            className="sticker" 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionModule;

import React, { useState } from 'react';
import axios from 'axios';
import './planning.css';

const MealPlanner = () => {
    const [meals, setMeals] = useState([]);
    const [diet, setDiet] = useState('');
    const [allergens, setAllergens] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [recipeDetails, setRecipeDetails] = useState(null);

    const apiKey = 'b7bef736a55940899eac9fdee2aa3818';

    const allergenOptions = ['Dairy', 'Egg', 'Gluten', 'Peanut', 'Seafood', 'Sesame', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
    const dietOptions = ['Vegan', 'Vegetarian', 'Paleo', 'Keto'];

    const fetchMealPlans = async () => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                params: {
                    apiKey: apiKey,
                    diet: diet,
                    intolerances: allergens.join(','),
                    number: 10,
                },
            });
            setMeals(response.data.results);
        } catch (error) {
            console.error('Error fetching meal plans:', error);
        }
    };

    const handleAllergenChange = (e) => {
        const selectedAllergen = e.target.value;
        setAllergens((prevAllergens) =>
            prevAllergens.includes(selectedAllergen)
                ? prevAllergens.filter((allergen) => allergen !== selectedAllergen)
                : [...prevAllergens, selectedAllergen]
        );
    };

    const fetchRecipeDetails = async (mealId) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${mealId}/information`, {
                params: {
                    apiKey: apiKey,
                },
            });
            setRecipeDetails(response.data);
            setSelectedMeal(mealId);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    return (
        <div className="meal-planner-container">
            <h2 className="header">Meal Planner</h2>

            {/* Diet and Allergen Filters */}
            <div className="filters">
                <div className="diet-options">
                    <label className="filter-label">Dietary Preference:</label>
                    <select onChange={(e) => setDiet(e.target.value)} value={diet}>
                        <option value="">None</option>
                        {dietOptions.map((dietOption) => (
                            <option key={dietOption} value={dietOption.toLowerCase()}>
                                {dietOption}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="allergen-options">
                    <label className="filter-label">Allergen Restrictions:</label>
                    <div className="checkbox-container">
                        {allergenOptions.map((allergen) => (
                            <div key={allergen} className="allergen-item">
                                <input
                                    type="checkbox"
                                    value={allergen.toLowerCase()}
                                    onChange={handleAllergenChange}
                                    className="allergen-checkbox"
                                />
                                <label>{allergen}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Button to fetch meal plans */}
            <button className="fetch-button" onClick={fetchMealPlans}>
                Get Meal Plans
            </button>

            {/* Display Meal Plans */}
            <div className="meal-list">
                {meals.map((meal) => (
                    <div
                        key={meal.id}
                        className={`meal-item ${selectedMeal === meal.id ? 'selected' : ''}`}
                        onClick={() => fetchRecipeDetails(meal.id)}
                    >
                        <div className="meal-image">
                            <img src={meal.image} alt={meal.title} />
                            <span className="sticker">New</span>
                        </div>
                        <h3>{meal.title}</h3>
                        <button className="view-recipe-btn">View Recipe</button>
                    </div>
                ))}
            </div>

            {/* Recipe Details Section */}
            {recipeDetails && selectedMeal && (
                <div className="recipe-details">
                    <button className="back-button" onClick={() => window.history.back()}>
                        Back
                    </button>
                    <h3>{recipeDetails.title}</h3>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />

                    {/* Ingredients Section */}
                    <div>
                        <h4>Ingredients:</h4>
                        <ul>
                            {recipeDetails.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Section */}
                    <div className="instructions-container">
                        <h4>Instructions:</h4>
                        <div className="instructions-list">
                            {recipeDetails.instructions
                                ?.split(/[0-9]+\.\s/) // Split by numbers with a period followed by space
                                .filter((step) => step.trim().length > 0)
                                .map((step, index) => (
                                    <div key={index} className="instruction-step">
                                        <div className="step-number">Step {index + 1}</div>
                                        <p className="step-description">{step.trim()}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <a href={recipeDetails.sourceUrl} target="_blank" rel="noopener noreferrer">
                        View Full Recipe
                    </a>
                </div>
            )}
        </div>
    );
};

export default MealPlanner;

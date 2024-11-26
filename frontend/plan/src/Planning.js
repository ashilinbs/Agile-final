import React, { useState } from 'react';
import axios from 'axios';

const MealPlanner = () => {
    const [meals, setMeals] = useState([]);
    const [diet, setDiet] = useState(''); // Dietary restrictions
    const [allergens, setAllergens] = useState([]); // List of selected allergens

    const apiKey = 'b7bef736a55940899eac9fdee2aa3818';

    // Common allergens
    const allergenOptions = ['Dairy', 'Egg', 'Gluten', 'Peanut', 'Seafood', 'Sesame', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
    const dietOptions = ['Vegan', 'Vegetarian', 'Paleo', 'Keto'];

    // Fetch meal plans based on the selected diet and allergens
    const fetchMealPlans = async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    apiKey: apiKey,
                    diet: diet, // Adds dietary restriction
                    intolerances: allergens.join(','), // Joins allergens with commas
                    number: 10 // Number of meal recommendations to fetch
                }
            });
            setMeals(response.data.results);
        } catch (error) {
            console.error('Error fetching meal plans:', error);
        }
    };

    // Handle allergen selection
    const handleAllergenChange = (e) => {
        const selectedAllergen = e.target.value;
        setAllergens((prevAllergens) =>
            prevAllergens.includes(selectedAllergen)
                ? prevAllergens.filter((allergen) => allergen !== selectedAllergen)
                : [...prevAllergens, selectedAllergen]
        );
    };

    return (
        <div>
            <h2>Meal Planner</h2>

            {/* Diet Options */}
            <div>
                <label>Dietary Preference:</label>
                <select onChange={(e) => setDiet(e.target.value)} value={diet}>
                    <option value="">None</option>
                    {dietOptions.map((dietOption) => (
                        <option key={dietOption} value={dietOption.toLowerCase()}>
                            {dietOption}
                        </option>
                    ))}
                </select>
            </div>

            {/* Allergen Options */}
            <div>
                <label>Allergen Restrictions:</label>
                {allergenOptions.map((allergen) => (
                    <div key={allergen}>
                        <input
                            type="checkbox"
                            value={allergen.toLowerCase()}
                            onChange={handleAllergenChange}
                        />
                        <label>{allergen}</label>
                    </div>
                ))}
            </div>

            {/* Button to fetch meal plans */}
            <button onClick={fetchMealPlans}>Get Meal Plans</button>

            {/* Display Meal Plans */}
            <div className="meal-list">
                {meals.map((meal) => (
                    <div key={meal.id} className="meal-item">
                        <h3>{meal.title}</h3>
                        <img src={meal.image} alt={meal.title} />
                        <a
                            href={`https://spoonacular.com/recipes/${meal.title}-${meal.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Recipe
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealPlanner;

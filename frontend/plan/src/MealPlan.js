import React, { useState } from 'react';
import axios from 'axios';
import './MealPlan.css';  // Import CSS file for styling

function MealPlan() {
  const [formData, setFormData] = useState({
    protein: '',
    fat: '',
    sodium: '',
    rating: '',
    '#cakeweek': '',
    yuca: '',
    zucchini: '',
    cookbooks: '',
    leftovers: '',
    snack: '',
    'snack week': '',
    turkey: ''
  });

  const [calories, setCalories] = useState(null);
  const [exercise, setExercise] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = localStorage.getItem('name');// Get the logged-in user's ID (replace with actual logic)
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { ...formData, name });
      setCalories(response.data.calories);
      setExercise(response.data.exercise);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="meal-plan">
      <button className="back-button" onClick={handleBack}>Back</button>
      <h1 className="meal-plan-title">Calorie Prediction and Exercise Recommendation</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Protein</label>
          <input
            type="number"
            name="protein"
            placeholder="Enter protein"
            value={formData.protein}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fat</label>
          <input
            type="number"
            name="fat"
            placeholder="Enter fat"
            value={formData.fat}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Sodium</label>
          <input
            type="number"
            name="sodium"
            placeholder="Enter sodium"
            value={formData.sodium}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="form-group">
          <label>#Cakeweek</label>
          <select name="#cakeweek" value={formData['#cakeweek']} onChange={handleChange}>
            <option value="">Select Cakeweek</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Yuca</label>
          <input
            type="number"
            name="yuca"
            placeholder="Enter yuca"
            value={formData.yuca}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Zucchini</label>
          <input
            type="number"
            name="zucchini"
            placeholder="Enter zucchini"
            value={formData.zucchini}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cookbooks</label>
          <select name="cookbooks" value={formData.cookbooks} onChange={handleChange}>
            <option value="">Select Cookbooks</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="form-group">
          <label>Leftovers</label>
          <select name="leftovers" value={formData.leftovers} onChange={handleChange}>
            <option value="">Select Leftovers</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Snack</label>
          <input
            type="number"
            name="snack"
            placeholder="Enter snack"
            value={formData.snack}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Snack Week</label>
          <select name="snack week" value={formData['snack week']} onChange={handleChange}>
            <option value="">Select Snack Week</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Turkey</label>
          <input
            type="number"
            name="turkey"
            placeholder="Enter turkey"
            value={formData.turkey}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Predict Calories</button>
      </form>

      {calories !== null && <p className="result">Predicted Calories: {calories}</p>}
      {exercise !== null && <p className="result">Recommended Exercise: {exercise}</p>}
    </div>
  );
}

export default MealPlan;

// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('name');

        if (!username) {
            setError('Username not found in local storage');
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/profile/${username}`);
                setProfile(response.data.profile);
                setLoading(false);
            } catch (error) {
                setError('Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default Profile;

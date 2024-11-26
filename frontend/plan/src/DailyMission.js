import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./mission.css";

const NutritionTutorials = () => {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('nutrition tips'); // Initial default query
    const apiKey = 'AIzaSyAgPyUBqQ4AWStR1MYlILvChVSilTG5Dqw';
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search`,
                    {
                        params: {
                            part: 'snippet',
                            q: searchQuery,
                            type: 'video',
                            maxResults: 100, // Number of videos to fetch
                            key: apiKey
                        }
                    }
                );
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, [searchQuery]);

    const handleSearch = () => {
        setSearchQuery(document.getElementById("search-input").value);
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <h2>Nutrition Tutorials</h2>
            <div className="search-bar">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search for tutorials"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="video-list">
                {videos.map((video) => (
                    <div key={video.id.videoId} className="video-item">
                        <h3>{video.snippet.title}</h3>
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={video.snippet.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NutritionTutorials;

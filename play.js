const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');  // Corrected casing
const Track = require('../models/track');  // Corrected casing

router.get('/', (req, res) => 
    res.render('playlist')
)
// Route to fetch all genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
});

// Route to fetch tracks by genre
router.get('/tracks', async (req, res) => {
    const { genre } = req.query;  // Get genre from query params
    try {
        const tracks = await Track.find(genre ? { genre } : {});
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

// Route to add new genres
router.post('/genres', async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = new Genre({ name });
        await newGenre.save();
        res.json({ message: 'Genre added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add genre' });
    }
});

// Route to add new tracks
router.post('/tracks', async (req, res) => {
    const { title, artist, genre, duration, audioUrl, coverImage } = req.body;
    try {
        const newTrack = new Track({
            title,
            artist,
            genre,
            duration,
            audioUrl,
            coverImage
        });
        await newTrack.save();
        res.json({ message: 'Track added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add track' });
    }
});

module.exports = router;

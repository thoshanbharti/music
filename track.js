const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: String, required: true },
    audioUrl: { type: String, required: true },
    coverImage: { type: String, required: true }
});

module.exports = mongoose.model('Track', TrackSchema);

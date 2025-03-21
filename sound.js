const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true }
});

module.exports = mongoose.model('Sound', soundSchema);

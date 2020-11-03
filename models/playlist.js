const mongoose = require('./index');

const Playlist = mongoose.model('Playlist', {
    url: []
});

module.exports = User;
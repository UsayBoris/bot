const mongoose = require('./index');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    emote: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
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
});

itemSchema.statics.findById = function (id) {
    return this.findOne({id: id});
};

itemSchema.statics.getItemString = async function (id, quantity) {
    let item = await this.findById(id);
    return  quantity + ' <' + item.emote + '> ' + item.name + '\n';
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
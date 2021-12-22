const mongoose = require('./index');

const guildSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: '+'
    }
});

guildSchema.statics.findById = function (id) {
    return this.findOne({id: id})
};

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
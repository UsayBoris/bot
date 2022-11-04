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
    return this.findOne({id: id});
};

guildSchema.statics.getPrefix = async function (id) {
    let guild = await this.findById(id)
    return guild['prefix'].toString();
};

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
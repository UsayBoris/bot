const {User} = require('../models/user');
const logger = require('../logger');

module.exports = class Transaction{
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }

    async process(){
        await User.findOne({id: this.id}).then(async user => {
            user.coins += this.value;
            user.save();
            logger.transaction(`${this.id.toString()} -> ${this.value}BC`);
        });
        return this.value;
    }
}
const {User} = require('../models/user');
const _Transaction = require('../models/transaction');
const logger = require('../logger');

module.exports = class Transaction {
    constructor(id, value, reason) {
        this.id = id;
        this.value = value;
        this.reason = reason;
    }

    async process() {
        await User.findOne({id: this.id}).then(async user => {
            user.coins += this.value;
            user.save();
            await _Transaction.create({value: this.value, description: this.reason});
            logger.transaction(`${this.id.toString()} -> ${this.value}BC "${this.reason}"`);
        });
        return this.value;
    }
}
const {User} = require('../models/user');
const _Transaction = require('../models/transaction');
const logger = require('../logger');

/**
 * Transaction
 * @description Represents a coin transaction between 2 users.
 * @class
 */
module.exports = class Transaction {
    /**
     * Transaction constructor
     * @param {string} id 
     * @param {number} value 
     * @param {string} reason 
     */
    constructor(id, value, reason) {
        this.id = id;
        this.value = value;
        this.reason = reason;
    }

    /**
     * Function to register a transaction
     * @description Finds the target user and updates its coin total based on the value sent to him.
     * @returns {number} The amount sent from one user to another.
     */
    async process() {
        await User.findOneAndUpdate({id: this.id}, {$inc: {coins: this.value}}).then(async () => {
            await _Transaction.create({user: this.id, value: this.value, description: this.reason});
            logger.transaction(`${this.id.toString()} -> ${this.value}BC "${this.reason}"`);
        });
        return this.value;
    }
}
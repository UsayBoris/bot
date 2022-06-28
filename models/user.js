const mongoose = require('./index');
const logger = require('../logger');
const Item = require('./item');

/**
 * Item
 * @type {Object} Item
 * @property {string} name         - The item name
 * @property {number} id           - The item ID
 * @property {number} quantity     - The amount of copies
 * @description Represents an Item as it is stored in the database
 */
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

/**
 * User
 * @type {Object} User
 * @property {string} name           - The user name
 * @property {number} id             - The user ID
 * @property {number} azia           - The amount of tilt the user has
 * @property {number} level          - The level of the user
 * @property {number} xp             - The XP the user has
 * @property {number} coins          - The total amount of coins owned
 * @property {Item} inventory        - A list of items owned by the user
 * @description Represents an Item as it is stored in the database
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    azia: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 1
    },
    coins: {
        type: Number,
        default: 0
    },
    inventory: {
        type: [itemSchema]
    }
});

userSchema.statics.findById = function (id) {
    return this.findOne({id: id});
};

userSchema.statics.getPerks = async function (id) {
    let user = await this.findById(id);
    let perks = [];
    for (const item of user.inventory) {
        if (await Item.getCategory(item.id) === 'perk') {
            perks.push({id: item.id, name: item.name, quantity: item.quantity})
        }
    }
    return perks;
};

userSchema.statics.getBalance = async function (id) {
    let user = await User.findById(id);
    return user.coins;
};

userSchema.statics.checkInventory = async function (id, itemId) {
    let user = await this.findById(id);
    return user.inventory.find(o => o.id === itemId);
};

userSchema.methods.addItem = async function (name, id) {
    let obj = this.inventory.find(x => x.name === name);
    if (!obj) {
        this.inventory.push({
            name: name,
            id: id,
            quantity: 1
        });
    } else {
        let index = this.inventory.indexOf(obj);
        this.inventory[index] = {
            name: obj.name,
            id: obj.id,
            quantity: obj.quantity + 1
        };
    }
}

userSchema.methods.removeItem = async function (name) {
    let obj = this.inventory.find(x => x.name === name);
    if (obj.quantity === 1) {
        let index = this.inventory.indexOf(obj);
        this.inventory.splice(index, 1);
    } else {
        let index = this.inventory.indexOf(obj);
        this.inventory[index] = {
            name: obj.name,
            id: obj.id,
            quantity: obj.quantity - 1
        };
    }
}

userSchema.methods.findItem = async function (name) {
    return this.inventory.find(x => x.name === name)
}

userSchema.methods.addExperience = async function (xp){
    this.xp += xp;
    let req_xp = 69 * (this.level + 1) * (1 + (this.level + 1));
    if (this.xp >= req_xp) {
        this.level += 1;
    }
}

const User = mongoose.model('User', userSchema);

/**
 * Function that checks if the user who sent the message already exists on the database.
 * 
 * @param {Object} message - The message sent on discord 
 */
async function newMessageUser(message) {
    await User.findOne({id: message.author.id}).then(async user => {

        if (user === null) {
            await User.create({name: message.author.username, id: message.author.id});
            return logger.warn('New User Created (first time talking in the presence of the bot)');
        }

        user.addExperience(1);
        user.name = message.author.username;

        user.save();
    });
}

module.exports = {User, newMessageUser};
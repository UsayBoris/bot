const {User} = require('../../models/user');

module.exports = {
    name: 'Private',
    description: 'Switch Private Mentions',
    usage: 'private on/off',
    execute: async function (message, client, args) {
        await User.findOne({id: message.author.id}).then(async user => {
            if (args[0] === 'on') {
                user.private = true;
            }
            if (args[0] === 'on') {
                user.private = false;
            } else {
                message.channel.send('Not a valid option');
            }
            await user.save();
        });
    }
};
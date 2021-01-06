const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'leave',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        await message.client.leave();
    },
    help: async function (message, prefix) {

    }
};
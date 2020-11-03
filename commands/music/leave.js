const { checkIfVoice } = require('./checkPermissions');

module.exports = {
    name: 'leave',
    execute: async function (message, client, args) {
        if(!checkIfVoice(message)) return;

        await client.voice.leave();
    },
    help: async function (message, prefix) {

    }
};
function checkPermissions(message, client) {
    const permissions = message.member.voice.channel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
        message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        return false;
    }
    if (!permissions.has('SPEAK')) {
        message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        return false;
    }
    return true;
}

function checkIfVoice(message) {
    if (!message.member.voice.channel) {
        message.reply('you need to be in a voice chat to do that');
        return false;
    }
    return true;
}

module.exports = {checkPermissions, checkIfVoice}
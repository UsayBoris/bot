module.exports = {
    name: 'Chest',
    description: 'If you have a specific Key, you can open a chest',
    usage: 'chest <key>',
    execute: async function (message, client, args) {
        return;
        let chest = args[0];
        switch (chest) {
            case 'bronze':
                break;
            case 'gold':
                break;
            default:
                break;
        }
    }
}
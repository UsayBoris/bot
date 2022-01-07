const blackjackRecently = new Set();
const shuffle = require("shuffle-array")

module.exports = {
    name: 'Blackjack',
    description: 'Blackjack game',
    usage: 'blackjack <value>',
    execute: async function (message, client, args) {
        return;
        if (blackjackRecently.has(message.author.id))
            return message.reply('Command under cooldown.');
        blackjackRecently.add(message.author.id);
        blackjackRecently.delete(message.author.id);

        let DECK = [
            {suit: 'clubs', rank: 'A', value: [1, 11], emoji: "♣"},
            {suit: 'clubs', rank: '2', value: 2, emoji: "♣"},
            {suit: 'clubs', rank: '3', value: 3, emoji: "♣"},
            {suit: 'clubs', rank: '4', value: 4, emoji: "♣"},
            {suit: 'clubs', rank: '5', value: 5, emoji: "♣"},
            {suit: 'clubs', rank: '6', value: 6, emoji: "♣"},
            {suit: 'clubs', rank: '7', value: 7, emoji: "♣"},
            {suit: 'clubs', rank: '8', value: 8, emoji: "♣"},
            {suit: 'clubs', rank: '9', value: 9, emoji: "♣"},
            {suit: 'clubs', rank: '10', value: 10, emoji: "♣"},
            {suit: 'clubs', rank: 'J', value: 10, emoji: "♣"},
            {suit: 'clubs', rank: 'Q', value: 10, emoji: "♣"},
            {suit: 'clubs', rank: 'K', value: 10, emoji: "♣"},
            {suit: 'diamonds', rank: 'A', value: [1, 11], emoji: "♦"},
            {suit: 'diamonds', rank: '2', value: 2, emoji: "♦"},
            {suit: 'diamonds', rank: '3', value: 3, emoji: "♦"},
            {suit: 'diamonds', rank: '4', value: 4, emoji: "♦"},
            {suit: 'diamonds', rank: '5', value: 5, emoji: "♦"},
            {suit: 'diamonds', rank: '6', value: 6, emoji: "♦"},
            {suit: 'diamonds', rank: '7', value: 7, emoji: "♦"},
            {suit: 'diamonds', rank: '8', value: 8, emoji: "♦"},
            {suit: 'diamonds', rank: '9', value: 9, emoji: "♦"},
            {suit: 'diamonds', rank: '10', value: 10, emoji: "♦"},
            {suit: 'diamonds', rank: 'J', value: 10, emoji: "♦"},
            {suit: 'diamonds', rank: 'Q', value: 10, emoji: "♦"},
            {suit: 'diamonds', rank: 'K', value: 10, emoji: "♦"},
            {suit: 'hearts', rank: 'A', value: [1, 11], emoji: "♥"},
            {suit: 'hearts', rank: '2', value: 2, emoji: "♥"},
            {suit: 'hearts', rank: '3', value: 3, emoji: "♥"},
            {suit: 'hearts', rank: '4', value: 4, emoji: "♥"},
            {suit: 'hearts', rank: '5', value: 5, emoji: "♥"},
            {suit: 'hearts', rank: '6', value: 6, emoji: "♥"},
            {suit: 'hearts', rank: '7', value: 7, emoji: "♥"},
            {suit: 'hearts', rank: '8', value: 8, emoji: "♥"},
            {suit: 'hearts', rank: '9', value: 9, emoji: "♥"},
            {suit: 'hearts', rank: '10', value: 10, emoji: "♥"},
            {suit: 'hearts', rank: 'J', value: 10, emoji: "♥"},
            {suit: 'hearts', rank: 'Q', value: 10, emoji: "♥"},
            {suit: 'hearts', rank: 'K', value: 10, emoji: "♥"},
            {suit: 'spades', rank: 'A', value: [1, 11], emoji: "♠"},
            {suit: 'spades', rank: '2', value: 2, emoji: "♠"},
            {suit: 'spades', rank: '3', value: 3, emoji: "♠"},
            {suit: 'spades', rank: '4', value: 4, emoji: "♠"},
            {suit: 'spades', rank: '5', value: 5, emoji: "♠"},
            {suit: 'spades', rank: '6', value: 6, emoji: "♠"},
            {suit: 'spades', rank: '7', value: 7, emoji: "♠"},
            {suit: 'spades', rank: '8', value: 8, emoji: "♠"},
            {suit: 'spades', rank: '9', value: 9, emoji: "♠"},
            {suit: 'spades', rank: '10', value: 10, emoji: "♠"},
            {suit: 'spades', rank: 'J', value: 10, emoji: "♠"},
            {suit: 'spades', rank: 'Q', value: 10, emoji: "♠"},
            {suit: 'spades', rank: 'K', value: 10, emoji: "♠"},
        ];

        message.channel.send(JSON.stringify(DECK[Math.floor(DECK.length * Math.random())]));

    }
}
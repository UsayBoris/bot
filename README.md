- [x] Change file structure, remove help function
- [x] Change experience calculation (requires database reset)
- [x] Check how to have static images (changed to emote)
- [x] Starter shop and buy options
- [ ] Shop Sprites
    - [ ] Weapons
    - [ ] Fish
    - [ ] Upgrades
- [x] Music Bot - https://github.com/mrsmook/music-discord-heroku-bot
    - [ ] Make play so that it can also reproduce from link or playlists
    - [ ] Jump and remove command, better queue display and song added
- [x] Better command handler
- [x] Better Logger - https://stackify.com/winston-logging-tutorial/
- [ ] Role Management - https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/understanding/roles.md
- [ ] Google Search
- [x] Make pretty Embed stuff
- [x] Fix help command
- [x] Improve mining method:
    - [x] Add a luck and speed upgrade
- [x] Profile perks (mining and other)
- [ ] Maybe work on a minigame

- [x] Make a suggestions command, that saves requests for bot functions

**SHORT TEAM TODO**
- [x] Give command
- [x] Purchase limiting, at least for perks (probably to a static value);
- [ ] Mining to grant a BC bonus every block Mined
- [x] Add an Inventory command
  - [ ] Split items by category
- [ ] Add teams
    - [ ] Find an API to generate a chart of the most users in each team
- [ ] Probably change everything that access the database to a class

**Fixes**
- [x] Fix Dice Command (new Discordjs version)
    - [x] Dice command is working but need to be redone to support transactions
- [x] Empty bot command gives an error message "+"
- [x] Fix NSFW command
- [x] All permission commands are not working
- [ ] Find a better buy (method to add something to the user inventory, because of mining rewards)

**Latest Version: 2.5.2**
- Help Command improved, now shows every command on empty;
- Deleting incomplete commands;
# Discord Bot NFT Ownership Verification
this Bot is to verify the user is ownership of HeadDAO or not.

by typing `>verify your wallet address`, discord bot will get the info from HeadDAO contract,  
if you are Holder or Staker, you will be assigned corresponding role in the server.

## Prerequisite

### Infura
1. create an [Infura](https://infura.io/) account
2. create a new project
3. copy PROJECT_ID and PROJECT_SECRET to create a web3 provider

### Discord
1. navigate to [Discord Developer](https://discord.com/developers/)
2. create an application
3. create a bot
4. generate an authorization link on OATH tab (select the function for this BOT before generate the link)
5. copy DISCORD_BOT_TOKEN to login the Bot via javascirpt code

### .env setting
1. if you want to test in your local, create a file named`.env` under the project folder
2. add PROJECT_ID, PROJECT_SECRET and DISCORD_BOT_TOKEN on it

---

## Start the Bot
open the terminal then type `npm start` to activate this verfication Bot.

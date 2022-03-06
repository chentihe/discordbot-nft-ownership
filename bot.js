import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
import HeadDaoHolder from "./headdaoholder.js";
import HeadDaoStaker from "./headdaostaker.js";

dotenv.config();

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on("ready", () => {
  console.log(`${bot.user.username} is up and running`);
});

const addRoles = (message, member, roles, holder, stakerList) => {
  const headDaoHolder = member.guild.roles.cache.find(
    (role) => role.name === "HeadDAO Holder"
  );
  const headDaoStaker = member.guild.roles.cache.find(
    (role) => role.name === "HeadDAO Staker"
  );

  if (holder > 0 && !stakerList.length > 0) {
    // add Holder
    if (roles.some((role) => role === "HeadDAO Holder")) {
      return message.reply("You already verified.");
    }
    member.roles.add(headDaoHolder);
    return message.reply("You are HeadDAO holder");
  } else if (!holder > 0 && stakerList.length > 0) {
    // add Staker
    if (roles.some((role) => role === "HeadDAO Staker")) {
      return message.reply("You aleady verified.");
    }
    member.roles.add(headDaoStaker);
    return message.reply("You are HeadDAO staker");
  } else if (holder > 0 && stakerList.length > 0) {
    // add Holder & Staker
    if (
      roles.some((role) => role === "HeadDAO Holder") &&
      !roles.some((role) => role === "HeadDAO Staker")
    ) {
      member.roles.add(headDaoStaker);
    } else if (
      !roles.some((role) => role === "HeadDAO Holder") &&
      roles.some((role) => role === "HeadDAO Staker")
    ) {
      member.roles.add(headDaoHolder);
    } else if (
      !roles.some((role) => role === "HeadDAO Holder") &&
      !roles.some((role) => role === "HeadDAO Staker")
    ) {
      member.roles.add(headDaoHolder);
      member.roles.add(headDaoStaker);
    } else {
      return message.reply("You aleady verified.");
    }
    return message.reply("You are HeadDao staker & holder");
  }
  return message.reply("You are not HeadDao staker && holder");
};

const headDaoVerify = async (message, address) => {
  const member = message.member;
  const roles = member.roles.cache.map((role) => role.name);

  const holder = await HeadDaoHolder(address)
    .then((holder) => holder.toNumber())
    .catch((error) => console.log(error));
  const stakerList = await HeadDaoStaker(address)
    .then((stakerList) => stakerList.map((staker) => staker.toNumber()))
    .catch((error) => console.log(error));

  console.log("headDAO amount of holder : ", holder);
  console.log("staker list : ", stakerList);

  addRoles(message, member, roles, holder, stakerList);
};

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(">verify")) {
    const address = message.content.split(" ")[1];
    headDaoVerify(message, address).catch((error) => {
      return message.reply(
        "Please enter `>verify your address` to process verification."
      );
    });
  } else {
    return message.reply(
      "Please enter `>verify your address` to process verification."
    );
  }
});

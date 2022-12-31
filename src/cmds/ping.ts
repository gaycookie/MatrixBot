import { Command } from "../command";

const command: Command = {
  cmdName: "ping",
  cmdAliases: [],
  async execute(bot, roomId, event, args) {
    return new Promise((resolve, reject) => {
      bot.client.sendMessage(roomId, {
        body: "Pong! 🏓",
        msgtype: "m.text"
      });
    });
  }
}

module.exports = command;
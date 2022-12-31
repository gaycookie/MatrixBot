import { Command } from "../command";

const command: Command = {
  commandName: "ping",
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
import { ICommand } from "../command";

const command: ICommand = {
  name: "ping",
  aliases: [],
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
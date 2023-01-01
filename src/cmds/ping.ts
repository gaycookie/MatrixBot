import { ICommand } from "../command";

const command: ICommand = {
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
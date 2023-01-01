import fs from "fs";
import path from "path";
import { MessageEvent, MessageEventContent } from "matrix-bot-sdk";
import { MatrixBot } from ".";
import { ICommand } from "./command";

export class CommandHandler {
  private bot: MatrixBot; 
  private botUserId: string;
  private botDisplayName: string;
  private commands: Set<ICommand> = new Set();
  private prefixes: string[];

  constructor(bot: MatrixBot) {
    this.bot = bot;
  }

  public async prepare() {
    this.botUserId = await this.bot.client.getUserId();

    const profile = await this.bot.client.getUserProfile(this.botUserId);
    if (profile && profile['displayname']) this.botDisplayName = profile['displayname'];

    this.prefixes = this.bot.config.commandPrefixes || [ "!" ];
    if (this.bot.config.enableMentionPrefix) {
      this.prefixes.push(this.botUserId + ":");
      this.prefixes.push(this.botDisplayName + ":");
    }

    this.loadCommands();
    this.bot.client.on("room.message", this.onMessage.bind(this));
  }

  private loadCommands() {
    fs.readdir(path.join(__dirname, "cmds"), (err, files) => {
      if (err) throw(err);

      for (const file of files.filter(file => file.endsWith('.js'))) {
        const command: ICommand = require(path.join(__dirname, "cmds", file));
        this.commands.add(command);
      }
    });
  }

  private async onMessage(roomId: string, ev: MessageEvent<MessageEventContent>) {
    const event = new MessageEvent(ev);
    await this.bot.client.sendReadReceipt(roomId, event.eventId);

    if (event.isRedacted) return;
    if (event.sender === this.botUserId) return;
    if (event.messageType !== "m.text") return;

    const prefixUsed = this.prefixes.find(p => event.textBody.startsWith(p));
    if (!prefixUsed) return;

    const args = event.textBody.substring(prefixUsed.length).trim().split(' ');
    if (!args) return;

    const commandName = args.shift();
    const commandArgs = args;

    const command = Array.from(this.commands).find(c => c.cmdName === commandName || c.cmdAliases.includes(commandName));   
    if (!command) return;

    command.execute(this.bot, roomId, event, commandArgs).then((err) => console.log("Something went wrong:", err));
  }
}
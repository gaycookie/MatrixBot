import { MatrixClient, SimpleFsStorageProvider, AutojoinRoomsMixin } from "matrix-bot-sdk";
import { CommandHandler } from "./commandHandler";
import { Config } from "./config";
import { ReminderLoop } from "./reminderLoop";

export class MatrixBot {
  public config: Config = new Config("../config.json");
  public storage: SimpleFsStorageProvider = new SimpleFsStorageProvider("storage.json");
  public client: MatrixClient = new MatrixClient(this.config.homeServer, this.config.accessToken, this.storage);
  public commandHandler: CommandHandler;
  public reminderLoop: ReminderLoop;

  constructor() {
    console.log("Bot is now starting...");
    
    AutojoinRoomsMixin.setupOnClient(this.client);
    this.commandHandler = new CommandHandler(this);
    this.reminderLoop = new ReminderLoop(this);

    this.commandHandler.prepare();
    this.reminderLoop.start();
    
    this.client.start().then(() => console.log("Bot was started successfully!"));
  }
}

new MatrixBot();
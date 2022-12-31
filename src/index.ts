import { MatrixClient, SimpleFsStorageProvider, AutojoinRoomsMixin } from "matrix-bot-sdk";
import { CommandHandler } from "./commandHandler";
import { Config } from "./config";

export class MatrixBot {
  public config: Config = new Config("../config.json");
  public storage: SimpleFsStorageProvider = new SimpleFsStorageProvider("storage.json");
  public client: MatrixClient = new MatrixClient(this.config.homeServer, this.config.accessToken, this.storage);
  private commandHandler: CommandHandler;

  constructor() {
    console.log("Bot is now starting...");
    
    AutojoinRoomsMixin.setupOnClient(this.client);
    this.commandHandler = new CommandHandler(this);
    this.commandHandler.prepare();
    
    this.client.start().then(() => console.log("Bot was started successfully!"));
  }
}

new MatrixBot();
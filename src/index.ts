import { MatrixClient, RustSdkCryptoStorageProvider, SimpleFsStorageProvider } from "matrix-bot-sdk";
import { CommandHandler } from "./commandHandler";
import { Config } from "./config";
import { ReminderLoop } from "./reminderLoop";

export class MatrixBot {
  public config: Config = new Config("config.yaml");
  public cryptoStorage: RustSdkCryptoStorageProvider = new RustSdkCryptoStorageProvider("storage");
  public storage: SimpleFsStorageProvider = new SimpleFsStorageProvider("storage/storage.json");
  public client: MatrixClient = new MatrixClient(this.config.home_server, this.config.access_token, this.storage, this.cryptoStorage);
  public commandHandler: CommandHandler;
  public reminderLoop: ReminderLoop;

  constructor() {
    console.log("Bot is now starting...");

    this.commandHandler = new CommandHandler(this);
    this.reminderLoop = new ReminderLoop(this);

    this.commandHandler.prepare();
    this.reminderLoop.start();

    this.client.on("room.invite", (roomId, event) => {
      if (!this.config.auto_join && !this.config.admins.includes(event.sender)) return
      this.client.joinRoom(roomId);
    });

    this.client.start().then(async () => {
      const profile = await this.client.getUserProfile(await this.client.getUserId());
      console.log("Bot is started and connected as " + profile.displayname);
    });
  }
}

new MatrixBot();
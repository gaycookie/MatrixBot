export class Config {
  public homeServer: string;
  public accessToken: string;
  public enableMentionPrefix: boolean;
  public commandPrefixes: string[];

  constructor(path: string) {
    try {
      Object.assign(this, require(path));
    } catch(e) {
      throw new Error("Could not find the config file: " + path);
    }

    if (this.homeServer === "https://matrix.example.com") {
      throw new Error("Please change your home server in the configuration file.");
    }

    if (this.accessToken === "syt_") {
      throw new Error("Please change your access token in the configuration file.");
    }
  }
}
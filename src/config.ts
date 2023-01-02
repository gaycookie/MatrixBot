import YAML from "yaml";
import fs from "fs";

export class Config {
  public home_server: string;
  public access_token: string;
  public admins: string[];
  public auto_join: boolean;
  public command_prefix: string;
  public enable_mention_prefix: boolean;

  constructor(path: string) {
    if (!fs.existsSync(path)) throw new Error("Could not find the config file: " + path);
    const file = fs.readFileSync(path, "utf8");
    Object.assign(this, YAML.parse(file));

    if (this.home_server === "https://matrix.example.com") {
      throw new Error("Please change your home server in the configuration file.");
    }

    if (this.access_token === "syt_") {
      throw new Error("Please change your access token in the configuration file.");
    }
  }
}
export class Config {
  public homeServer: string;
  public accessToken: string;
  public enableMentionPrefix: boolean;
  public commandPrefixes: string[];

  constructor(path: string) {
    try {
      Object.assign(this, require(path));
    } catch(e) {
      throw("Could not find the config file: " + path);
    }
  }
}
import { MessageEvent, MessageEventContent } from "matrix-bot-sdk";
import { MatrixBot } from ".";

export interface ICommand {
  name: string;
  aliases: string[];
  execute(
    bot: MatrixBot, 
    roomId: string, 
    event: MessageEvent<MessageEventContent>, 
    args: string[]
  ): Promise<void>;
}
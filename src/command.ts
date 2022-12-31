import { MessageEvent, MessageEventContent } from "matrix-bot-sdk";
import { MatrixBot } from ".";

export interface Command {
  commandName: string;
  execute(
    bot: MatrixBot, 
    roomId: string, 
    event: MessageEvent<MessageEventContent>, 
    args: string[]
  ): Promise<void>;
}
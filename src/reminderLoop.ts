import { MentionPill } from "matrix-bot-sdk";
import moment from "moment";
import { MatrixBot } from ".";

export interface IReminder {
  roomId: string;
  userId: string;
  timestamp: number;
  message?: string;
}

export class ReminderLoop {
  private bot: MatrixBot;
  public reminders: IReminder[] = [];
  private intervalId: NodeJS.Timer;

  constructor(bot: MatrixBot) {
    this.bot = bot;
  }

  public start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.loop(), 1000)
  }

  public stop() {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private loop() {
    const currentTime = moment().unix();
    const reminders = this.reminders.filter(r => r.timestamp === currentTime);
    if (!reminders.length) return;

    reminders.forEach(async reminder => {
      const mention = await MentionPill.forUser(reminder.userId, reminder.roomId, this.bot.client);
      await this.bot.client.sendMessage(reminder.roomId, {
        body: `${mention.text}: Here is your reminder!`,
        msgtype: "m.text",
        format: "org.matrix.custom.html",
        formatted_body: `${mention.html}: Here is your reminder!`
      });
      delete this.reminders[this.reminders.indexOf(reminder)];
    })
  }
}
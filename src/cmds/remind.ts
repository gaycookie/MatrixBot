import { ICommand } from "../command";
import moment from "moment";
import "moment-duration-format"

const command: ICommand = {
  name: "remind",
  aliases: ["notetoself", "rememberme", "reminder"],
  async execute(bot, roomId, event, args) {
    return new Promise(async (resolve, reject) => {
      
      const joinedString = args.join(" ");
      const timeRegex = /((\d+)\s*(s|m|h|d))/g;
      const timeParts = Array.from(joinedString.matchAll(timeRegex));

      const currentTime = moment();
      const newTime = moment();

      if (!timeParts.length) {
        await bot.client.replyText(roomId, event, "You forgot to tell me when to remind you!");
        return;
      }

      for (let i = 0; i < timeParts.length; i++) {
        if (timeParts[i][3] === "s") newTime.add(timeParts[i][2], "seconds");
        if (timeParts[i][3] === "m") newTime.add(timeParts[i][2], "minutes");
        if (timeParts[i][3] === "h") newTime.add(timeParts[i][2], "hours");
        if (timeParts[i][3] === "d") newTime.add(timeParts[i][2], "days");
        if (timeParts[i][3] === "w") newTime.add(timeParts[i][2], "weeks");
      }

      const durationInSeconds = newTime.diff(currentTime, "seconds");
      const durationFormatted = moment.duration(durationInSeconds, "s").format();

      bot.reminderLoop.reminders.push({ roomId: roomId, userId: event.sender, timestamp: newTime.unix() });
      await bot.client.replyText(roomId, event, "Your reminder has been set. I'll remind you in " + durationFormatted);
    });
  }
}

module.exports = command;
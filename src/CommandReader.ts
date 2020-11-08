import { Client, ChatUserstate } from 'tmi.js';
import Player from './Player';
import speak from './Speaker';

class CommandReader {
  constructor(
    private target: string,
    private context: ChatUserstate,
    private client: Client,
  ) {}

  async execute(message: string): Promise<void> {
    const messageTrim = message.trim();
    const commandName = messageTrim.substr(0, messageTrim.indexOf(' ')).trim();
    const text = messageTrim.substr(messageTrim.indexOf(' ')).trim();

    console.log(`commandName = ${commandName}`);
    console.log(`text = ${text}`);

    if (commandName === '!dice') {
      this.client.say(this.target, `You rolled a ${3}`);
      console.log(
        `* Executed ${commandName} command by ${this.context.username}`,
      );
    } else if (commandName === '!speak') {
      await speak(text, 'pt-BR');
      const player = new Player('speak.mp3');
      await player.play();

      console.log(
        `* Executed ${commandName} command by ${this.context.username}`,
      );
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  }
}

export default CommandReader;

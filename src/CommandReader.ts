import { Client, ChatUserstate } from 'tmi.js';
import SpeakerCommandReader from './Speaker/SpeakerCommandReader';

class CommandReader {
  constructor(
    private target: string,
    private context: ChatUserstate,
    private client: Client,
  ) {}

  async execute(message: string): Promise<void> {
    const [commandName, text] = this.getCommandAndText(message);

    console.log(`commandName = ${commandName}`);
    console.log(`text = ${text}`);

    const speakerCommandReader = new SpeakerCommandReader(
      text,
      commandName,
      this.context.username,
    );
    speakerCommandReader.execute();

    console.log(
      `* Executed ${commandName} command by ${this.context.username}`,
    );
  }

  private getCommandAndText(message: string): Array<string> {
    const messageTrim = message.trim();
    if (messageTrim.indexOf(' ') === -1) {
      return [messageTrim];
    }

    const commandName = messageTrim.substr(0, messageTrim.indexOf(' ')).trim();
    const text = messageTrim.substr(messageTrim.indexOf(' ')).trim();

    return [commandName, text];
  }
}

export default CommandReader;

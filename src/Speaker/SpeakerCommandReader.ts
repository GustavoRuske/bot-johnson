import speak from './Speaker';
import speakerLanguageCode from './SpeakerLanguageCode';

export default class SpeakerCommandReader {
  constructor(
    private textToRead: string,
    private commandName: string,
    private user: string | undefined,
  ) {}

  async execute(): Promise<void> {
    console.log(
      `language selected = ${speakerLanguageCode.getLanguageCode(
        this.commandName,
      )}`,
    );

    await speak(`${this.user} disse.`, 'pt-BR');

    await speak(
      this.textToRead,
      speakerLanguageCode.getLanguageCode(this.commandName),
    );
  }
}

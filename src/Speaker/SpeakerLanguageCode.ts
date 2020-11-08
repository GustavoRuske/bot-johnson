interface IDictionary<TValue> {
  [id: string]: TValue;
}

class SpeakerLanguageCode {
  private languageCode: IDictionary<string>;

  constructor() {
    this.languageCode = {};
    this.languageCode['!speak'] = 'pt-BR';
    this.languageCode['!speakPT'] = 'pt-PT';
    this.languageCode['!speakES'] = 'es-ES';
    this.languageCode['!speakKR'] = 'ko-KR';
    this.languageCode['!speakJP'] = 'ja-JP';
    this.languageCode['!speakFR'] = 'fr-FR';
  }

  public getLanguageCode(languageCode: string): string {
    return this.languageCode[languageCode];
  }
}

export default new SpeakerLanguageCode();

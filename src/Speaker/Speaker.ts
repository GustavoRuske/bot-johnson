import textToSpeech from '@google-cloud/text-to-speech';
import * as protos from '@google-cloud/text-to-speech/build/protos/protos';
import fs from 'fs';
import util from 'util';
import path from 'path';
import Player from '../Player';

const client = new textToSpeech.TextToSpeechClient();
const audioName = 'speak.mp3';

const audioPath = path.resolve(__dirname, '..', '..', 'tmp', audioName);

export default async function speak(
  text: string,
  languageCode: string,
): Promise<void> {
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode },
    // select the type of audio encoding
    audioConfig: {
      audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
    },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  const { audioContent } = response;
  if (!audioContent) {
    return;
  }
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(audioPath, audioContent, 'binary');
  console.log(`Audio content written to file: ${audioName}`);
  new Player(audioName).play();
}

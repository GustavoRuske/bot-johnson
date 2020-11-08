import path from 'path';
import { execSync } from 'child_process';

class Player {
  private name: string;

  constructor(audioName: string) {
    this.name = audioName;
  }

  public async play(): Promise<void> {
    const isWin = process.platform === 'win32';

    const tmpFolder = path.resolve(__dirname, '..', 'tmp', this.name);

    if (isWin) {
      await execSync(`start ${tmpFolder}`);
    } else {
      await execSync(`play -v 0.6 ${tmpFolder}`);
    }
  }
}

export default Player;

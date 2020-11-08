import path from 'path';
import { execSync } from 'child_process';

class Player {
  private name: string;

  constructor(audioName: string) {
    this.name = audioName;
  }

  public async play(): Promise<void> {
    const tmpFolder = path.resolve(__dirname, '..', 'tmp', this.name);

    await execSync(`play -v 0.1 ${tmpFolder}`);
  }
}

export default Player;

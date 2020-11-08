import { Client, Options, ChatUserstate } from 'tmi.js';
import CommandReader from './CommandReader';

import 'dotenv/config';

const opts: Options = {
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.OAUTH,
  },
  channels: JSON.parse(process.env.CHANNELS),
};

// Create a client with our options
const client = Client(opts);

// Called every time a message comes in
async function onMessageHandler(
  target: string,
  context: ChatUserstate,
  msg: string,
  self: boolean,
) {
  if (self) {
    return;
  } // Ignore messages from the bot

  const isCommand = msg.trim().startsWith('!');
  if (!isCommand) {
    return;
  }

  new CommandReader(target, context, client).execute(msg);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

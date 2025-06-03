import command from './whitelist';
import {Collection} from 'discord.js';

const commands = [
  /*
   * name: 'whitelist',
   * description: 'whitelist a user on the mc server',
  */
  command,
]

export default () => {
  const collection = new Collection();

  for (let command of commands) {
    if (!'data' in command) {
      console.log(`[WARN] - ${command.name} is missing the "data" property.`);
      return;
    } else if (!'execute' in command) {
      console.log(`[WARN] - ${command.name} is missing the "command" property.`);
      return;
    }

    collection.set(command.data.name, command);
  }

  return collection
}

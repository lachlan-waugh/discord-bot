import command from './whitelist';
import { Collection, REST, Routes } from 'discord.js';

const commands = [
  /*
   * name: 'whitelist',
   * description: 'whitelist a user on the mc server',
  */
  command,
]

/*
 * Push commands to Discord
 */
const push_commands = async (commands) => {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands },
  );
}

/*
 * Register all the /commands
 */
export default () => {
  const collection = new Collection();

  for (let command of commands) {
    if (!('data' in command)) {
      console.log(`[WARN] - ${command.name} is missing the "data" property.`);
      return;
    } else if (!('execute' in command)) {
      console.log(`[WARN] - ${command.name} is missing the "command" property.`);
      return;
    }

    collection.set(command.data.name, command);
  }

  push_commands(collection.map((c) => c.data.toJSON()));
  return collection
}

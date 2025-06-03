import { MessageFlags } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import sendCommand from '../mc';
import * as fs from 'fs';

const get_user_list = () => {
  try {
    return JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const save_user_list = async (users) => {
  try {
    fs.writeFileSync('users.json', JSON.stringify(users));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const set_user = async (user, username) => {
  const users = await get_user_list();
  users[user.id] = username;
  save_user_list(users);
}

// Ensure users only have a single mc account associated with them.
const revoke_previous_whitelists = async (username, user) => {
  const prev = get_user_list()[user.id] ?? null ;
  // Re-whitelisting the same user, w/e
  if (!prev || prev === username) {
      console.log(`[*] ${username} is already associated with ${user.id}`)
      return;
  }

  console.log(`[*] Deleting ${prev}`)
  await sendCommand(`whitelist remove ${prev}`)
}

const whitelist = async (interaction) => {
  const user = interaction.user;
  const username = interaction.options.get('target').value;
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
    await interaction.reply({
      content: 'Ay dont do that `[a-zA-Z0-9_]{3,16}` only.',
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  await revoke_previous_whitelists(username, user);

  // please dont hack me
  console.log(`[*] Adding ${username}`)
  await sendCommand(`whitelist add ${username}`)
  set_user(user, username);
  await interaction.reply({
    content: `${username} has been whitelisted`,
    flags: MessageFlags.Ephemeral
  });
}

export default {
  data: new SlashCommandBuilder()
	  .setName('whitelist')
	  .setDescription('Adds a user to the mc server whitelist')
	  .addStringOption(option =>
	    option
	      .setName('target')
	      .setDescription('The user to add to the whitelist')
	      .setRequired(true)
	  ),
  execute: async (interaction) => await whitelist(interaction)
}

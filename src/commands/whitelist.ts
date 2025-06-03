import { MessageFlags } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const whitelist = async (interaction) => {
  const username = interaction.options.get('target').value;
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    await interaction.reply({
      content: 'Ay dont do that',
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  // please dont hack me
  //sendCommand(`whitelist ${username}`)
  await interaction.reply({
    content: 'You have been whitelisted',
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

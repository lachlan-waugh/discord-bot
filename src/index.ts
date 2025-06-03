import {Client, Events, GatewayIntentBits, IntentsBitField} from 'discord.js';
import register_slash_commands from './commands';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ]
});
client.commands = register_slash_commands();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async interaction => {
	console.log('hello');
});

client.login(process.env.DISCORD_TOKEN);

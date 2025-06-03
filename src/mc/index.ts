import { Rcon } from "rcon-client";

const sendCommand = async (command: str): Promise<void> => {
  try {
    const rcon = await Rcon.connect({
      host: 'localhost',
      port: 25575,
      password: process.env.RCON_PASSWORD ?? 'password123',
    });
    console.log(await rcon.send(command));
    rcon.end();
  } catch (error) {
    console.error('Error with RCON connection:', error);
  }
};

export default sendCommand;

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Obtener las variables de entorno
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!BOT_TOKEN || !GUILD_ID) {
  console.error('Missing environment variables: BOT_TOKEN or GUILD_ID');
  process.exit(1); // Detener el servidor si faltan variables
}

// Endpoint para obtener información del servidor de Discord
app.get('/discord-info', async (req, res) => {
  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}/preview`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });

    const data = response.data;

    res.json({
      memberCount: data.approximate_member_count || 0,
      onlineMembers: data.approximate_presence_count || 0,
    });
  } catch (error) {
    console.error('Error fetching Discord info:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching Discord information' });
  }
});

// Ruta predeterminada para evitar errores 404
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

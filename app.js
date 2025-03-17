require('dotenv').config(); // Carga las variables de entorno desde .env

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen. Cambia esto a un origen específico si es necesario.
}));

const PORT = process.env.PORT || 3000;

// Obtener las variables de entorno
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

// Endpoint para obtener información del servidor de Discord
app.get('/discord-info', async (req, res) => {
  try {
    if (!BOT_TOKEN || !GUILD_ID) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

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
    console.error('Error fetching Discord info:', error);
    res.status(500).json({ error: 'Error fetching Discord information' });
  }
});

// Ruta predeterminada para evitar errores 404
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

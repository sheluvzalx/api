const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para permitir solicitudes desde tu aplicación React Native
app.use(cors());

// Endpoint para obtener información del servidor de Discord
app.get('/discord-info', async (req, res) => {
  try {
    const BOT_TOKEN = 'MTMzNTk4OTUzMzMzODExMjAzMA.G0VNvu.3RVhTpGVnoMhR9W7_Zpl2IBa3LJKwfBMPX3tHw'; // Reemplaza con tu token
    const GUILD_ID = '1333936507580317817'; // Reemplaza con tu ID de servidor

    const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });

    const data = response.data;

    // Devuelve la información relevante
    res.json({
      memberCount: data.member_count || 0,
      onlineMembers: data.presence_count || 0,
    });
  } catch (error) {
    console.error('Error fetching Discord info:', error);
    res.status(500).json({ error: 'Error fetching Discord information' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`[+] API RUNNING `);
});

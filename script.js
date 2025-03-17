document.addEventListener('DOMContentLoaded', () => {
  const loadingElement = document.getElementById('loading');
  const errorElement = document.getElementById('error');
  const infoElement = document.getElementById('info');
  const memberCountElement = document.getElementById('member-count');
  const onlineMembersElement = document.getElementById('online-members');

  // Función para cargar datos del servidor
  async function fetchDiscordInfo() {
    try {
      // Hacer la solicitud a tu API
      const response = await fetch('https://api-gilt-nine.vercel.app/discord-info');
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();

      // Mostrar los datos en la página
      memberCountElement.textContent = data.memberCount || 'N/A';
      onlineMembersElement.textContent = data.onlineMembers || 'N/A';

      // Ocultar el mensaje de carga y mostrar la información
      loadingElement.classList.add('hidden');
      infoElement.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching Discord info:', error);

      // Mostrar el mensaje de error
      loadingElement.classList.add('hidden');
      errorElement.textContent = 'No se pudo cargar la información del servidor.';
      errorElement.classList.remove('hidden');
    }
  }

  // Llamar a la función para cargar los datos
  fetchDiscordInfo();
});

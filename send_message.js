const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Número al que vas a enviar el mensaje (formato internacional)
const numero = '5491161358035@c.us'; // cambia al tuyo

// Crear cliente con autenticación local (se guarda en .wwebjs_auth)
const client = new Client({
  authStrategy: new LocalAuth()
});

// Mostrar el QR en la terminal
client.on('qr', (qr) => {
  console.log('Escanea este QR con WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Confirmar cuando esté listo
client.on('ready', () => {
  console.log('✅ Cliente conectado y listo para usar.');

  // Enviar un mensaje de prueba
  client.sendMessage(numero, '¡Hola! Este es un mensaje de prueba.')
    .then(() => console.log('Mensaje enviado ✅'))
    .catch(err => console.error('Error al enviar mensaje:', err));
});

// Manejo de errores de autenticación
client.on('auth_failure', () => {
  console.log('Error de autenticación. Escanea de nuevo el QR.');
});

// Inicializar cliente
client.initialize();

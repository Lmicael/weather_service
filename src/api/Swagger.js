const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'API Weather',
      version: '1.0.0',
      description: 'A API Weather fornece informações sobre o tempo que falta até o próximo nascer ou pôr do sol com base em coordenadas de latitude e longitude. O serviço utiliza a API pública Sunrise/Sunset: https://sunrise-sunset.org/api, para obter os dados necessários.',
    },
  },
  apis: ['./controllers/Weather.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
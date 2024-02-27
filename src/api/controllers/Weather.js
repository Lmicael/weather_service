/**
 * @swagger
 * /api/weather:
 *   POST:
 *     tags:
 *      - Weather
 *     summary: API responsável por fornecer informações sobre o tempo que falta até o próximo nascer ou pôr do sol.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EventType:
 *                 type: string
 *                 description: Indica o tipo de evento para o qual o usuário deseja obter informações, sendo "sunrise" para nascer do sol e "sunset" para pôr do sol.
 *                Longitude:
 *                  type: number
 *                  description: Representa a coordenada de longitude da localização para a qual o usuário deseja obter informações sobre o nascer ou pôr do sol.
 *                Latitude:
 *                   type: number
 *                   description: Representa a coordenada de latitude da localização para a qual o usuário deseja obter informações sobre o nascer ou pôr do sol.
 *     responses:
 *       200:
 *         description: Fornece informações sobre o evento solicitado, incluindo o tipo de evento, o tempo restante até o evento, a data e hora exata do evento, e a data e hora da solicitação.
 *       500:
 *         description: Erro de serviço.
 */


const axios = require('axios');
const moment = require('moment');

const DataWeather = require('../models/Body_Weather');

function isValidLatitude(latitude) {
  return typeof latitude === 'number' && latitude >= -90 && latitude <= 90;
}

function isValidLongitude(longitude) {
  return typeof longitude === 'number' && longitude >= -180 && longitude <= 180;
}


let Sun = async (req, res) => {
  try {
    let Info = new DataWeather(req.body);

    //Validação das coordenadas geográficas
    if (!isValidLatitude(Info.Latitude) || !isValidLongitude(Info.Longitude)) {
      return res.status(400).json({ error: 'Latitude ou longitude inválida.' });
    }

    //Validação do tipo de evento
    if (!Info.EventType || !['sunset', 'sunrise'].includes(Info.EventType.toLowerCase())) {
      return res.status(400).json({ error: 'EventType deve ser "sunset" ou "sunrise".' });
    }

    // Consulta a API de nascer/pôr do sol
    let response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${Info.Latitude}&lng=${Info.Longitude}&tzid=America/Sao_Paulo`);
    let { sunrise, sunset } = response.data.results;

    // Converte os horários para objetos moment
    let sunriseTime = moment(sunrise, 'h:mm:ss A');
    let sunsetTime = moment(sunset, 'h:mm:ss A');

    // Verifica se o evento já ocorreu hoje, se sim, calcula o tempo até o próximo dia
    let now = moment();
    let eventTime = now.isBefore(sunriseTime) ? sunriseTime : sunsetTime;
    let nextEventTime = eventTime.isBefore(now) ? eventTime.add(1, 'day') : eventTime;

    // Calcula o tempo restante até o próximo evento
    let tempoRestante = moment.utc(nextEventTime.diff(now)).format('HH:mm:ss');

    // Formata as datas
    let dataExata = nextEventTime.format('DD/MM/YYYY HH:mm:ss');
    let requestDatetime = now.format('DD-MM-YYYY HH:mm:ss');

    return res.status(200).json({
      Evento: Info.EventType,
      tempo_restante: tempoRestante,
      data_exata: dataExata,
      request_datetime: requestDatetime,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
};

module.exports = { Sun };
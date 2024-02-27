const request = require('supertest');
const app = require('../api/app');

describe('Testes de Integração para Endpoint', () => {
    it('Deve realizar a consulta', async () => {
        const Data = {
            "EventType": "sunrise",
            "Longitude": 2.294350,
            "Latitude": 48.858844
        };
        const response = await request(app).post('/api/weather').send(Data);
        expect(response.status).toBe(200);
    });
    
    it('Deve realizar a consulta', async () => {
        const Data = {
            "EventType": "sunset",
            "Longitude": 78.042142,
            "Latitude": 27.175144
        };
        const response = await request(app).post('/api/weather').send(Data);
        expect(response.status).toBe(200);
    });

    it('Deve acusar erro', async () => {
        const Data = {
            "EventType": "abc",
            "Longitude": 78.042142,
            "Latitude": 27.175144
        };
        const response = await request(app).post('/api/weather').send(Data);
        expect(response.status).toBe(400);
    });

    it('Deve acusar erro', async () => {
        const Data = {
            "EventType": "sunrise", 
            "Longitude": 250.215296,
            "Latitude": -33.856784
        };
        const response = await request(app).post('/api/weather').send(Data);
        expect(response.status).toBe(400);
    });

    it('Deve acusar erro', async () => {
        const Data = {
            "EventType": "sunrise", 
            "Longitude": 116.570374,
            "Latitude": 400.431908
        };
        const response = await request(app).post('/api/weather').send(Data);
        expect(response.status).toBe(400);
    });
});

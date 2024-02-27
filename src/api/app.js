const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger');

const app = express();
const PORT = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
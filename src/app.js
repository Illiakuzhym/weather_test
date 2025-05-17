const express = require('express');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./routes/subscriptions');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/api', subscriptionRoutes);

// Swagger
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;

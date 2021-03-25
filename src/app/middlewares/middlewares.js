const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors')

app.use(cors())
//only https
// app.use(helmet()); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    exposedHeaders: ['X-Total-Count', 'X-Total-Page', 'X-Page']
}))

// Swagger
require('./swagger')(app);

//use all controllers
 require('../routes/index')(app);

module.exports = app;
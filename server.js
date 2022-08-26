//declare variables and dependencies
const express = require('express');
const app = express();
const { notes } = require('./db/notes');
const fs = require('fs');
const path = require('path');

//routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//confirmation of API
app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`)
});
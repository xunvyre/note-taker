const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`);
});
const express = require('express');
const app = express();
const port = 3030;
const serveStatic = require('serve-static');
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => console.log('send static directory'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
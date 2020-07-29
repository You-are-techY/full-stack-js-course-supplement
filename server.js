const express = require('express');
const app = express();
const port = 3030;

app.use('/', express.static('public'));
app.get('/', (req, res) => console.log('send static directory'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
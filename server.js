const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Root end-point - CRUD TeleAgro');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/', (req, res) => {
    res.send('API is running');
});

const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server started on port ${port}`));

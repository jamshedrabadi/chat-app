const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/chat', (req, res) => {
    res.send([{ name: 'jam' }, { name: 'kek' }]);
});

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server started on port ${port}`));

const express = require('express');
const app = express();

const chats = [{
    id: 1,
    name: 'jam',
}, {
    id: 2,
    name: 'kek',
}];

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server started on port ${port}`));

const express = require('express');
const app = express();
const dbConnection = require('./config/db.js');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes.js');
const { notFound, errorHandler } = require('./middlewares/error.middlewares.js');

// Load Config
dotenv.config();

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

// Connect to MongoDB Database
dbConnection();

// Accept JSON data
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// Error handling routes
app.use(notFound);
app.use(errorHandler);

// Port config
const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server started on port ${port}`));

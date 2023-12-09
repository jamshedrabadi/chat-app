const express = require('express');
const app = express();
const chatRoutes = require('./routes/chat.routes.js');
const dbConnection = require('./config/db.js');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes.js');
const { notFound, errorHandler } = require('./middlewares/error.middlewares.js');

// Load Config
dotenv.config();

app.get('/', (req, res) => {
    return res.send('API is running');
});

// Connect to MongoDB Database
dbConnection();

// Accept JSON data
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Error handling routes
app.use(notFound);
app.use(errorHandler);

// Port config
const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server started on port ${port}`));

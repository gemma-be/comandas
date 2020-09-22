require('dotenv').config();
const express = require('express');
const cors = require('cors');
const comandasRouter = require('./routes/comandasRouter');
const userRoutes = require('./routes/userRouter');
const authenticate = require('./controllers/authenticate');

// Create app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// Routes
app.use('/comandas', authenticate, comandasRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
	res.status(200).send('<h1>Bienvenido a Comandas</h1>');
});

// Execute app listening on port
app.listen(process.env.PORT, () => console.log('Running on port ', process.env.PORT));
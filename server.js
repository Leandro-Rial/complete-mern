require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express()

// Middelware
app.use(express.json());
app.use(cors())
app.use(cookieParser());


// Mongodb
const URI = process.env.CONNECTING_URI;

mongoose.connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

const connected = mongoose.connection;

connected.once('open', () => {
    console.log('Database Connected')
})


// Routes
app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/productRouter'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})
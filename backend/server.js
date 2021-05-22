const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');
const router = require('./routes/todo.route');

const app = express()

//! options and variables
const Port = process.env.PORT || 5000;
const { mongoURI } = require('./config')
var corsOptions = {
  origin: [`http://localhost:8081`],
  optionsSuccessStatus: 200
}

//! connecting db
const connectDb = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      console.log('Db connected !'.cyan)
      
    } catch (err) {
        console.log('Db connection error !'.red, err)
    }
}
connectDb()

//! middlewares
app.use(express.json({ extended: false }))
app.use(cors(corsOptions));



app.get('/api', (req, res) => {
    res.send('home')
});

app.use('/api/todo', router);

app.listen(Port, () => {
    console.log(`App listening on port ${Port}!`.cyan);
});
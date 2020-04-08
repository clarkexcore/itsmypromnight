const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

//Start up Express
app.use(cors());
app.use(express.json({extended: false}));

//MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database connection established successfully");
});


//Routes




//Static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Port and App Listen
const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
});


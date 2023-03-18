// shree ganeshay namah;
const express = require('express');
const app = express();
const port = 5000;
const {connectDB} = require('./Config/db');
connectDB();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {User} = require('./Model/UserModel');
const {authenticate} = require('./Middleware/Authmiddleware');
const {HospitalSignUp,HospitalLogin,ReceiverSignup,ReceiverLogin} = require('./Controller/UserController');
const {GetSample,AddBlood,UpdateBlood,RemoveBloodSample,BloodInfo,RequestBlood,RequestReceiver} = require('./Controller/Action');

// lets just start the game of api
app.post('/hospital/signup',HospitalSignUp);
app.post('/hospital/login',HospitalLogin);
app.post('/receiver/signup',ReceiverSignup);
app.post('/receiver/login',ReceiverLogin);
// lets handle all the api for blood bank
app.get('/api/blood-sample',GetSample);
app.post('/api/add-blood/:id',AddBlood);
app.put('/api/blood/:id',UpdateBlood);
app.delete('/api/delete/:id',RemoveBloodSample);
app.get('/api/blood-info/:id',BloodInfo)
app.post('/api/request-blood-sample',RequestBlood);
app.get('/api/request-receiver',RequestReceiver);

app.listen(port, ()=>{
    console.log(`server is listen on the port ${port}`);
})

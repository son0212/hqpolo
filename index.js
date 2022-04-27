const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();
mongoose.connect('mongodb://localhost/hqpolo'/*,{ useUnifiedTopology: true , useNewUrlParser: true } */);

const app = express();
const users = require('./models/model.user.js');
const products = require('./models/model.product.js');
const login = require('./router/login.js');
const registration = require('./router/registration.js');
const getProducts = require('./router/getProducts.js')
const api = require('./router/api.js');

app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.set('view engine','ejs');
app.set('views',"./views");

app.use(express.static('public'));

let port = process.env.PORT || 4000;

app.get('/',cors(),(req,res)=>{
    res.send('backend on port 4000');
});

app.use('/get-products',getProducts)
app.use('/login',login);
app.use('/registration',registration);
app.use('/api',api);

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
});
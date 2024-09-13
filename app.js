const express = require('express')
const app = new express();

const morgan = require('morgan')
const cors = require('cors')
const helmet = require("helmet");
const path = require("path")
var cookieParser = require('cookie-parser')



require('dotenv').config()

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(cookieParser())

const usersRoute = require('./routes/users');
app.use("/users/", usersRoute);

const productsRoute = require('./routes/products');
app.use("/products/", productsRoute);

const marketplacesRoute = require('./routes/marketplaces');
app.use("/marketplaces/", marketplacesRoute);

const categoriesRoute = require('./routes/categories');
app.use("/categories/", categoriesRoute);


app.use('/public', express.static(path.join(__dirname, 'public/')));



app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status= 500;
    next(error);
})

app.use((error, req, res, next)=>{
    if(!res.headersSent){
        res.status(error.status || 500).json({
            message: error.message,
            result: null,
        })
    }
})

module.exports = app;